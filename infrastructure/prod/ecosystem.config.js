module.exports = {
  apps: [
    {
      name: "app",
      script: "./node_modules/.bin/next",
      args: "start -p 3001",
      cwd: "./packages/app",
      instances: 2,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "server",
      cwd: "./packages/server",
      script: "dist/main.js",
      node_args: "--max-old-space-size=4096",
      instances: 2,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    staging: {
      user: "ubuntu",
      host: "67.205.180.129",
      ref: "origin/dist",
      repo: "https://github.com/ubco-db/office-hours.git",
      path: "/",
      "pre-deploy-local": "",
      "post-deploy":
        "yarn && yarn typeorm migration:run && yarn pm2 startOrReload ./infrastructure/prod/ecosystem.config.js",
      "pre-setup": "",
    },
  },
};
