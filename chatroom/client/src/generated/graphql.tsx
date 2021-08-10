import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  user: Scalars['String'];
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postMessage: Scalars['Float'];
};


export type MutationPostMessageArgs = {
  content: Scalars['String'];
  user: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  messages: Array<Message>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type PostMessageMutationVariables = Exact<{
  content: Scalars['String'];
  user: Scalars['String'];
}>;


export type PostMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'postMessage'>
);

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'user' | 'content'>
  )> }
);

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'user' | 'content'>
  ) }
);


export const PostMessageDocument = gql`
    mutation PostMessage($content: String!, $user: String!) {
  postMessage(content: $content, user: $user)
}
    `;

export function usePostMessageMutation() {
  return Urql.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument);
};
export const MessagesDocument = gql`
    query Messages {
  messages {
    id
    user
    content
  }
}
    `;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    id
    user
    content
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};