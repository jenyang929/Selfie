import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import CameraPermissionsWrapper from "./CameraPermissionsWrapper";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-native";

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
      <View style={{ backgroundColor: "black", padding: 20 }}>
        <Link to="/" underlayColor="#f0f4f7">
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/arrow-left.png")}
          />
        </Link>
      </View>

      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
        ref={cameraRef}
      ></Camera>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          flexDirection: "row",
          justifyContent: "center",
          maxWidth: "100%",
          height: "30%",
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 50,
            width: 70,
            height: 70,
            borderColor: "#fff",
            borderRadius: 50,
          }}
          onPress={savePhotoToSelfiePage}
        >
          {/* <Text style={{ fontSize: 30, padding: 10, color: "white" }}>
              📸
            </Text> */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              borderColor: "white",
              backgroundColor: "#fff",
            }}
          ></View>
        </TouchableOpacity>
      </View>
    </CameraPermissionsWrapper>
  );
}

export const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    // borderRadius: "50%",
  },
});
