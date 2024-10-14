module.exports = {
  apps: [
    {
      name: 'paper-toys',
      script: '../dist/main.js',
      instances: 0,
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
};
