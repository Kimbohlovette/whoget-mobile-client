import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

const PageHeader = (props: { navigation?: any; component: JSX.Element }) => {
  return (
    <View className="flex-row items-center gap-x-2">
      {props.navigation && (
        <View className="overflow-hidden rounded-lg">
          <Pressable
            onPress={() => {
              props.navigation.goBack();
            }}
            android_ripple={{ color: 'lightgray' }}
            className=" px-2 py-1 rounded-md">
            <Text>
              <Ionicon name="md-arrow-back" size={18} />
            </Text>
          </Pressable>
        </View>
      )}
      {props.component}
    </View>
  );
};

export default PageHeader;
