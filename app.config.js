import { config } from "dotenv";

// Load environment variables from a .env file
config();

const myConfig = ({ config: appConfig }) => ({
  name: appConfig.name || "my-app",
  slug: appConfig.slug || "my-app",
  version: appConfig.version || "1.0.0",
  orientation: appConfig.orientation || "portrait",
  icon: appConfig.icon || "./assets/icon.png",
  userInterfaceStyle: appConfig.userInterfaceStyle || "light",
  splash: appConfig.splash || {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: appConfig.assetBundlePatterns || ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ichirs96.myapp",
    ...(appConfig.ios || {}),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    ...(appConfig.android || {}),
  },
  web: {
    favicon: "./assets/favicon.png",
    ...(appConfig.web || {}),
  },
  plugins: appConfig.plugins || ["expo-router"],
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
