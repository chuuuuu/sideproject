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
  content: Scalars['String'];
  address: Scalars['String'];
};


export type QueryContentArgs = {
  address: Scalars['String'];
};


export type QueryAddressArgs = {
  content: Scalars['String'];
};

export type AddressQueryVariables = Exact<{
  content: Scalars['String'];
}>;


export type AddressQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'address'>
);

export type ContentQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type ContentQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'content'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const AddressDocument = gql`
    query Address($content: String!) {
  address(content: $content)
}
    `;

export function useAddressQuery(options: Omit<Urql.UseQueryArgs<AddressQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AddressQuery>({ query: AddressDocument, ...options });
};
export const ContentDocument = gql`
    query Content($address: String!) {
  content(address: $address)
}
    `;

export function useContentQuery(options: Omit<Urql.UseQueryArgs<ContentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ContentQuery>({ query: ContentDocument, ...options });
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};