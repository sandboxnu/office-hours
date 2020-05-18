// proxy requests to server and app so that everything can run on same port
// On prod, this is handled by NGINX.

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const proxy = createProxyMiddleware({
  target: "http://localhost:3001",
  router: {
    "/api": "http://localhost:3002",
    "/socket.io": "http://localhost:3002",
  },
  ws: true,
  logLevel: 'warn'
});

app.use("/", proxy);
app.listen(3000);
