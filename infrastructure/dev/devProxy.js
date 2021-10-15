// proxy requests to server and app so that everything can run on same port
// On prod, this is handled by NGINX.

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const proxy = createProxyMiddleware({
  target: "http://app:3001",
  router: {
    "/api": "http://server:3002",
    "/admin-static": "http://server:3002",
    "/admin": "http://server:3002/api/v1",
    "/socket.io": "http://server:3002",
  },
  ws: true,
  logLevel: "warn",
});

app.use("/", proxy);
app.listen(3000);
console.log("Proxy up on http://localhost:3000");
