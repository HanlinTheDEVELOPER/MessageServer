import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/typeDefs";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
});

startStandaloneServer(server, { listen: { port: 4000 } })
  .then((url) => console.log(url))
  .catch((err) => console.log(err));
