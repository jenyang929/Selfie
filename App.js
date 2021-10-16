import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import { useLocation } from "react-router-dom";
import CameraPage from "./components/CameraPage";
import SelfiePage from "./components/SelfiePage";
import HomePage from "./components/HomePage";
import { Typography } from "./styles/typography";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView>
        <Text>App loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <NativeRouter>
      <Routes />
    </NativeRouter>
  );
}

function Routes() {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    const backgroundColor = location.pathname === "/camera" ? "black" : "white";
    setBackgroundColor(backgroundColor);
  }, [location]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/camera" component={CameraPage} />
        <Route exact path="/selfie/:id" component={SelfiePage} />
      </Switch>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    ...Typography.regular,
  },
});
