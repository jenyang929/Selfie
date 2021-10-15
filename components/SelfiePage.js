import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { entireScreenWidth, entireScreenHeight } from "../styles/dimensions";
import { Typography } from "../styles/typography";

export default function SelfiePage({ match }) {
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
            source={require("../assets/arrow.png")}
          />
        </Link>
        <Text style={[styles.photoPreviewTitle, { fontSize: 18 }]}>Selfie</Text>
      </View>

      <View style={{ display: "flex" }}>
        <Image style={styles.selfieImage} source={{ uri: currPhoto?.uri }} />
        <View style={styles.dateTimeContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  photoPreviewContainer: {
    display: "flex",
    ...Typography.regular,
  },
  selfieImage: {
    width: entireScreenWidth * 0.9,
    height: entireScreenHeight * 0.5,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  photoPreviewHeader: {
    position: "relative",
    flexDirection: "row",
    padding: 20,
  },
  photoPreviewTitle: {
    position: "absolute",
    left: "50%",
    marginTop: 25,
  },
  dateTimeContainer: {
    margin: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
