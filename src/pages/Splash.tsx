import React from 'react';
import { Text, View } from 'react-native';
const logo = require('../assets/whoget-rn-logo.png');
const Splash = () => {
  console.log(logo);
  return (
    <View className="justify-center items-center bg-slate-100 p-8 rounded-lg">
      {/* <Image source={logo}/> */}
      <Text className="text-3xl font-bold text-indigo-800">WhoGet</Text>
      <Text className="text-center text-orange-600">Loading</Text>
    </View>
  );
};

export default Splash;
