import React, { useRef } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import CameraPermissionsWrapper from "./CameraPermissionsWrapper";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-native";
import { entireScreenWidth } from "../styles/dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraPage() {
  const cameraRef = useRef(null);
  const history = useHistory();

  const savePhotoToSelfiePage = async () => {
    try {
      if (!cameraRef?.current) {
        return;
      }

      const photo = await cameraRef.current.takePictureAsync();
      const now = new Date();
      const time = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
      }).format(now);
      const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
      }).format(now);

      const photosJSON = await AsyncStorage.getItem("photos");
      await AsyncStorage.setItem(
        "photos",
        JSON.stringify([{ ...photo, time, date }, ...JSON.parse(photosJSON)])
      );
    } catch (e) {
      console.log(e);
    }
    history.push("/");
  };

  return (
    <CameraPermissionsWrapper>
      <View style={styles.header}>
        <Link to="/" underlayColor="#f0f4f7">
          <Image
            style={styles.backButton}
            source={require("../assets/arrow-left.png")}
          />
        </Link>
      </View>

      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        ref={cameraRef}
      ></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={savePhotoToSelfiePage}
        ></TouchableOpacity>
      </View>
    </CameraPermissionsWrapper>
  );
}

export const styles = StyleSheet.create({
  header: {
    padding: 20,
    width: entireScreenWidth * 0.1,
  },
  backButton: {
    width: 25,
    height: 25,
    backgroundColor: "black",
  },
  camera: {
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
