// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from "dotenv";

config();

const myConfig = ({ appConfig }) => ({
  ...appConfig,
  extra: {
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
  },
});

export default myConfig;
