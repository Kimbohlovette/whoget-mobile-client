import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';
import React from 'react';

const SignIn = () => {
  return (
    <SafeAreaView>
      <View className="w-full">
        <Text className="text-center text-2xl font-bold my-5">WhoGet</Text>
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
    </SafeAreaView>
  );
};

export default SignIn;