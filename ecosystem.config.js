module.exports = {
  apps : [{
    name   : "main-server",
    script : "./src/app.js",
    max_memory_restart: "300M",

    // out_file: "./logs/pm2/out.log",
    // error_file: "./logs/pm2/error.log",
    out_file: "/dev/null",
    error_file: "/dev/null",
    
    env_production: {
      NODE_ENV: "production",
      PORT: 8080,
      exec_mode: "cluster_mode",
      MONGODB_URI: "mongodb+srv://saumya:66044Mong!@cluster0.nr5ewec.mongodb.net/"
    },
    env_development: {
      NODE_ENV: "development",
      PORT: 3001,
      MONGODB_URI: "mongodb+srv://saumya:66044Mong!@cluster0.nr5ewec.mongodb.net/",
      watch: true,
      watch_delay: 2000,
      ignore_watch: [
        "node_modules",
        "package.json",
        "yarn.lock",
        "logs/winston",
        "\\.git", "*.log"
      ],
    },
  }]
}
