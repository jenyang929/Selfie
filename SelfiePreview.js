import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import CameraPermissionsWrapper from "./CameraPermissionsWrapper";
import { useHistory } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelfiePreview() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const cameraRef = useRef(null);
  let history = useHistory();

  const savePhotoToListView = async (photo) => {
    try {
      const photosJSON = await AsyncStorage.getItem("photos");
      await AsyncStorage.setItem(
        "photos",
        JSON.stringify([photo, ...JSON.parse(photosJSON)])
      );
    } catch (e) {
      console.log(e);
    }
    history.push("/");
  };

  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
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
          onPress={() => {
            setLastPhotoURI(null);
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <CameraPermissionsWrapper>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
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
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
          </TouchableOpacity>
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
            onPress={async () => {
              if (cameraRef.current) {
                let photo = await cameraRef.current.takePictureAsync();
                setLastPhotoURI(photo.uri);
                console.log("photo", photo);
                savePhotoToListView(photo);
              }
            }}
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
