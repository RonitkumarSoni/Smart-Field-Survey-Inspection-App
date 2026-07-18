import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useTheme } from "../../context/ThemeContext";

const Camera = () => {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [torch, setTorch] = useState(false);
  const [captureTime, setCaptureTime] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [permission, requestPermission] =
    useCameraPermissions();
  const { colors } = useTheme();

  if (!permission) {
    return (
      <View style={[styles.permission, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.permission, { backgroundColor: colors.background, padding: 20 }]}>
        <Text style={{ color: colors.text, marginBottom: 20, textAlign: 'center', fontSize: 16 }}>Camera permission is required to take survey photos</Text>
        <Pressable
          style={{
            backgroundColor: colors.card,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border
          }}
          onPress={requestPermission}
        >
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>Grant Camera Permission</Text>
        </Pressable>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync();

        if (result) {
          setPhoto(result.uri);
          setCaptureTime(new Date().toLocaleString());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletePhoto = () => {
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: () => {
          setPhoto(null);
          setCaptureTime("");
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        enableTorch={torch}
        onCameraReady={() => setIsCameraReady(true)}
      />

      {!isCameraReady && !photo && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Flip Camera"
          onPress={() =>
            setFacing((current) =>
              current === "back" ? "front" : "back"
            )
          }
        />

        <Button
          title="Take Picture"
          onPress={takePhoto}
        />

        <Button
          title={
            torch
              ? "Turn Off Flashlight"
              : "Turn On Flashlight"
          }
          onPress={() => setTorch(!torch)}
        />
      </View>

      {photo && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />
          <View style={styles.timeOverlay}>
            <Text style={styles.timeText}>{captureTime}</Text>
          </View>
          <View style={styles.deleteBtnContainer}>
            <Button title="Delete Photo" color="#dc3545" onPress={deletePhoto} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  permission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    flex: 1,
  },

  buttonContainer: {
    padding: 15,
    gap: 10,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  previewContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },

  timeOverlay: {
    position: "absolute",
    bottom: 60,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  timeText: {
    color: "white",
    fontSize: 12,
  },

  deleteBtnContainer: {
    marginTop: 10,
  }
});
