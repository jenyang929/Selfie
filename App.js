import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
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
  const [allPhotos, addAllPhotos] = useState([]);
  useEffect(() => {
    (async () => {
      const photos = await AsyncStorage.getItem("photos");
      if (!photos) {
        AsyncStorage.setItem("photos", JSON.stringify([]));
      } else {
        addAllPhotos(JSON.parse(photos));
      }
    })();
  }, []);

  return (
    <View>
      <Text>Home</Text>
      {allPhotos &&
        allPhotos.map((photo) => {
          return (
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: photo.uri }}
            />
          );
        })}
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//   },
//   tinyLogo: {
//     width: 50,
//     height: 50,
//   },
//   logo: {
//     width: 66,
//     height: 58,
//   },
// });
