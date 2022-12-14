import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";
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
    id: "10",
    title: "This is a post 1",
    body: "This is a body 1",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "This is a post 2",
    body: "This is a body 2",
    published: false,
    author: "1",
  },
  {
    id: "12",
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
    author: "1",
    post: "10",
  },
  {
    id: "200",
    text: "I am entitled to my own opinions",
    author: "2",
    post: "10",
  },
  {
    id: "300",
    text: "I can have as many opinions as I want",
    author: "3",
    post: "11",
  },
  {
    id: "400",
    text: "This is the 4th comment",
    author: "2",
    post: "11",
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
    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author:ID! ): Post!
      createComment(text: String!, author: ID!, post: ID!): Comment!
    }
    type User{
      id:ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }
    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.email);
      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      if (!userExists) {
        throw new Error("User not found");
      }
      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };
      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      if (!userExists) {
        throw new Error("User not found");
      }
      const postExists = posts.some(
        (post) => post.id === args.post && post.published
      );
      if (!postExists) {
        throw new Error("Post does not exist");
      }
      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };
      comments.push(comment);
      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
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
  User: {
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
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
