import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  return (
    <View className="items-center">
      <View className="flex-row gap-1 my-4">
        <Text className="font-semibold text-slate-800">Ebai Vani</Text>
        <Icon name="md-chevron-down-sharp" color={'slate'} size={18} />
      </View>
      <View className="relative bg-primary-600 h-20 aspect-square rounded-full justify-center items-center">
        <Text className="font-bold text-white text-xl">E</Text>
        <Pressable className="absolute bottom-0 left-2/3 bg-secondary-500 rounded-full border-2 border-secondary-500 shadow">
          <Icon name="md-add" size={16} color="white" />
        </Pressable>
      </View>
      <View className="my-4 w-3/4">
        <View>
          <Text className="text-center text-slate-400">Phone number</Text>
          <TextInput
            editable={editable}
            defaultValue="+237 671238458"
            className="text-slate-600 text-center font-medium border border-slate-300 py-1 rounded-lg w-full px-8 my-2"
          />
        </View>
        <View>
          <Text className="text-center text-slate-400">Location</Text>
          <TextInput
            defaultValue="Douala Cameroon"
            editable={editable}
            className="text-slate-600 text-center font-medium border border-slate-300 py-1 rounded-lg w-full px-8 my-2"
          />
        </View>
        <View className="flex-row justify-center items-center gap-2 my-2">
          <Pressable
            onPress={() => {
              if (!editable) {
                setEditable(true);
              } else {
                // Handle save
                setEditable(false);
              }
            }}
            android_ripple={{ color: 'lightgray' }}
            className="flex-1 flex-row items-center gap-x-2 justify-center text-slate-600 border border-slate-300 py-1 rounded-lg px-4 my-2 bg-primary-50">
            {!editable && <Icon name="pencil-sharp" size={16} />}
            <Text className="text-center text-slate-600">
              {editable ? 'Save' : 'Edit profile'}
            </Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: 'lightgray' }}
            className="flex-1 flex-row items-center gap-x-2 justify-center text-slate-600 border border-slate-300 py-1 rounded-lg px-4 my-2 bg-primary-50">
            <Icon name="help-circle-outline" size={16} />
            <Text className="text-center text-slate-600">Help</Text>
          </Pressable>
        </View>
      </View>
      <View className="w-full">
        <View>
          <Text className="text-slate-700">My Asks</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
