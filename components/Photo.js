import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from "react-router-native";
import { Typography } from "../styles/typography";
import { entireScreenWidth, entireScreenHeight } from "../styles/dimensions";

export default function Photo({ photo, photoId }) {
  return (
    <View style={styles.selfieItem}>
      <Link to={`/selfie/${photoId}`} underlayColor="#f0f4f7">
        <Image style={styles.selfie} source={{ uri: photo.uri }} />
      </Link>

      <View pointerEvents="none" style={styles.dateTimeContainer}>
        <Text style={styles.dateTime}>{photo.date}</Text>
        <Text style={styles.dateTime}>{photo.time}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  selfieItem: {
    width: "40%",
    paddingBottom: 13,
    position: "relative",
  },
  selfie: {
    borderRadius: 15,
    width: entireScreenWidth / 2.5,
    height: entireScreenHeight / 3.75,
  },
  dateTime: {
    color: "white",
    ...Typography.regular,
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
