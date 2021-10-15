import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { Link } from "react-router-native";
import { styles } from "./App";

export default function ListView({ match }) {
  const { id } = match.params;
  const [allPhotos, getAllPhotos] = useState([]);
  const [currPhoto, getCurrPhoto] = useState({});

  useEffect(() => {
    (async () => {
      const currentSelfie = await AsyncStorage.getItem("photos");
      getAllPhotos(JSON.parse(currentSelfie));
      getCurrPhoto(allPhotos[id]);
    })();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Link to="/" underlayColor="#f0f4f7">
          <Text>Home</Text>
        </Link>
        <Text>View My Selfie</Text>
      </View>
      <View>
        <Image
          style={{ width: 350, height: 350, borderRadius: 20, padding: 20 }}
          source={{ uri: currPhoto?.uri }}
        />
      </View>
      <View style={styles.header}>
        <Text>Date</Text>
        <Text>Time</Text>
      </View>
    </View>
  );
}
