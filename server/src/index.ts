import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import nextApp from '@budget-app/client';
import connectMongo from 'connect-mongodb-session';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { connect, ConnectOptions } from 'mongoose';
import cors from 'cors';

import { SESSION_COOKIE, __PROD__ } from './constants';
import { TypegooseMiddleware } from './middleware/typegoose';
import { UserResolver } from './resolvers/UserResolver';
import { TransactionResolver } from './resolvers/TransactionResolver';

const MONGO_URL = process.env.MONGO_URL || '';

const handle = nextApp.getRequestHandler();

const MongoDBStore = connectMongo(session);

const createServer = async () => {
  await connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions);

  const app = express();

  const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
  };

  app.use(express.json());
  app.use(cors(corsOptions));

  app.set('trust proxy', 1);

  app.use(
    session({
      name: SESSION_COOKIE,
      store: new MongoDBStore({
        uri: MONGO_URL,
        collection: 'sessions',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 3,
        httpOnly: true,
        sameSite: true,
        secure: __PROD__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TransactionResolver],
      globalMiddlewares: [TypegooseMiddleware],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: corsOptions });

  await nextApp.prepare();

  app.get('*', (req, res) => handle(req, res));

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is working on port: ${process.env.PORT || 8000}`);
  });
};

createServer().catch((err) => {
  console.error(err.message);
});
