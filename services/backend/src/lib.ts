import type { StatusMap } from "@fireside/utils/src/constants";
import { Elysia, t, type CookieOptions } from "elysia";
import { getSession } from "./user";

export const authHandle = async ({
  session,
  set,
}: {
  set: { status?: number | keyof typeof StatusMap };
  session: ReturnType<typeof getSession> extends Promise<infer R>
    ? R
    : "L bozo once again";
}) => {
  console.log("auth handle", session);
  if (session.kind === "not-logged-in") {
    return (set.status = "Unauthorized");
  }
};

export const sessionGuard = {
  cookie: t.Cookie({
    auth: t.String(),
  }),
};

export const ProtectedElysia = <T extends string>({
  prefix,
}: {
  prefix: `/${T}`;
}) =>
  new Elysia({
    prefix: `/protected${prefix}`,
    name: "auth-middleware",
  }).resolve(async ({ cookie: { auth }, set }) => {
    const session = await getSession({ authToken: auth.get() });

    if (session.kind === "not-logged-in") {
      set.status = 401;
      throw new Error("Unauthorized");
    }
    set.status = 200;
    return { user: session.user };
  });

export const getDeleteAuthCookie = () =>
  ({
    value: "",
    httpOnly: true,
    expires: new Date(),
    secure: true,
    domain: "localhost",
    path: "/",
    sameSite: "none",
  } satisfies CookieOptions & { value: unknown });

export const parseCookie = (cookieString: string): Record<string, string> => {
  const cookieData: Record<string, string> = {};

  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    if (key && value) {
      cookieData[key.trim()] = value.trim();
    }
  });

  return cookieData;
};
