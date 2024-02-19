import { GraphQlContext } from "../../types/types";
import { CreateUsernameResponse } from "../../types/types";

const resolvers = {
  Query: {
    searchUsers: (args: { username: string }) => {
      console.log("Inside server");
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
