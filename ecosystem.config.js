module.exports = {
  apps: [
    {
      name: "medusa-app", // Application name
      script: "npm", // Command to run
      args: "run start", // Arguments (npm command to run)
      env: {
        NODE_ENV: "production", // Make sure it runs in production mode
      },
    },
  ],
};
