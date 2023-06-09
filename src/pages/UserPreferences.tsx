import { View, ScrollView, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../SharedStyles';

const UserPreferences = () => {
  return (
    <ScrollView style={Styles.pageContainer} className="relative w-full">
      <Pressable
        android_ripple={{ color: 'slate', borderless: true }}
        className="absolute right-4 top-2 rounded-md overflow-hidden">
        <Icon name="close-outline" size={25} />
      </Pressable>
      <Text className="text-center text-2xl font-semibold my-8">WhoGet</Text>
      <View className="py-2">
        <Text className="text-center font-semibold text-slate-800">
          Explore the best of WhoGet
        </Text>
        <Text className="text-center text-slate-600">
          What are your interests?
        </Text>
        <View className="w-full flex-row flex-wrap justify-center gap-3 my-5">
          <View>
            <CatBtn name={'Health Care'} />
          </View>
          <View>
            <CatBtn name={'Health Care'} />
          </View>
          <View>
            <CatBtn name={'Health Care'} />
          </View>
          <View>
            <CatBtn name={'Health Care'} />
          </View>
          <View>
            <CatBtn name={'Health Care'} selected />
          </View>
          <View>
            <CatBtn name={'Health Care'} />
          </View>
          <View>
            <CatBtn name={'Health Care'} selected />
          </View>
          <View>
            <CatBtn name={'Health Care'} selected />
          </View>
        </View>
        <View className="items-center mt-5">
          <View className="items-center justify-center bg-indigo-900 w-1/2 rounded-md">
            <Pressable android_ripple={{}} className="py-2 w-full">
              <Text className="text-center text-sm text-white font-medium">
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const CatBtn = (props: { name: string; selected?: boolean }) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (props.selected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.selected]);

  const toggleSelect = () => {
    setSelected(select => !select);
  };
  return (
    <View className="relative items-center border border-slate-300 rounded-md">
      <Pressable
        android_ripple={{ color: 'slate' }}
        onPress={toggleSelect}
        className="py-2 px-2 ">
        <Text className="">{props.name}</Text>
      </Pressable>
      {selected && (
        <View className="absolute rounded-full bg-orange-400 w-5 aspect-square justify-center items-center -top-1 -right-1 z-50">
          <Text className="text-[10px] text-white">25</Text>
        </View>
      )}
    </View>
  );
};
export default UserPreferences;
