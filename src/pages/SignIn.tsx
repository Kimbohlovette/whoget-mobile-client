import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import Styles from '../SharedStyles';
import { signinWithGoogle } from '../apiService/fetchingFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../store/hooks';
import { updateAuthStatus } from '../store/slices/userSlice';

const SignIn = () => {
  const dispatch = useAppDispatch();
  return (
    <ScrollView style={Styles.pageContainer}>
      <View className="w-full">
        <View className="justify-center items-center">
          <Image
            source={require('../assets/whoget-primary.png')}
            className="h-28 aspect-video"
          />
        </View>
        <View className="w-5/6 mx-auto bg-white p-5">
          <Text className="my-8 text-lg text-center text-slate-700 font-semibold">
            Sign in to your account
          </Text>
          <View className="gap-y-4 justify-center items-center">
            <Pressable
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
                signinWithGoogle().then(response => {
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
              }}
              android_ripple={{ color: 'light-gray' }}
              className="w-full py-2 px-5 flex-row items-center justify-start border border-slate-300 rounded-md">
              <Image
                source={require('../assets/google.png')}
                className="mr-4"
              />
              <Text>Continue with Google</Text>
            </Pressable>
          </View>
          <View className="py-8 gap-y-5">
            <View className="flex-row gap-1 items-center justify-center">
              <Text className="text-center text-slate-600">
                Don't have an account?
              </Text>
              <View>
                <Pressable>
                  <Text className="text-orange-400">Sign up</Text>
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
      </View>
    </ScrollView>
  );
};

export default SignIn;
