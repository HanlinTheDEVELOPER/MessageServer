import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import http from "http";

import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/typeDefs";
import { GraphQlContext } from "./types/types";
import { getServerSession } from "./lib/getServerSession";
import { PrismaClient } from "@prisma/client";

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

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({
        embed: true,
        includeCookies: true,
      }),
    ],
  });

  await server.start();
  app.use(
    "/",
    cors(corsOption),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQlContext> => {
        
        const session = await getServerSession(req.headers.cookie as string);
        return { session, prisma };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

main();
