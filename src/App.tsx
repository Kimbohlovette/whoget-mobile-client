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
import Styles from './SharedStyles';
import { Image, View } from 'react-native';
import UserPreferences from './pages/UserPreferences';
import Splash from './pages/Splash';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  AuthStackParamList,
  HomeStackParamList,
  RootTabParamList,
} from '../types';
import { useAppDispatch, useAppSelector } from './store/hooks';
import UserDetails from './pages/UserDetails';
import {
  fetchCategories,
  fetchOneUserById,
  saveCategoriesToAsyncStorage,
} from './apiService/fetchingFunctions';
import { updateProfile } from './store/slices/userSlice';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const App = () => {
  const dispatch = useAppDispatch();
  const [loadingInformation, setloadingInformation] = useState<
    'idle' | 'loading' | 'failed' | 'successful'
  >('idle');

  useEffect(() => {
    //Fetch user information
    setloadingInformation('loading');
    fetchOneUserById('6447d65c609ca79f62958e2f')
      .then(user => {
        if (!user) {
          console.log('User does not exists.');
        } else {
          setTimeout(() => {
            setloadingInformation('idle');
            dispatch(updateProfile(user));
          }, 1000);
        }
      })
      .catch(() => {
        'Could not update user profile';
      });

    // Fetch categories and store in the local storage
    fetchCategories(1, 2000)
      .then(cats => {
        saveCategoriesToAsyncStorage(cats)
          .then(() => console.log('local categories updated'))
          .catch(() => console.log('Error occured while updating categories'));
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  return loadingInformation !== 'loading' ? (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: Styles.bgPrimary.backgroundColor,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: props => {
                return (
                  <View {...props}>
                    <Ionicon
                      name="md-home-outline"
                      size={props.size}
                      color={props.color}
                    />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              header: NavHeader,
              tabBarIcon: props => {
                return (
                  <View {...props}>
                    <Ionicon
                      name="person-outline"
                      size={props.size}
                      color={props.color}
                    />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              header: NavHeader,
              tabBarIcon: props => {
                return (
                  <View {...props}>
                    <Ionicon
                      name="notifications-outline"
                      size={props.size}
                      color={props.color}
                    />
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <HomeScreen />
      )}
    </NavigationContainer>
  ) : (
    <Splash />
  );
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Signin" component={SignIn} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Categories" component={UserPreferences} />
    </AuthStack.Navigator>
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
        <Stack.Screen
          name="AskDetails"
          component={AskDetails}
          options={{ title: 'Ask detail' }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{ title: 'User details' }}
        />
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
