import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import storage from '@react-native-firebase/storage';

const UploadScreen = () => {
  const [camera, setCamera] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (camera) {
      setIsRecording(true);
      const data = await camera.recordAsync();
      const videoRef = storage().ref(`/videos/${Date.now()}.mp4`);
      await videoRef.putFile(data.uri);
      const videoUrl = await videoRef.getDownloadURL();
      // Enviar URL para Firestore ou API
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (camera) {
      camera.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={ref => setCamera(ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
      />
      <Button
        onPress={isRecording ? stopRecording : startRecording}
        title={isRecording ? "Stop Recording" : "Start Recording"}
      />
    </View>
  );
};

export default UploadScreen;
