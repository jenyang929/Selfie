import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import CameraPage from "./components/CameraPage";
import SelfiePage from "./components/SelfiePage";
import HomePage from "./components/HomePage";
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
import { Typography } from "./styles/typography";

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
      <View>
        <Text>App loading...</Text>
      </View>
    );
  }

  return (
    <NativeRouter>
      <View style={styles.container}></View>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/camera" component={CameraPage} />
        <Route exact path="/selfie/:id" component={SelfiePage} />
      </Switch>
    </NativeRouter>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    ...Typography.regular,
  },
});
