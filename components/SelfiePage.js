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
    <View style={styles.selfieContainer}>
      <View style={styles.selfieHeader}>
        <Link to="/" underlayColor="#f0f4f7">
          <Image
            style={styles.backButton}
            source={require("../assets/arrow.png")}
          />
        </Link>
        <Text style={styles.selfieHeaderTitle}>Selfie</Text>
      </View>

      <View style={styles.selfieBody}>
        <Image style={styles.selfieImage} source={{ uri: currPhoto?.uri }} />
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>{currPhoto?.date}</Text>
          <Text style={styles.time}>{currPhoto?.time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selfieContainer: {
    display: "flex",
    ...Typography.regular,
  },
  backButton: { width: 25, height: 25 },
  selfieBody: {
    display: "flex",
  },
  selfieHeaderTitle: {
    position: "absolute",
    left: "50%",
    marginTop: 25,
    fontSize: 18,
  },
  selfieImage: {
    width: entireScreenWidth * 0.9,
    height: entireScreenHeight * 0.5,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  selfieHeader: {
    position: "relative",
    flexDirection: "row",
    padding: 20,
  },
  dateTimeContainer: {
    margin: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  date: {
    ...Typography.bold,
    fontSize: 18,
  },
  time: {
    ...Typography.bold,
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
