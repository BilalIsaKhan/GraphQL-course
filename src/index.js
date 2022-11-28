import { GraphQLServer } from "graphql-yoga";

//Type definitions (schema)
const typeDefs = `
    type Query {
      add (num1: Float!, num2: Float!) : Float!
      greeting(name: String): String!
      me: User!
      post: Post!
    }
    type User{
      id:ID!
      name: String!
      email: String!
      age: Int
    }
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }

`;

//Resolvers
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      return args.num1 + args.num2;
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}!`;
      } else {
        return "Hello!";
      }
    },
    me() {
      return {
        id: "123456",
        name: "Bilal",
        email: "bilal@gmail.com",
      };
    },
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
