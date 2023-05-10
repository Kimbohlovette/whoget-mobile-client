import React from 'react';
import { Image, View } from 'react-native';
const logo = require('../assets/whoget-primary.png');
const Splash = () => {
  return (
    <View className="w-full h-screen justify-center items-center">
      <Image source={logo} className="h-36 aspect-video" />
    </View>
  );
};

export default Splash;
