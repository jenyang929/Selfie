// import "inter-ui/inter.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import CameraPage from "./CameraPage";
import ListView from "./ListView";
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
  let [fontsLoaded] = useFonts({
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
        <Route exact path="/" component={Home} />
        <Route exact path="/camera" component={CameraPage} />
        <Route exact path="/selfie/:id" component={ListView} />
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
      <View style={styles.header}>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 18 }}>
          Sort
        </Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 18 }}>
          Selfies
        </Text>
        <Link to="/camera" underlayColor="#f0f4f7">
          <Image
            style={{ width: 25, height: 25 }}
            source={require("./camera.png")}
          />
        </Link>
      </View>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.selfiesContainer}>
            {allPhotos.map((photo, idx) => {
              return (
                <View style={styles.item}>
                  <Link to={`/selfie/${idx}`} underlayColor="#f0f4f7">
                    <Image
                      key={idx}
                      style={styles.selfie}
                      source={{ uri: photo.uri }}
                    />
                  </Link>

                  <View pointerEvents="none" style={styles.dateTimeContainer}>
                    <Text style={styles.dateTime}>{photo.date}</Text>
                    <Text style={styles.dateTime}>{photo.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    fontFamily: "Inter_400Regular",
  },
  header: {
    fontSize: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
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
  selfiesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingLeft: 18,
    paddingRight: 18,
  },
  item: {
    width: "50%",
    position: "relative",
    paddingBottom: 13,
  },
  selfie: {
    borderRadius: 15,
    width: 153,
    height: 225,
  },
  dateTime: {
    color: "white",
    fontFamily: "Inter_400Regular",
  },
  dateTimeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
