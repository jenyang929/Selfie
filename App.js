import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import SelfiePreview from "./SelfiePreview";

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/" underlayColor="#f0f4f7">
            <Text>Home</Text>
          </Link>
          <Link to="/camera" underlayColor="#f0f4f7">
            <Text>Camera</Text>
          </Link>
        </View>
      </View>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/camera" component={SelfiePreview} />
      </Switch>
    </NativeRouter>
  );
}

function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: "center",
    fontSize: 15,
  },
});
