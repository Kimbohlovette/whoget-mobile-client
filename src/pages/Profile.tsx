import { View, Text, Pressable, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { textEllipsis } from '../shared/ellipseText';
import { ScrollView } from 'react-native';
import Styles from '../SharedStyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAsksByUserId } from '../apiService/fetchingFunctions';
import { useNavigation } from '@react-navigation/native';
import { updateAuthStatus } from '../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { toastAndroid } from '../shared/toastAndroid';

const Profile = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [userAsks, setUserAsks] = useState([]);
  const user = useAppSelector(state => state.user.user);
  const [numOfAsks, setNumOfAsks] = useState(0);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchAsksByUserId(user.id)
      .then(data => {
        setUserAsks(data?.asks);
        setNumOfAsks(data?.numOfAsks);
      })
      .catch(() => {
        // handle error here
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    user && (
      <ScrollView contentContainerStyle={Styles.pageContainer}>
        <View className="items-center">
          <View className="relative justify-center items-center">
            <Pressable
              onPress={() => {
                setShowEmail(state => !state);
              }}
              className="flex-row gap-1 my-4">
              <Text className="font-semibold text-slate-800">{user.name}</Text>
              {showEmail ? (
                <Icon name="md-chevron-up-sharp" color={'slate'} size={18} />
              ) : (
                <Icon name="md-chevron-down-sharp" color={'slate'} size={18} />
              )}
            </Pressable>
            {showEmail && (
              <View
                style={Styles.btnShadow}
                className="absolute top-12 z-50 w-4/5 items-start justify-center py-4 px-8 bg-white rounded-sm">
                <Text className="text-slate-600 font-semibold mb-4">
                  My account
                </Text>
                <View className="divide-y divide-slate-200 w-full">
                  <View className="flex-row items-center justify-start gap-x-4">
                    <View className="justify-center items-center h-7 aspect-square bg-primary-400 rounded-full">
                      <Image
                        source={{ uri: user.profileImage }}
                        className="w-full h-full rounded-full"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-500">{user.email}</Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => {
                      GoogleSignin.signOut().then(() => {
                        AsyncStorage.removeItem('@authToken').then(() => {
                          dispatch(updateAuthStatus(false));
                          toastAndroid('You are signed out!');
                          console.log('You are signed out!');
                        });
                      });
                    }}
                    className="flex-row  gap-x-4 py-4 mt-5">
                    <Text>
                      <AntDesign name="logout" size={25} />
                    </Text>
                    <Text className="">Logout</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          <View className="relative bg-primary-600 h-20 aspect-square rounded-full justify-center items-center">
            <Image
              source={{ uri: user.profileImage }}
              className="w-full h-full rounded-full"
            />
            <Pressable className="absolute bottom-0 left-2/3 bg-secondary-500 rounded-full border-2 border-secondary-500 shadow">
              <Icon name="md-add" size={16} color="white" />
            </Pressable>
          </View>

          <View className="my-4 w-3/4">
            <View>
              <Text className="text-center text-slate-500">Phone number</Text>
              <TextInput
                defaultValue={user.contactNumber}
                className="text-slate-800 text-center font-bold border border-slate-300 py-3 rounded-lg w-full px-8 my-2"
              />
            </View>

            <View>
              <Text className="text-center text-slate-500">Location</Text>
              <TextInput
                defaultValue="Douala Cameroon"
                className="text-slate-800 text-center font-bold border border-slate-300 py-3 rounded-lg w-full px-8 my-2"
              />
            </View>

            <View className="flex-row justify-center items-center gap-2 my-2">
              <Pressable
                android_ripple={{ color: 'lightgray' }}
                className="flex-1 flex-row items-center gap-x-2 justify-center text-slate-600 border border-primary-300 py-3 rounded-lg px-4 my-2">
                <Text className="text-center text-primary-500 font-bold">
                  Edit profile
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="w-full">
            <View className="relative py-1 w-1/5">
              <Text className="text-slate-700">My Asks</Text>
              <View className="absolute top-0 right-1 h-4 aspect-square justify-center items-center bg-secondary-500 rounded-full">
                <Text className="text-[10px] text-white">{numOfAsks}</Text>
              </View>
            </View>
            <View className="w-full gap-y-2 divide-y divide-slate-200">
              {userAsks && userAsks.length !== 0 ? (
                userAsks.map((ask, key) => (
                  <View key={key}>
                    <UserAsk ask={ask} navigation={navigation} />
                  </View>
                ))
              ) : (
                <View>
                  <Text>Your recent asks show here</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  );
};

const UserAsk = (props: { ask: any; navigation: any }) => {
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate('AskDetails', { askId: props.ask.id });
      }}
      android_ripple={{ color: 'lightgray' }}
      className="flex-row items-center gap-x-2 justify-between py-2">
      <View className="flex-1 flex-row items-center">
        <View className="h-12 mr-2 aspect-square bg-slate-300 rounded-full">
          <Text> </Text>
        </View>
        <View className="flex-1">
          <Text className="text-slate-600">
            {textEllipsis(props.ask.message, 10)}
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-slate-400 text-sm">
          {new Date(props.ask.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
};

export default Profile;
