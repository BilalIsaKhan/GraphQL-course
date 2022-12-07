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
    author: "1",
  },
  {
    id: "2",
    title: "This is a post 2",
    body: "This is a body 2",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "This is a post 3",
    body: "This is a body 3",
    published: true,
    author: "2",
  },
];
//Demo Comments data
const comments = [
  {
    id: "100",
    text: "I can have my own comments",
  },
  {
    id: "200",
    text: "I am entitled to my own opinions",
  },
  {
    id: "300",
    text: "I can have as many opinions as I want",
  },
  {
    id: "400",
    text: "This is the 4th comment",
  },
];

//Type definitions (schema)
const typeDefs = `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!
      me: User!
      post: Post!
    }
    type User{
      id:ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
    }
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
    }
    type Comment {
      id: ID!
      text: String!
    }

`;

//Resolvers
const resolvers = {
  Query: {
    comments() {
      return comments;
    },
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
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
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
