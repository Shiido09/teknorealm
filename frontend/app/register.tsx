import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { RegisterForm } from '@/components/Auth';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function RegisterScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // Fix the ref type to use any as a workaround
  const cameraRef = useRef<any>(null);

  const handleClose = () => {
    router.back();
  };

  const goToLogin = () => {
    router.replace('/login');
  };

  const defaultAddress = '123 Main St'; // Example address

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        setShowCamera(false);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {showCamera ? (
        <View style={styles.fullScreenCamera}>
          <CameraView 
            ref={cameraRef}
            style={styles.camera} 
            facing={facing}
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.buttonText}>✕</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.flipButton} 
                onPress={toggleCameraFacing}
              >
                <Text style={styles.buttonText}>⟲</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.captureButtonContainer}>
              <TouchableOpacity 
                style={styles.captureButton} 
                onPress={takePicture}
              />
            </View>
          </CameraView>
        </View>
      ) : (
        <View style={styles.formWrapper}>
          <RegisterForm
            onClose={handleClose}
            switchToLogin={goToLogin}
            address={defaultAddress}
          />

          <View style={styles.cameraSection}>
            {capturedImage ? (
              <View style={styles.previewContainer}>
                <Image 
                  source={{ uri: capturedImage }} 
                  style={styles.previewImage} 
                />
                <Button 
                  title="Retake Photo" 
                  onPress={() => setShowCamera(true)} 
                />
              </View>
            ) : (
              <Button 
                title="Take Photo ID" 
                onPress={() => setShowCamera(true)} 
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  cameraSection: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  fullScreenCamera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 11,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  previewContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});