import { GraphQLServer } from "graphql-yoga";

//Type definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    title() {
      return "Knorr Noodles";
    },
    price() {
      return 3.29;
    },
    releaseYear() {
      return 2005;
    },
    rating() {
      return null;
    },
    inStock() {
      return false;
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
