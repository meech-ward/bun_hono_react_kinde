import { Hono } from "hono";

import { kindeClient, sessionManager } from "../auth";

export const authRoute = new Hono()
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
