module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "run prod:start",
      cwd: "./packages/app",
    },
    {
      name: "server",
      script: "npm",
      args: "run prod:start",
      cwd: "./packages/server",
    },
  ],
  deploy: {
    staging: {
      user: "ubuntu",
      host: "128.31.24.252",
      ref: "origin/master",
      repo: "https://github.com/sandboxnu/office-hours.git",
      path: "/var/www",
      "pre-deploy-local": "",
      "post-deploy": "yarn i && yarn build && yarn prod:start",
      "pre-setup": "",
    },
  },
};
