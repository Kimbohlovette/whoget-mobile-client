import React from 'react';
import { View } from 'react-native';
import Styles from './SharedStyles';
import CreateAsk from './pages/CreateAsk';

const App = () => {
  return (
    <>
      <View className="py-5 h-full" style={Styles.appBackgroundColor}>
        <View className="px-4">
          <CreateAsk />
        </View>
      </View>
    </>
  );
};

export default App;
