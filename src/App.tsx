import React from 'react';
import { View } from 'react-native';
import UserPreferences from './pages/UserPreferences';

const App = () => {
  return (
    <>
      <View className="flex items-center justify-center h-full bg-slate-100">
        <UserPreferences />
      </View>
    </>
  );
};

export default App;
