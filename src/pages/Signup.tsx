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
      <View className="bg-white p-5">
        <Text className="my-8 text-xl text-center text-slate-700 font-semibold">
          SIGN UP
        </Text>
        <View className="gap-y-8 justify-center items-center">
          <Pressable
            disabled
            android_ripple={{ color: 'light-gray' }}
            className="w-full py-3 px-5 flex-row items-center justify-start border border-slate-300 rounded-xl">
            <Image
              source={require('../assets/facebook.png')}
              className="mr-4"
            />
            <Text className="text-base">Continue with Facebook</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log('authenticating');
              signinWithGoogle().then(response => {
                if (response.additionalUserInfo?.isNewUser) {
                  // New user, get ready for signup proccess
                  const newUser = {
                    name: response.user.displayName,
                    email: response.user.email,
                    phoneNumber: response.user.phoneNumber,
                    profileImage: response.user.photoURL,
                    location: 'Buea',
                    role: 'user',
                    status: 'active',
                  };
                  dispatch(updateProfile(newUser));
                  navigation.navigate('AdditionalSignupInfo');
                } else {
                  response.user.getIdToken().then(token => {
                    AsyncStorage.setItem(
                      '@authToken',
                      JSON.stringify({
                        token,
                        email: response.user.email,
                      }),
                    );
                    dispatch(updateProfile({ email: response.user.email }));
                    dispatch(updateAuthStatus(true));
                  });
                }
              });
            }}
            android_ripple={{ color: 'light-gray' }}
            className="w-full py-3 px-5 flex-row items-center justify-start border border-slate-300 rounded-xl">
            <Image source={require('../assets/google.png')} className="mr-4" />
            <Text className="text-base">Continue with Google</Text>
          </Pressable>
          {authMessge === 'account_exists' && (
            <Text className="text-amber-700 text-center text-lg">
              Account already exists. Redirecting to signin...
            </Text>
          )}
          {authMessge === 'signup_successful' && (
            <Text className="text-amber-700 text-center text-sm">
              Successfully signed up. Redirecting to home page...
            </Text>
          )}
        </View>
        <View className="py-8 gap-y-5">
          <View className="flex-row gap-1 items-center justify-center">
            <Text className="text-center text-slate-600 text-base">
              Already have an account?
            </Text>

            <View>
              <Pressable
                onPress={() => {
                  navigation.replace('Signin');
                }}>
                <Text className="text-orange-400 text-base">Sign in</Text>
              </Pressable>
            </View>
          </View>
          <View className="mt-5">
            <Text className="text-center text-ms">
              By clicking signup, you agree to our
            </Text>
            <Pressable>
              <Text className="text-sm text-center py-1 text-blue-400">
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
