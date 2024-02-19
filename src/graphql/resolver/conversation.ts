import { GraphQlContext } from "../../types/types";
const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      context: GraphQlContext
    ) => {
      console.log("Inside CC", args);
    },
  },
};
export default resolvers;
