import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  bye: Scalars['Boolean'];
  createTransaction: Transaction;
  deleteTransaction: Scalars['Boolean'];
  signin: UserResponse;
  signup: UserResponse;
};


export type MutationCreateTransactionArgs = {
  input: TransactionInput;
};


export type MutationDeleteTransactionArgs = {
  transactionId: Scalars['ID'];
};


export type MutationSigninArgs = {
  input: UserInput;
};


export type MutationSignupArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  monthlySummary: SummaryResponse;
  monthlyTransactions: Array<Transaction>;
  search: Array<Transaction>;
  transaction?: Maybe<Transaction>;
};


export type QueryMonthlyTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  input: Scalars['String'];
};


export type QueryTransactionArgs = {
  transactionId: Scalars['ID'];
};

export type SummaryResponse = {
  __typename?: 'SummaryResponse';
  currentBalance: Scalars['Float'];
  totalExpenses: Scalars['Float'];
  totalIncome: Scalars['Float'];
};

export type Transaction = {
  __typename?: 'Transaction';
  _id: Scalars['ID'];
  amount: Scalars['Float'];
  creator: User;
  date: Scalars['Float'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TransactionInput = {
  _id?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
};

export type ByeMutationVariables = Exact<{ [key: string]: never; }>;


export type ByeMutation = { __typename?: 'Mutation', bye: boolean };

export type CreateTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', _id: string, name: string, type: string, amount: number, date: number, creator: { __typename?: 'User', _id: string, username: string } } };

export type DeleteTransactionMutationVariables = Exact<{
  transactionId: Scalars['ID'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction: boolean };

export type SigninMutationVariables = Exact<{
  input: UserInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, username: string } | null | undefined } };

export type SignupMutationVariables = Exact<{
  input: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, username: string } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, username: string } | null | undefined };

export type MonthlySummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type MonthlySummaryQuery = { __typename?: 'Query', monthlySummary: { __typename?: 'SummaryResponse', currentBalance: number, totalIncome: number, totalExpenses: number } };

export type MonthlyTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type MonthlyTransactionsQuery = { __typename?: 'Query', monthlyTransactions: Array<{ __typename?: 'Transaction', _id: string, name: string, amount: number, type: string, date: number, creator: { __typename?: 'User', _id: string, username: string } }> };

export type SearchQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Transaction', _id: string, name: string, amount: number, type: string, date: number, creator: { __typename?: 'User', _id: string, username: string } }> };

export type TransactionQueryVariables = Exact<{
  transactionId: Scalars['ID'];
}>;


export type TransactionQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', _id: string, name: string, amount: number, type: string, date: number, creator: { __typename?: 'User', _id: string, username: string } } | null | undefined };


export const ByeDocument = gql`
    mutation Bye {
  bye
}
    `;
export type ByeMutationFn = Apollo.MutationFunction<ByeMutation, ByeMutationVariables>;

/**
 * __useByeMutation__
 *
 * To run a mutation, you first call `useByeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useByeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [byeMutation, { data, loading, error }] = useByeMutation({
 *   variables: {
 *   },
 * });
 */
export function useByeMutation(baseOptions?: Apollo.MutationHookOptions<ByeMutation, ByeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ByeMutation, ByeMutationVariables>(ByeDocument, options);
      }
export type ByeMutationHookResult = ReturnType<typeof useByeMutation>;
export type ByeMutationResult = Apollo.MutationResult<ByeMutation>;
export type ByeMutationOptions = Apollo.BaseMutationOptions<ByeMutation, ByeMutationVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($input: TransactionInput!) {
  createTransaction(input: $input) {
    _id
    name
    type
    amount
    date
    creator {
      _id
      username
    }
  }
}
    `;
export type CreateTransactionMutationFn = Apollo.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, options);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($transactionId: ID!) {
  deleteTransaction(transactionId: $transactionId)
}
    `;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, options);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const SigninDocument = gql`
    mutation Signin($input: UserInput!) {
  signin(input: $input) {
    user {
      _id
      username
    }
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: UserInput!) {
  signup(input: $input) {
    user {
      _id
      username
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MonthlySummaryDocument = gql`
    query MonthlySummary {
  monthlySummary {
    currentBalance
    totalIncome
    totalExpenses
  }
}
    `;

/**
 * __useMonthlySummaryQuery__
 *
 * To run a query within a React component, call `useMonthlySummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlySummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlySummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMonthlySummaryQuery(baseOptions?: Apollo.QueryHookOptions<MonthlySummaryQuery, MonthlySummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonthlySummaryQuery, MonthlySummaryQueryVariables>(MonthlySummaryDocument, options);
      }
export function useMonthlySummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonthlySummaryQuery, MonthlySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonthlySummaryQuery, MonthlySummaryQueryVariables>(MonthlySummaryDocument, options);
        }
export type MonthlySummaryQueryHookResult = ReturnType<typeof useMonthlySummaryQuery>;
export type MonthlySummaryLazyQueryHookResult = ReturnType<typeof useMonthlySummaryLazyQuery>;
export type MonthlySummaryQueryResult = Apollo.QueryResult<MonthlySummaryQuery, MonthlySummaryQueryVariables>;
export const MonthlyTransactionsDocument = gql`
    query MonthlyTransactions($limit: Int) {
  monthlyTransactions(limit: $limit) {
    _id
    name
    amount
    type
    date
    creator {
      _id
      username
    }
  }
}
    `;

/**
 * __useMonthlyTransactionsQuery__
 *
 * To run a query within a React component, call `useMonthlyTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlyTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlyTransactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMonthlyTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<MonthlyTransactionsQuery, MonthlyTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonthlyTransactionsQuery, MonthlyTransactionsQueryVariables>(MonthlyTransactionsDocument, options);
      }
export function useMonthlyTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonthlyTransactionsQuery, MonthlyTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonthlyTransactionsQuery, MonthlyTransactionsQueryVariables>(MonthlyTransactionsDocument, options);
        }
export type MonthlyTransactionsQueryHookResult = ReturnType<typeof useMonthlyTransactionsQuery>;
export type MonthlyTransactionsLazyQueryHookResult = ReturnType<typeof useMonthlyTransactionsLazyQuery>;
export type MonthlyTransactionsQueryResult = Apollo.QueryResult<MonthlyTransactionsQuery, MonthlyTransactionsQueryVariables>;
export const SearchDocument = gql`
    query Search($input: String!) {
  search(input: $input) {
    _id
    name
    amount
    type
    date
    creator {
      _id
      username
    }
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const TransactionDocument = gql`
    query Transaction($transactionId: ID!) {
  transaction(transactionId: $transactionId) {
    _id
    name
    amount
    type
    date
    creator {
      _id
      username
    }
  }
}
    `;

/**
 * __useTransactionQuery__
 *
 * To run a query within a React component, call `useTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useTransactionQuery(baseOptions: Apollo.QueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
      }
export function useTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
        }
export type TransactionQueryHookResult = ReturnType<typeof useTransactionQuery>;
export type TransactionLazyQueryHookResult = ReturnType<typeof useTransactionLazyQuery>;
export type TransactionQueryResult = Apollo.QueryResult<TransactionQuery, TransactionQueryVariables>;