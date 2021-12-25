import { Resolver, Query, Mutation, Ctx, Arg, UseMiddleware, ID, Root, FieldResolver, Int } from 'type-graphql';
import { MyContext, TransactionInput, TransactionType, SummaryResponse } from '../types';
import { TransactionModel, Transaction } from '../entities/Transaction';
import { isAuth } from '../middleware/isAuth';
import { UserModel, User } from '../entities/User';
import { getCurrentMonth } from '../utils/getCurrentMonth';

@Resolver(() => Transaction)
export class TransactionResolver {
  @Query(() => Transaction, { nullable: true })
  @UseMiddleware(isAuth)
  async transaction(
    @Arg('transactionId', () => ID) transactionId: string,
    @Ctx() { req }: MyContext
  ): Promise<Transaction | null> {
    const { userId } = req.session;

    const transaction = await TransactionModel.findOne({
      _id: transactionId,
      creator: userId,
    });

    return transaction;
  }

  @Query(() => [Transaction])
  @UseMiddleware(isAuth)
  async monthlyTransactions(
    @Arg('limit', () => Int, { defaultValue: 0 }) limit: number = 0,
    @Ctx() { req }: MyContext
  ): Promise<Transaction[]> {
    const { userId } = req.session;

    const { startOfMonth, endOfMonth } = getCurrentMonth();

    return await TransactionModel.findTransactionsByDate(startOfMonth, endOfMonth, userId, limit);
  }

  @Query(() => SummaryResponse)
  @UseMiddleware(isAuth)
  async monthlySummary(@Ctx() { req }: MyContext): Promise<SummaryResponse> {
    const { userId } = req.session;

    const { startOfMonth, endOfMonth } = getCurrentMonth();

    const transactions = await TransactionModel.findTransactionsByDate(startOfMonth, endOfMonth, userId);

    let currentBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    for (const transaction of transactions) {
      if (transaction.type === TransactionType.INCOME) {
        currentBalance += transaction.amount;
        totalIncome += transaction.amount;
      }

      if (transaction.type === TransactionType.EXPENSE) {
        currentBalance -= transaction.amount;
        totalExpenses -= transaction.amount;
      }
    }

    return {
      currentBalance,
      totalIncome,
      totalExpenses,
    };
  }

  @Query(() => [Transaction])
  @UseMiddleware(isAuth)
  async search(@Arg('input') input: string, @Ctx() { req }: MyContext) {
    const { userId } = req.session;

    return await TransactionModel.findTransactionsByInput(userId, input);
  }

  @Mutation(() => Transaction)
  @UseMiddleware(isAuth)
  async createTransaction(
    @Arg('input') transactionInput: TransactionInput,
    @Ctx() { req }: MyContext
  ): Promise<Transaction> {
    const { userId } = req.session;

    const fixedAmount = Math.round(transactionInput.amount * 1e2) / 1e2;

    const date = Date.now();

    const transaction = await TransactionModel.create({
      ...transactionInput,
      date: date,
      amount: fixedAmount,
      creator: userId,
    } as Transaction);

    return transaction;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTransaction(
    @Arg('transactionId', () => ID) transactionId: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const { userId } = req.session;

    const deletedTransaction = await TransactionModel.findOneAndDelete({
      _id: transactionId,
      creator: userId,
    });

    if (!deletedTransaction) {
      throw new Error('Transaction not found');
    }

    return true;
  }

  @FieldResolver()
  async creator(@Root() transaction: Transaction): Promise<User | null> {
    const user = await UserModel.findById(transaction.creator);
    return user;
  }
}
