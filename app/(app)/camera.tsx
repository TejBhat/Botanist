import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { router } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={style.permissionContainer}>
        <Text style={style.text}>Camera permission required</Text>
        <TouchableOpacity onPress={requestPermission} style={style.button}>
          <Text style={style.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log(photo.uri); // image path
      router.back(); // later we’ll send image to AI
    }
  };

  return (
    <CameraView
      style={style.camera}
      ref={(ref) => setCameraRef(ref)}
    >
      <View style={style.controls}>
        <TouchableOpacity onPress={takePhoto} style={style.captureButton} />
      </View>
    </CameraView>
  );
}

const style = StyleSheet.create({
  camera: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
