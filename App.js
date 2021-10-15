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
import SelfiePreview from "./SelfiePreview";
import ListView from "./ListView";

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        {/* <View style={styles.nav}>
          <Link to="/" underlayColor="#f0f4f7">
            <Text>Home</Text>
          </Link>
          <Link to="/camera" underlayColor="#f0f4f7">
            <Text>Camera</Text>
          </Link>
        </View> */}
      </View>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/camera" component={SelfiePreview} />
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
        <Text>Sort</Text>
        <Text>Selfies</Text>
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
            {allPhotos &&
              allPhotos.map((photo, idx) => {
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
  // scrollContainer: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight,
  // },
  // scrollView: {
  //   marginHorizontal: 20,
  // },
  container: {
    marginTop: 25,
    padding: 10,
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
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  item: {
    width: "50%",
    position: "relative",
    // textAlign: "center",
  },
  selfie: {
    borderRadius: 20,
    width: 175,
    height: 250,
    margin: 15,
  },
  photoPreviewContainer: {
    display: "flex",
    // width: "50%",
  },
  photoPreviewHeader: {
    // fontSize: 20,
    // display: "auto",
    // justifyContent: "space-between",
    position: "relative",
    flexDirection: "row",
    padding: 20,
  },
  photoPreviewTitle: {
    position: "absolute",
    left: "50%",
    // transform: [{ translateX: -50 }],
  },
  jcsb: {
    margin: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  dateTime: {
    color: "white",
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
