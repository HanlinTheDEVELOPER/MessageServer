import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    username: String
  }

  type Query {
    searchUsers(search: String!): [User]
  }

  type Mutation {
    createUser(username: String!): CreateUserResponseType
  }

  type CreateUserResponseType {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
