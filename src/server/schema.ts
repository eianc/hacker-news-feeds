import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Edge {
    cursor: String!,
    node: Story
  }

  type PageInfo {
    lastCursor: String,
    hasNextPage: Boolean
  }

  type StoriesResult {
    edges: [Edge]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Story {
    id: String,
    type: String,
    title: String,
    author: String,
    score: Int
  }

  type Query {
    storiesIds: [String],
    allStories(first: Int, after: Int): StoriesResult
  }
`;