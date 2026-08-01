import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const candidateRoot = path.resolve(fileURLToPath(new URL("../", import.meta.url)));

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  }[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function candidateHead() {
  return execFileSync("git", ["-C", candidateRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
}

function resolveFilePath(requestPath) {
  const decodedPath = decodeURIComponent(requestPath);
  const relativePath = decodedPath.replace(/^[/\\]+/, "");
  const filePath = path.resolve(candidateRoot, relativePath);
  if (filePath !== candidateRoot && !filePath.startsWith(`${candidateRoot}${path.sep}`)) return null;
  return filePath;
}

export async function startCandidateServer({ port = 0 } = {}) {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      let filePath = resolveFilePath(requestUrl.pathname);
      if (!filePath) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeType(filePath),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
  const address = server.address();
  const record = {
    candidateHead: candidateHead(),
    serverPid: process.pid,
    port: address.port,
    workingDirectory: candidateRoot,
    baseUrl: `http://127.0.0.1:${address.port}`,
    directReviewUrl: `http://127.0.0.1:${address.port}/strategium/review/`,
    hubUrl: `http://127.0.0.1:${address.port}/strategium/`,
  };
  return {
    ...record,
    close: () => new Promise(resolve => server.close(resolve)),
  };
}

async function main() {
  const server = await startCandidateServer();
  console.log(JSON.stringify(server, null, 2));
  console.log(`OWNER_REVIEW_URL=${server.directReviewUrl}`);
  console.log(`OWNER_HUB_URL=${server.hubUrl}`);
  console.log("Fresh port selected; no existing process was reused.");
  if (!process.argv.includes("--serve")) {
    await server.close();
    return;
  }
  const close = async () => {
    await server.close();
    process.exit(0);
  };
  process.once("SIGINT", close);
  process.once("SIGTERM", close);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
