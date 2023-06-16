import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Styles from '../SharedStyles';
import { createUser } from '../apiService/fetchingFunctions';
import { updateAuthStatus, updateProfile } from '../store/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
const AdditionalSignupInfo = () => {
  const userInfo = useAppSelector(state => state.user.user);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <ScrollView className="px-4 bg-white">
      <Text className="text-slate-600 text-lg font-medium my-5">
        Complete your signup by filling the form below
      </Text>
      <View className="gap-y-4">
        <View>
          <Text className="py-1 text-primary-500 text-lg">Name</Text>
          <TextInput
            onChangeText={setName}
            defaultValue={userInfo.name || ''}
            keyboardType="default"
            className="bg-white border border-slate-300 rounded-lg px-4 text-lg text-slate-500 focus:border-primary-300"
            placeholder="E.g. Kimboh Betila Weke"
            placeholderTextColor={Styles.bgPrimaryLight.backgroundColor}
          />
        </View>
        <View>
          <Text className="py-1 text-primary-500 text-lg">
            Email (Not editable)
          </Text>
          <TextInput
            editable={false}
            defaultValue={userInfo.email || ''}
            keyboardType="email-address"
            className="bg-white border border-slate-300 rounded-lg px-4 text-lg font-extralight text-slate-300"
            placeholder="Email"
            placeholderTextColor={Styles.bgPrimaryLight.backgroundColor}
          />
        </View>
        <View>
          <Text className="py-1 text-primary-500 text-lg">Phone Number</Text>
          <TextInput
            onChangeText={setPhoneNumber}
            defaultValue={userInfo.phoneNumber || ''}
            keyboardType="numbers-and-punctuation"
            className="bg-white border border-slate-300 rounded-lg px-4 text-lg text-slate-500 focus:border-primary-300"
            placeholder="E.g. 237 671927065"
            placeholderTextColor={Styles.bgPrimaryLight.backgroundColor}
          />
        </View>
        <View>
          <Text className="py-1 text-primary-500 text-lg">Current City</Text>
          <TextInput
            onChangeText={setCity}
            keyboardType="default"
            className="bg-white border border-slate-300 rounded-lg px-4 text-lg text-slate-500 focus:border-primary-300"
            placeholder="E.g. Bamenda"
            placeholderTextColor={Styles.bgPrimaryLight.backgroundColor}
          />
        </View>
        <View className="py-4 flex-row justify-end">
          <Pressable
            onPress={() => {
              const completeUser = {
                ...userInfo,
                name: name === '' ? userInfo.name : name,
                phoneNumber,
                location: city,
              };
              setIsSaving(true);
              createUser(completeUser)
                .then(newUser => {
                  console.log(newUser);
                  dispatch(updateProfile(completeUser));
                  dispatch(updateAuthStatus(true));
                })
                .catch(error => {
                  console.log(error);
                })
                .finally(() => {
                  setIsSaving(false);
                });
            }}
            disabled={isSaving}
            android_ripple={{ color: Styles.bgPrimaryDark.backgroundColor }}
            className="bg-primary-500 rounded-lg px-4 py-2 w-1/2 flex-row gap-x-1">
            <Text className="text-white text-center font-bold">
              Save & Continue
            </Text>
            {isSaving && <ActivityIndicator color={'white'} />}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdditionalSignupInfo;
