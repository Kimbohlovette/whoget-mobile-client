import React from 'react';
import { View } from 'react-native';
import Splash from './pages/Splash';
import Signup from './pages/Signup';
import Styles from './SharedStyles';
import SignIn from './pages/SignIn';
import Asks from './pages/Asks';

const App = () => {
  return (
    <>
      <View
        className="flex items-center py-5 h-full"
        style={Styles.appBackgroundColor}>
        <Asks />
      </View>
    </>
  );
};

export default App;
