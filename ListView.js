import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function ListView({ match }) {
  const { id } = match.params;
  const [currPhoto, getCurrPhoto] = useState({});

  useEffect(() => {
    (async () => {
      const currentSelfie = await AsyncStorage.getItem("photos");
      const parsedSelfies = JSON.parse(currentSelfie);
      getCurrPhoto(parsedSelfies[id]);
    })();
  }, []);

  return (
    <View style={styles.photoPreviewContainer}>
      <View style={styles.photoPreviewHeader}>
        <Link to="/" underlayColor="#f0f4f7">
          <Image
            style={{ width: 25, height: 25 }}
            source={require("./arrow.png")}
          />
        </Link>
        <Text style={[styles.photoPreviewTitle, { fontSize: 18 }]}>Selfie</Text>
      </View>
      <View style={{ display: "flex" }}>
        <Image
          style={{
            width: 350,
            height: 350,
            borderRadius: 20,
            justifyContent: "center",
            alignSelf: "center",
          }}
          source={{ uri: currPhoto?.uri }}
        />
      </View>
      <View style={styles.jcsb}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18 }}>
          {currPhoto?.date}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            textDecorationLine: "underline",
            fontSize: 18,
          }}
        >
          {currPhoto?.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoPreviewContainer: {
    display: "flex",
    fontFamily: "Inter",
  },
  photoPreviewHeader: {
    // display: "auto",
    // justifyContent: "space-between",
    position: "relative",
    flexDirection: "row",
    padding: 20,
  },
  photoPreviewTitle: {
    position: "absolute",
    left: "50%",
    marginTop: 25,
    // transform: [{ translateX: -50 }],
  },
  jcsb: {
    margin: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
