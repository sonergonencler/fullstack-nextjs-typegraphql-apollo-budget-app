import { prop as Prop, getModelForClass, Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  readonly _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ default: Date.now() })
  date: number;

  @Field()
  @Prop({ required: true })
  type: string;

  @Field(() => User)
  @Prop({ ref: User, required: true })
  creator: Ref<User>;

  static async findTransactionsByDate(
    this: ReturnModelType<typeof Transaction>,
    start: number,
    end: number,
    creatorId: string,
    limit: number = 0
  ) {
    return await this.find({
      date: {
        $gte: start,
        $lt: end,
      },
      creator: creatorId,
    })
      .sort({ $natural: -1 })
      .limit(limit);
  }

  static async findTransactionsByInput(this: ReturnModelType<typeof Transaction>, creatorId: string, input: string) {
    return await this.find({
      name: {
        $regex: input,
        $options: 'i',
      },
      creator: creatorId,
    });
  }
}

export const TransactionModel = getModelForClass(Transaction, {
  schemaOptions: { timestamps: true },
});
