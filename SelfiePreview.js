import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import CameraPermissionsWrapper from "./CameraPermissionsWrapper";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelfiePreview() {
  const cameraRef = useRef(null);
  const history = useHistory();

  const savePhotoToListView = async () => {
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
      <View style={{ backgroundColor: "black" }}>
        <Link to="/" underlayColor="#f0f4f7">
          <Image
            style={{ width: 25, height: 25 }}
            source={require("./arrow-left.png")}
          />
        </Link>
      </View>

      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40,
              marginLeft: 20,
            }}
            onPress={savePhotoToListView}
          >
            <Text style={{ fontSize: 30, padding: 10, color: "white" }}>
              📸
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </CameraPermissionsWrapper>
  );
}
