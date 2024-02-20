import { ISODateString } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  conversationPopulate,
  lastMessagePopulate,
  participantsPopulate,
} from "../graphql/resolver/conversation";

export interface GraphQlContext {
  session?: Session | null;
  prisma: PrismaClient;
}

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

interface Session {
  user: User;
  expires: ISODateString;
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
