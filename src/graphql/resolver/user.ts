import { GraphQlContext } from "../../types/types";
import { CreateUsernameResponse } from "../../types/types";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ) => {
      const { session, prisma } = context;

      if (!session) {
        throw new GraphQLError("Not Authorize");
      }

      const {
        user: { username: myUsername },
      } = session;

      const { username: searchedUsername } = args;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ): Promise<CreateUsernameResponse> => {
      const { session, prisma } = context;
      const { username } = args;

      if (!session) {
        return {
          error: "Not Authorize",
        };
      }
      const { id } = session.user;
      try {
        const existingUsername = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (existingUsername) {
          return {
            error: "Username already exist",
          };
        }
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            username,
          },
        });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log(error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
