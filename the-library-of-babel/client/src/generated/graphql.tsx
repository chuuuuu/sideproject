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

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getContent: Response;
  getAddress: Response;
};


export type QueryGetContentArgs = {
  address: Scalars['String'];
};


export type QueryGetAddressArgs = {
  content: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  errors?: Maybe<Array<Scalars['String']>>;
  data?: Maybe<Scalars['String']>;
};

export type GetAddressQueryVariables = Exact<{
  content: Scalars['String'];
}>;


export type GetAddressQuery = (
  { __typename?: 'Query' }
  & { getAddress: (
    { __typename?: 'Response' }
    & Pick<Response, 'errors' | 'data'>
  ) }
);

export type GetContentQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type GetContentQuery = (
  { __typename?: 'Query' }
  & { getContent: (
    { __typename?: 'Response' }
    & Pick<Response, 'errors' | 'data'>
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const GetAddressDocument = gql`
    query GetAddress($content: String!) {
  getAddress(content: $content) {
    errors
    data
  }
}
    `;

export function useGetAddressQuery(options: Omit<Urql.UseQueryArgs<GetAddressQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAddressQuery>({ query: GetAddressDocument, ...options });
};
export const GetContentDocument = gql`
    query GetContent($address: String!) {
  getContent(address: $address) {
    errors
    data
  }
}
    `;

export function useGetContentQuery(options: Omit<Urql.UseQueryArgs<GetContentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetContentQuery>({ query: GetContentDocument, ...options });
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};