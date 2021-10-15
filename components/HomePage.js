import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Photo from "./Photo";

export default function HomePage() {
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
    <View style={{ flex: 1 }}>
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
            source={require("../assets/camera.png")}
          />
        </Link>
      </View>
      <ScrollView>
        <View style={styles.selfiesContainer}>
          {allPhotos.map((photo, idx) => {
            return <Photo photo={photo} photoId={idx} key={`photo-${idx}`} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
});
