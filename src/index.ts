import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import http from "http";
import { getSession } from "next-auth/react";

import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/typeDefs";
import { GraphQlContext } from "./lib/types";

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    cors(corsOption),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQlContext> => {
        const session = await getSession({ req });
        console.log(req.headers);
        return { session };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

main();
