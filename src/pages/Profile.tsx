import { View, Text, Pressable, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { textEllipsis } from '../shared/ellipseText';
import { ScrollView } from 'react-native';
import Styles from '../SharedStyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAsksByUserId } from '../apiService/fetchingFunctions';
import { useNavigation } from '@react-navigation/native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

const Profile = () => {
  const [userAsks, setUserAsks] = useState([]);
  const [numOfAsks, setNumOfAsks] = useState(0);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
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
      <ScrollView className="py-5" contentContainerStyle={Styles.pageContainer}>
        <View className="relative items-center">
          <View className="w-full">
            <View className="items-end">
              <Menu>
                <MenuTrigger
                  children={<MdIcon name="dots-vertical" size={20} />}
                />
                <MenuOptions>
                  <MenuOption
                    children={
                      <View className="flex-row justify-between px-4 py-2">
                        <Text>Edit Profile</Text>
                      </View>
                    }
                  />
                  <MenuOption>
                    <View className="flex-row justify-between px-4 py-2">
                      <Text>Logout</Text>
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
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

          <View className="my-4 w-4/5">
            <View>
              <Text className="text-center text-slate-600 text-base">
                Phone number
              </Text>
              <Text className="text-slate-500 text-center border border-slate-300 py-3 rounded-lg w-full px-4 my-2">
                {user.phoneNumber}
              </Text>
            </View>

            <View>
              <Text className="text-center text-slate-600 text-base">
                Email
              </Text>
              <Text className="text-slate-500 text-center border border-slate-300 py-3 rounded-lg w-full px-4 my-2">
                {user.email}
              </Text>
            </View>
            <View>
              <Text className="text-center text-slate-600 text-base">
                Location
              </Text>
              <Text className="text-slate-500 text-center border border-slate-300 py-3 rounded-lg w-full px-4 my-2">
                {user.location}
              </Text>
            </View>
          </View>
          <View className="w-full">
            <View className="relative py-1 w-1/5">
              <Text className="text-slate-700">My Asks</Text>
              <View className="absolute top-0 right-1 h-4 aspect-square justify-center items-center bg-secondary-500 rounded-full">
                <Text className="text-[10px] text-white">{numOfAsks || 0}</Text>
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
        <View className="h-12 mr-2 aspect-square bg-slate-300 rounded-lg overflow-hidden">
          <Image
            source={{ uri: props.ask.imageUrl }}
            className="w-full h-full"
          />
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
