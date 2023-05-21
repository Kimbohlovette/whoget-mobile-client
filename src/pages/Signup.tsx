import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../SharedStyles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createUser, signinWithGoogle } from '../apiService/fetchingFunctions';
import { toastAndroid } from '../shared/toastAndroid';
import { useAppDispatch } from '../store/hooks';
import { updateAuthStatus, updateProfile } from '../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation<any>();
  const [authMessge, setAuthMessage] = useState<string>('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1071190608503-hnua85ljh7c940id1qk2a28eqh68tslk.apps.googleusercontent.com',
    });
  }, []);
  return (
    <ScrollView style={Styles.pageContainer} className="w-full">
      <View className="justify-center items-center">
        <Image
          source={require('../assets/whoget-primary.png')}
          className="h-28 aspect-video"
        />
      </View>
      <View className="w-5/6 mx-auto bg-white p-5">
        <Text className="my-8 text-lg text-center text-slate-700 font-semibold">
          Signup to join WhoGet
        </Text>
        <View className="gap-y-4 justify-center items-center">
          <Pressable
            disabled
            android_ripple={{ color: 'light-gray' }}
            className="w-full py-2 px-5 flex-row items-center justify-start border border-slate-300 rounded-md">
            <Image
              source={require('../assets/facebook.png')}
              className="mr-4"
            />
            <Text>Continue with Facebook</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log('authenticating');
              signinWithGoogle().then(response => {
                if (response.additionalUserInfo?.isNewUser) {
                  // get info from the database and create a new user
                  const newUser = {
                    name: response.user.displayName,
                    email: response.user.email,
                    phoneNumber: response.user.phoneNumber,
                    profileImage: response.user.photoURL,
                    location: 'Buea',
                    role: 'user',
                    status: 'active',
                  };
                  createUser(newUser).then(newuser => {
                    toastAndroid('Great! You are signed in.');
                    dispatch(updateProfile(newuser));
                    response.user.getIdToken().then(token => {
                      AsyncStorage.setItem(
                        '@authToken',
                        JSON.stringify({
                          token,
                          email: response.user.email,
                        }),
                      );
                      dispatch(updateAuthStatus(true));
                    });
                  });
                  console.log(response.user.getIdToken());
                  dispatch(updateAuthStatus(true));
                  console.log('Google authentication complete.');
                  navigation.navigate('Categories');
                } else {
                  setAuthMessage('account_exists');
                  setTimeout(() => {
                    setAuthMessage('');
                    navigation.navigate('Signin');
                  }, 1000);
                }
              });
            }}
            android_ripple={{ color: 'light-gray' }}
            className="w-full py-2 px-5 flex-row items-center justify-start border border-slate-300 rounded-md">
            <Image source={require('../assets/google.png')} className="mr-4" />
            <Text>Continue with Google</Text>
          </Pressable>
          {authMessge === 'account_exists' && (
            <Text className="text-amber-700 text-center">
              Account already exists. Redirecting to signin...
            </Text>
          )}
          {authMessge === 'signup_successful' && (
            <Text className="text-amber-700 text-center">
              Successfully signed up. Redirecting to home page...
            </Text>
          )}
        </View>
        <View className="py-8 gap-y-5">
          <View className="flex-row gap-1 items-center justify-center">
            <Text className="text-center text-slate-600">
              Already have an account?
            </Text>

            <View>
              <Pressable
                onPress={() => {
                  navigation.replace('Signin');
                }}>
                <Text className="text-orange-400">Sign in</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text className="text-center text-xs">
              By clicking signup, you agree to our
            </Text>
            <Pressable>
              <Text className="text-xs text-center py-1 text-blue-400">
                Terms of service and privacy policy.
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
