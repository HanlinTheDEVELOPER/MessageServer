import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String!): [User]
  }

  type Mutation {
    createUsername(username: String!): CreateUserResponseType
  }

  type CreateUserResponseType {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
