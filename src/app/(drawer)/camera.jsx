import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import { Text, Button, IconButton, Dialog, Portal } from "react-native-paper";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const Camera = () => {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [torch, setTorch] = useState(false);
  const [captureTime, setCaptureTime] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const [permission, requestPermission] =
    useCameraPermissions();
  const { colors, darkMode } = useTheme();

  if (!permission) {
    return (
      <View style={[styles.permission, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.permission, { backgroundColor: colors.background }]}>
        <View style={[styles.permissionCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={[styles.permissionIcon, { backgroundColor: colors.chipBg }]}>
            <Ionicons name="camera" size={32} color={colors.primary} />
          </View>
          <Text variant="titleMedium" style={{ color: colors.text, fontWeight: '700', textAlign: 'center' }}>
            Camera Permission Required
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.textMuted, textAlign: 'center', marginTop: 8 }}>
            We need camera access to capture survey site photos
          </Text>
          <Button
            mode="contained"
            onPress={requestPermission}
            style={{ marginTop: 20, borderRadius: 12 }}
            buttonColor={colors.primary}
            contentStyle={{ paddingVertical: 4 }}
          >
            Grant Permission
          </Button>
        </View>
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
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    setPhoto(null);
    setCaptureTime("");
    setDeleteDialogVisible(false);
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
          <Text style={{ color: 'white', marginTop: 12, fontSize: 14 }}>Initializing camera...</Text>
        </View>
      )}

      {/* Camera Controls */}
      <View style={styles.controlsBar}>
        {/* Flip */}
        <Pressable
          style={styles.controlBtn}
          onPress={() => setFacing(current => current === "back" ? "front" : "back")}
        >
          <Ionicons name="camera-reverse-outline" size={26} color="white" />
          <Text style={styles.controlLabel}>Flip</Text>
        </Pressable>

        {/* Capture - Large */}
        <Pressable
          style={styles.captureOuter}
          onPress={takePhoto}
        >
          <View style={styles.captureInner} />
        </Pressable>

        {/* Torch */}
        <Pressable
          style={[styles.controlBtn, torch && styles.controlBtnActive]}
          onPress={() => setTorch(!torch)}
        >
          <Ionicons name={torch ? "flash" : "flash-outline"} size={26} color={torch ? '#FBBF24' : 'white'} />
          <Text style={[styles.controlLabel, torch && { color: '#FBBF24' }]}>{torch ? 'On' : 'Off'}</Text>
        </Pressable>
      </View>

      {/* Photo Preview Overlay */}
      {photo && (
        <View style={styles.previewOverlay}>
          <View style={styles.previewCard}>
            <Image
              source={{ uri: photo }}
              style={styles.previewImage}
            />
            <View style={styles.timeStamp}>
              <Ionicons name="time-outline" size={14} color="white" />
              <Text style={styles.timeText}>{captureTime}</Text>
            </View>
            <View style={styles.previewActions}>
              <Button
                mode="outlined"
                onPress={deletePhoto}
                textColor="#F87171"
                style={{ borderColor: '#F87171', borderRadius: 12, flex: 1 }}
                icon="delete-outline"
              >
                Delete
              </Button>
              <Button
                mode="contained"
                onPress={() => setPhoto(null)}
                buttonColor="#4F46E5"
                style={{ borderRadius: 12, flex: 1 }}
                icon="camera"
              >
                Retake
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* Delete Dialog */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)} style={{ borderRadius: 16 }}>
          <Dialog.Icon icon="delete-alert" color={colors.danger} />
          <Dialog.Title style={{ textAlign: 'center' }}>Delete Photo?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>This photo will be permanently removed.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmDelete} textColor={colors.danger}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    padding: 20,
  },
  permissionCard: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    maxWidth: 340,
  },
  permissionIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  camera: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  controlBtn: {
    alignItems: 'center',
    gap: 4,
    padding: 12,
    borderRadius: 16,
  },
  controlBtnActive: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
  },
  controlLabel: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  captureOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'white',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  previewImage: {
    width: '100%',
    height: 300,
  },
  timeStamp: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },
});
