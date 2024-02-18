import { ISODateString } from "next-auth";
import { PrismaClient } from "@prisma/client";

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
