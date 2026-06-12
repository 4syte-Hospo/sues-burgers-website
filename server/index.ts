import cors from "cors";
import express from "express";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { serverEnv } from "./config/env.js";
import { careersRouter } from "./routes/careers.js";
import { contactRouter } from "./routes/contact.js";
import { healthRouter } from "./routes/health.js";

const app = express();
const rootDir = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/contact", contactRouter);
app.use("/api/careers", careersRouter);

if (serverEnv.isProduction) {
  const distDir = resolve(rootDir, "dist");
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(resolve(distDir, "index.html"));
  });
}

app.listen(serverEnv.port, () => {
  console.info(`[server] listening on http://localhost:${serverEnv.port}`);
});
