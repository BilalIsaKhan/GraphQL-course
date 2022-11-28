import { GraphQLServer } from "graphql-yoga";

//Demo User Data
const users = [
  {
    id: "1",
    name: "Bilal",
    email: "bilal@gmail.com",
    age: 25,
  },
  {
    id: "2",
    name: "Sara",
    email: "sara@gmail.com",
  },
  {
    id: "3",
    name: "Anza",
    email: "anza@gmail.com",
  },
];
//Demo Posts data
const posts = [
  {
    id: "1",
    title: "This is a post 1",
    body: "This is a body 1",
    published: true,
  },
  {
    id: "2",
    title: "This is a post 2",
    body: "This is a body 2",
    published: false,
  },
  {
    id: "3",
    title: "This is a post 3",
    body: "This is a body 3",
    published: true,
  },
];

//Type definitions (schema)
const typeDefs = `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
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
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        return post.body.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
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
