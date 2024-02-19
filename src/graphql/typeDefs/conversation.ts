import { gql } from "graphql-tag";

const typeDef = gql`
  type Mutation {
    createConversation(participantIds: [String]!): CreateConversationRes
  }

  type CreateConversationRes {
    conversationId: String
  }
`;
export default typeDef;
