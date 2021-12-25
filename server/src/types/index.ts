import { Request, Response } from 'express';
import { Session } from 'express-session';
import { InputType, Field, Float, ObjectType } from 'type-graphql';
import { Transaction } from '../entities/Transaction';
import { Length, Min, Max, IsEnum } from 'class-validator';
import { User } from '../entities/User';

interface UserSession extends Session {
  userId: string;
}

export type MyContext = {
  req: Request & { session: UserSession };
  res: Response;
};

@ObjectType()
export class SummaryResponse {
  @Field(() => Float)
  currentBalance: number;

  @Field(() => Float)
  totalIncome: number;

  @Field(() => Float)
  totalExpenses: number;
}

export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

@InputType()
export class TransactionInput implements Partial<Transaction> {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  @Length(3, 80)
  name: string;

  @Field()
  @Min(1)
  @Max(1e6)
  amount: number;

  @Field()
  @IsEnum(TransactionType, { each: true })
  type: TransactionType;
}

@InputType()
export class UserInput {
  @Field()
  @Length(5, 30)
  username: string;

  @Field()
  @Length(5, 50)
  password: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
