import gql from "graphql-tag";

const typeDefs = gql`
  type Message {
    id: String
    sender: SearchUser
    body: String
    createdAt: Date
  }
`;

export default typeDefs;
