import { GraphQLServer } from "graphql-yoga";

//Type definitions (schema)
const typeDefs = `
    type Query {
      post: Post!
    }
    type Post {
      id: String!
      title: String!
      body: String!
      published: Boolean!
    }

`;

//Resolvers
const resolvers = {
  Query: {
    post() {
      return {
        id: "12345",
        title: "Monday sucks",
        body: "Monday generally sucks, doesnt have anything to do with this",
        published: false,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
