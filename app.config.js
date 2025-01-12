import { config } from "dotenv";

// Load environment variables from a .env file
config();

const myConfig = ({ config: appConfig }) => ({
  ...appConfig,
  extra: {
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    baseURL: process.env.BASE_URL,
    router: {
      origin: false,
    },
    eas: {
      projectId: "7b6ae1a1-08cc-44db-9259-0e305fb40cb7",
    },
  },
});

export default myConfig;
