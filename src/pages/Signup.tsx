import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import React from 'react';
import Styles from '../SharedStyles';

const Signup = () => {
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
            <Image source={require('../assets/google.png')} className="mr-4" />
            <Text>Continue with Google</Text>
          </Pressable>
        </View>
        <View className="py-8 gap-y-5">
          <View className="flex-row gap-1 items-center justify-center">
            <Text className="text-center text-slate-600">
              Already have an account?{' '}
            </Text>
            <View>
              <Pressable>
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
