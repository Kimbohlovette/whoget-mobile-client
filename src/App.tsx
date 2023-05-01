import React from 'react';
import { View } from 'react-native';
import Asks from './pages/Asks';

const App = () => {
  return (
    <>
      <View className="flex items-center py-5 h-full bg-slate-50">
        <Asks />
      </View>
    </>
  );
};

export default App;
