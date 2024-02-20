import { gql } from "graphql-tag";

const typeDef = gql`
  scalar Date

  type Query {
    conversations: [Conversation]
  }

  type Conversation {
    id: String
    lastMessage: Message
    participants: [Participants]
    createdAt: Date
    updatedAt: Date
  }

  type Participants {
    id: String
    user: User
    hasSeenLastMessage: Boolean
  }

  type Mutation {
    createConversation(participantIds: [String]!): CreateConversationRes
  }

  type CreateConversationRes {
    conversationId: String
  }
`;
export default typeDef;
