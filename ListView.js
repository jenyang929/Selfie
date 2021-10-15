import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { Link } from "react-router-native";
import { styles } from "./App";

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
        <Text style={styles.photoPreviewTitle}>Selfie</Text>
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
        <Text>{currPhoto?.date}</Text>
        <Text style={{ textDecorationLine: "underline" }}>
          {currPhoto?.time}
        </Text>
      </View>
    </View>
  );
}
