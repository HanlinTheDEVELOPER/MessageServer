import { Prisma } from "@prisma/client";
import { GraphQlContext } from "../../types/types";

import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    conversations: async (_: any, __: any, context: GraphQlContext) => {
      console.log("conversation query");
    },
  },
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      context: GraphQlContext
    ) => {
      const { session, prisma } = context;
      const { participantIds } = args;
      const userId = session?.user.id;

      if (!session) new GraphQLError("Not Authorized");

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenLastMessage: id === userId,
                })),
              },
            },
          },
          include: conversationPopulate,
        });
        return { conversationId: conversation.id };
      } catch (error: any) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};

export const participantsPopulate =
  Prisma.validator<Prisma.ConversationUserInclude>()({
    user: {
      select: {
        id: true,
        username: true,
        image: true,
      },
    },
  });

export const lastMessagePopulate = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
});

export const conversationPopulate =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantsPopulate,
    },
    lastMessage: {
      include: lastMessagePopulate,
    },
  });
export default resolvers;
