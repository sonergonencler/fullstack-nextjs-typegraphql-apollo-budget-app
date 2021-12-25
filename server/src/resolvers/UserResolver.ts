import { Resolver, Query, Mutation, UseMiddleware, Arg, Ctx } from 'type-graphql';
import { MyContext, UserResponse, UserInput } from '../types';
import { compare, hash } from 'bcryptjs';
import { UserModel, User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { SESSION_COOKIE } from '../constants';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    const { userId } = req.session;
    return await UserModel.findById(userId);
  }

  @Mutation(() => UserResponse)
  async signup(@Arg('input') { username, password }: UserInput, @Ctx() { req }: MyContext): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      throw new Error('User already exist');
    }

    const hashedPassword = await hash(password, 10);

    const user = new UserModel({
      username,
      password: hashedPassword,
    });

    await user.save();

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async signin(@Arg('input') { username, password }: UserInput, @Ctx() { req }: MyContext): Promise<UserResponse> {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('A user with this username could not find');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new Error('Wrong password');
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async bye(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err: Error) => {
        res.clearCookie(SESSION_COOKIE);

        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}
