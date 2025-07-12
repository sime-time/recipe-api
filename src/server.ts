import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { CloudflareBindings } from "./config/bindings";
import favoriteRoute from "./routes/favorite-route";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// middleware
app.use(
  '*',
  async (c, next) => {
    const originUrl = c.env.CLIENT_ORIGIN_URL;
    return cors({
      origin: originUrl,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })(c, next); // call the cors middleware with configured options
  },
);

// catch-all route for better-auth
app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});

app.route("/api/favorite", favoriteRoute);

app.get("/", (c) => {
  return c.text("Hello Hono");
});

app.get("/api/health", (c) => {
  return c.json({ success: "true" })
});

export default app;
