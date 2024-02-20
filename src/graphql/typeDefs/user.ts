import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    name: String
    username: String
    email: String
    emailVarified: Boolean
    image: String
  }

  type SearchUser {
    id: String
    username: String
    image: String
  }

  type Query {
    searchUsers(username: String!): [SearchUser]
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
