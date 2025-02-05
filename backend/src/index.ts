import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express, { Application } from "express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const app: Application = express();
app.use(cors());
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log("Server running on http://localhost:4000")
  );
}

startServer();
