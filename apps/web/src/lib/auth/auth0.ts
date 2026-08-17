import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Only initialize if we have the minimum required config to prevent crash in dev
const isConfigured = !!(process.env.AUTH0_DOMAIN && process.env.AUTH0_CLIENT_ID);

export const auth0 = isConfigured
  ? new Auth0Client()
  : {
      getSession: async () => null,
      middleware: async () => undefined,
      handleAuth: () => () => new Response("Auth0 not configured", { status: 501 })
    } as unknown as Auth0Client;
