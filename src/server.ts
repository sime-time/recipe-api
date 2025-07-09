import { Hono } from "hono";
import { cors } from "hono/cors";
import { CloudflareBindings } from "./config/bindings";
import { auth } from "./lib/auth";
import favoriteRoute from "./routes/favorite-route";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// catch-all route for better-auth
app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});

app.route("/api/favorite", favoriteRoute);

app.get("/", (c) => {
  return c.text("Hello Hono");
});

export default app;
