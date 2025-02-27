"use server";

import authOptions from "@/lib/configs/auth/authOptions"
import { AuthSession, Data } from "@/types/types";
import { getServerSession } from "next-auth/next";

export const customGet = async (url: string, session: AuthSession | null) => {
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};

export const customPost = async (url: string, session: AuthSession | null, data:Object) => {
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
    },
    body: JSON.stringify(data)
  }).then((res) => res.json());

  return res;
};

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now());
  if (currentTimestamp >= session.user.expires_at * 1000) {
    return null;
  }

  return session;
};
