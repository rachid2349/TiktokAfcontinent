import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Video from 'react-native-video';
import { firebase } from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videosSnapshot = await firebase.firestore().collection('videos').get();
      setVideos(videosSnapshot.docs.map(doc => doc.data()));
    };

    fetchVideos();
  }, []);

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => (
          <Video source={{ uri: item.url }} style={{ width: '100%', height: 300 }} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;
