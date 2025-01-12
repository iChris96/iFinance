/* eslint-disable global-require */
import React from "react";
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { SessionProvider } from "../store/AuthContext";

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line global-require
    "Montserrat-Light": require("../assets/fonts/MontserratExtralight-jEZ6j.ttf"),
    "Montserrat-Regular": require("../assets/fonts/MontserratRegular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/MontserratSemibold.ttf"),
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
};

export default Root;
