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
  senderId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  pair: Room;
  message: Scalars['Boolean'];
  leaveRoom: Scalars['Boolean'];
  login: User;
};


export type MutationMessageArgs = {
  content: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  room?: Maybe<Room>;
  me?: Maybe<User>;
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  users: Array<User>;
  messages: Array<Message>;
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeMessage: Message;
  subscribeIsLeave: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
};

export type LeaveRoomMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveRoom'>
);

export type LoginMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type PairMutationVariables = Exact<{ [key: string]: never; }>;


export type PairMutation = (
  { __typename?: 'Mutation' }
  & { pair: (
    { __typename?: 'Room' }
    & Pick<Room, 'id'>
  ) }
);

export type PostMessageMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type PostMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'message'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type RoomQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room?: Maybe<(
    { __typename?: 'Room' }
    & Pick<Room, 'id'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'senderId' | 'content' | 'createdAt'>
    )> }
  )> }
);

export type IsLeaveSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IsLeaveSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'subscribeIsLeave'>
);

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'senderId' | 'content' | 'createdAt'>
  ) }
);


export const LeaveRoomDocument = gql`
    mutation LeaveRoom {
  leaveRoom
}
    `;

export function useLeaveRoomMutation() {
  return Urql.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(LeaveRoomDocument);
};
export const LoginDocument = gql`
    mutation Login {
  login {
    id
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const PairDocument = gql`
    mutation Pair {
  pair {
    id
  }
}
    `;

export function usePairMutation() {
  return Urql.useMutation<PairMutation, PairMutationVariables>(PairDocument);
};
export const PostMessageDocument = gql`
    mutation PostMessage($content: String!) {
  message(content: $content)
}
    `;

export function usePostMessageMutation() {
  return Urql.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument);
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const RoomDocument = gql`
    query Room {
  room {
    id
    users {
      id
    }
    messages {
      senderId
      content
      createdAt
    }
  }
}
    `;

export function useRoomQuery(options: Omit<Urql.UseQueryArgs<RoomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoomQuery>({ query: RoomDocument, ...options });
};
export const IsLeaveDocument = gql`
    subscription IsLeave {
  subscribeIsLeave
}
    `;

export function useIsLeaveSubscription<TData = IsLeaveSubscription>(options: Omit<Urql.UseSubscriptionArgs<IsLeaveSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<IsLeaveSubscription, TData>) {
  return Urql.useSubscription<IsLeaveSubscription, TData, IsLeaveSubscriptionVariables>({ query: IsLeaveDocument, ...options }, handler);
};
export const MessageDocument = gql`
    subscription Message {
  subscribeMessage {
    senderId
    content
    createdAt
  }
}
    `;

export function useMessageSubscription<TData = MessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<MessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MessageSubscription, TData>) {
  return Urql.useSubscription<MessageSubscription, TData, MessageSubscriptionVariables>({ query: MessageDocument, ...options }, handler);
};