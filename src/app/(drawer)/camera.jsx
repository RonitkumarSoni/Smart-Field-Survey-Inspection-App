import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

const Camera = () => {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [torch, setTorch] = useState(false);

  const [permission, requestPermission] =
    useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permission}>
        <Button
          title="Grant Camera Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync();

        if (result) {
          setPhoto(result.uri);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        enableTorch={torch}
      />

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
        <Image
          source={{ uri: photo }}
          style={styles.image}
        />
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

  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 10,
  },
});
