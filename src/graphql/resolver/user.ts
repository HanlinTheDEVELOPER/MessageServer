import { GraphQlContext } from "../../lib/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (
      _: any,
      args: { username: string },
      context: GraphQlContext
    ) => {
      const { session } = context;
      console.log(session, args.username);
    },
  },
};

export default resolvers;
