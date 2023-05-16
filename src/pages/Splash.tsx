import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import Styles from '../SharedStyles';
const logo = require('../assets/whoget-primary.png');
const Splash = () => {
  return (
    <>
      <StatusBar backgroundColor={Styles.bgPrimary.backgroundColor} />
      <View className="w-full h-screen justify-center items-center">
        <Image source={logo} className="h-36 aspect-video" />
      </View>
    </>
  );
};

export default Splash;
