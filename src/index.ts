import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
      // .get("/", () => "Hello Elysia")
      // .get("/hello", () => "Did you miss me?")
      .use(swagger())
      .get("/", ({ path }) => path)
      .post("/hello", () => "Did you miss me?")
      .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
