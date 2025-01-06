const path = require("path");

module.exports = {
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}"
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}"
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}"
    }
  },

  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  webpack(config, { isServer }) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    };

    if (!isServer) {
      config.output.environment = {
        ...config.output.environment,
        asyncFunction: true
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/api",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization"
          }
        ]
      }
    ];
  }
};
