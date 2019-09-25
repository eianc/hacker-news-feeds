import { ApolloServer } from 'apollo-server';
import { resolveStoriesIds, resolveStories } from './resolvers';
import { typeDefs } from './schema';

const resolvers = {
  Query: {
    storiesIds: () => resolveStoriesIds(),
    allStories: resolveStories
  },
  Story: {
    author: (parent:any) => parent.by
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({port: 8080}, () => {
  console.log('Running a GraphQL API server at localhost:8080/graphql');
});
