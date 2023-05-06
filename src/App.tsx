import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Asks from './pages/Asks';
import AskDetails from './pages/AskDetails';
import CreateAsk from './pages/CreateAsk';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { useAppSelector } from './store/hooks';
import Styles from './SharedStyles';
import { Image, View } from 'react-native';
import UserPreferences from './pages/UserPreferences';
import Splash from './pages/Splash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return !isLoading ? (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Notifications" component={Notifications} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <HomeScreen />
      )}
    </NavigationContainer>
  ) : (
    <Splash />
  );
};

const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Categories" component={UserPreferences} />
    </Stack.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          header: NavHeader,
          statusBarColor: Styles.bgPrimary.backgroundColor,
          headerTintColor: 'white',
          headerStyle: { ...Styles.bgPrimary },
        }}>
        <Stack.Screen name="Asks" component={Asks} />
        <Stack.Screen
          name="CreateAsk"
          component={CreateAsk}
          options={{ headerTitle: 'Create ask' }}
        />
        <Stack.Screen name="Ask detail" component={AskDetails} />
        <Stack.Screen name="Authentication" component={AuthScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const NavHeader = () => {
  return (
    <View className="h-20 bg-primary-500 justify-end">
      <Image
        className="h-2/3 w-40"
        source={require('./assets/whoget-secondary3.png')}
      />
    </View>
  );
};
export default App;
