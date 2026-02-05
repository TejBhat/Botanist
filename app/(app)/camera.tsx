import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { router } from "expo-router";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}> {/* ISSUE FIX: Changed style to styles */}
        <Text style={styles.text}>Camera permission required</Text> {/* ISSUE FIX: Changed style to styles */}
        <TouchableOpacity onPress={requestPermission} style={styles.button}> {/* ISSUE FIX: Changed style to styles */}
          <Text style={styles.buttonText}>Allow Camera</Text> {/* ISSUE FIX: Changed style to styles */}
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log(photo.uri); // image path
      router.push({
        pathname: "/(app)/loading",
        params: { imageUri: photo.uri }
      });
    }
  };

  return (
    <CameraView
      style={styles.camera} // ISSUE FIX: Changed style to styles
      ref={(ref) => setCameraRef(ref)}
    >
      <View style={styles.controls}> {/* ISSUE FIX: Changed style to styles */}
        <TouchableOpacity onPress={takePhoto} style={styles.captureButton} /> {/* ISSUE FIX: Changed style to styles */}
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({ // ISSUE FIX: Changed style to styles for consistency
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