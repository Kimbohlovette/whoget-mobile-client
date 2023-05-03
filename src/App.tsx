import React from 'react';
import { View } from 'react-native';
import Splash from './pages/Splash';
import Signup from './pages/Signup';
import Styles from './SharedStyles';
import SignIn from './pages/SignIn';
import Asks from './pages/Asks';
import Profile from './pages/Profile';

const App = () => {
  return (
    <>
      <View className="py-5 h-full" style={Styles.appBackgroundColor}>
        <View className="px-2">
          <Profile />
        </View>
      </View>
    </>
  );
};

export default App;
