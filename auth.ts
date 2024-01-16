import {
  createKindeServerClient,
  GrantType,
  SessionManager,
  UserType,
} from "@kinde-oss/kinde-typescript-sdk";

import { Hono, Context, MiddlewareHandler } from "hono";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    if (typeof value === "string") {
      setCookie(c, key, value);
    } else {
      setCookie(c, key, JSON.stringify(value));
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

export const authMiddleware: MiddlewareHandler<{
  Variables: {
    user: UserType;
  };
}> = async (c, next) => {
  try {
    const _sessionManager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(_sessionManager);
    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const profile = await kindeClient.getUserProfile(_sessionManager);
    c.set("user", profile);
    await next();
  } catch (e) {
    console.error(e);
    return c.json({ error: "Unauthorized" }, 401);
  }
};

export const authRoutes = new Hono()
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    await kindeClient.handleRedirectToApp(
      sessionManager(c),
      new URL(c.req.url)
    );
    return c.redirect("/");
  });
