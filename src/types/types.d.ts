import { ISODateString } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import {
  conversationPopulate,
  lastMessagePopulate,
  participantsPopulate,
} from "../graphql/resolver/conversation";
import { Context } from "graphql-ws/lib/server";

/**
 * Server Types
 */
export interface GraphQlContext {
  session?: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

interface Session {
  user: User;
  expires: ISODateString;
}

interface SubscriptionContext extends Context {
  connectionParams: {
    session: Session;
  };
}
/**
 * User Type
 */
interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  emailVarifed: null;
  name: string;
}

export type ConversationData = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulate;
}>;

export type ParticipantData = Prisma.ConversationUserGetPayload<{
  include: typeof participantsPopulate;
}>;

export type MessageData = Prisma.MessageGetPayload<{
  include: typeof lastMessagePopulate;
}>;
