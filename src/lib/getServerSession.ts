import fetch from "node-fetch";

export const getServerSession = async (cookie: string) => {
  const url = "http://localhost:3000/api/auth/session";
  const res = await fetch(url, {
    headers: { cookie: cookie },
  });
  const session = await res.json();
  return session;
};
