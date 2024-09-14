import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Styles from '../SharedStyles';
import { signinWithGoogle } from '../apiService/fetchingFunctions';

const SignIn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1071190608503-hnua85ljh7c940id1qk2a28eqh68tslk.apps.googleusercontent.com',
    });
  }, []);
  return (
    <ScrollView style={Styles.pageContainer}>
      <View className="w-full">
        <View className="justify-center items-center">
          <Image
            source={require('../assets/whoget-primary.png')}
            className="h-28 aspect-video"
          />
        </View>
        <View className="bg-white p-5">
          <Text className="my-8 text-xl text-center text-slate-700 font-semibold">
            SIGN IN
          </Text>
          <View className="gap-y-8 justify-center items-center">
            <Pressable
              android_ripple={{ color: 'light-gray' }}
              className="w-full py-3 px-5 flex-row items-center justify-start border border-slate-300 rounded-xl">
              <Image
                source={require('../assets/facebook.png')}
                className="mr-4"
              />
              <Text>Continue with Facebook</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                signinWithGoogle().then(response => {});
              }}
              android_ripple={{ color: 'light-gray' }}
              className="w-full py-3 px-5 flex-row items-center justify-start border border-slate-300 rounded-xl">
              <Image
                source={require('../assets/google.png')}
                className="mr-4"
              />
              <Text>Continue with Google</Text>
            </Pressable>
          </View>
          <View className="py-8 gap-y-5">
            <View className="flex-row gap-1 items-center justify-center">
              <Text className="text-center text-slate-600 text-base">
                Don't have an account?
              </Text>
              <View>
                <Pressable>
                  <Text className="text-orange-400 text-base">Sign up</Text>
                </Pressable>
              </View>
            </View>
            <View>
              <Text className="text-center text-sm">
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
      </View>
    </ScrollView>
  );
};

export default SignIn;
