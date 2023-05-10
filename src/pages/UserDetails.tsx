import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { textEllipsis } from '../shared/ellipseText';
import { ScrollView } from 'react-native';
import Styles from '../SharedStyles';
import { Props } from '../../types';
import {
  fetchAsksByUserId,
  fetchOneUserById,
} from '../apiService/fetchingFunctions';

const UserDetails = ({ navigation, route }: Props) => {
  const userId = route.params ? route.params.userId : '';
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userAsks, setUserAsks] = useState<any>([]);
  const [numOfAsks, setnumOfAsks] = useState<number>(0);
  const [loadingDataStatus, setLoadingDataStatus] = useState<
    'idle' | 'loading' | 'failed' | 'successful'
  >('idle');
  const [loadingUserAsksStatus, setLoadingUserAsksStatus] = useState<
    'idle' | 'loading' | 'failed' | 'successful'
  >('idle');
  useEffect(() => {
    setLoadingDataStatus('loading');
    fetchOneUserById(userId)
      .then(data => {
        setUserInfo(data);
        setLoadingDataStatus('successful');
      })
      .catch(() => {
        console.log('Error fetching user details.');
        setLoadingDataStatus('failed');
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingDataStatus('idle');
        }, 3000);
      });

    setLoadingUserAsksStatus('loading');
    fetchAsksByUserId(userId)
      .then(data => {
        setUserAsks(data?.asks);
        setnumOfAsks(data?.numOfAsks);
        setLoadingUserAsksStatus('successful');
      })
      .catch(() => {
        setTimeout(() => {
          setLoadingUserAsksStatus('failed');
        }, 3000);
      })
      .finally(() => {
        setLoadingUserAsksStatus('idle');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !userInfo ? (
    <View className="justify-center items-center h-full">
      {loadingDataStatus === 'loading' && (
        <ActivityIndicator
          size={'large'}
          color={Styles.bgSecondary.backgroundColor}
        />
      )}
    </View>
  ) : (
    <ScrollView contentContainerStyle={Styles.pageContainer}>
      <View className="items-center">
        <View className="relative justify-center items-center">
          <Pressable className="flex-row gap-1 my-4">
            <Text className="font-semibold text-slate-800">
              {userInfo.name}
            </Text>

            <Icon name="md-chevron-up-sharp" color={'slate'} size={18} />

            {/* <Icon name="md-chevron-down-sharp" color={'slate'} size={18} /> */}
          </Pressable>
          {/* <View
            style={Styles.btnShadow}
            className="absolute top-12 z-50 w-4/5 items-start justify-center py-4 px-8 bg-white rounded-sm">
            <Text className="text-slate-600 font-semibold mb-4">
              My account
            </Text>
            <View className="divide-y divide-slate-200 w-full">
              <View className="flex-row items-center justify-start gap-x-4">
                <View className="justify-center items-center h-7 aspect-square bg-primary-400 rounded-full">
                  <Image
                    source={require('../assets/eypic.png')}
                    className="w-full h-full rounded-full"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-500">myemail.com</Text>
                </View>
              </View>
              <View className="flex-row  gap-x-4 py-4 mt-5">
                <Text>
                  <AntDesign name="logout" size={25} />
                </Text>
                <Text className="">Logout</Text>
              </View>
            </View>
          </View> */}
        </View>

        <View className="relative bg-primary-600 h-20 aspect-square rounded-full justify-center items-center">
          <Image
            source={{ uri: userInfo.profileImage }}
            className="w-full h-full rounded-full"
          />
          <Pressable className="absolute bottom-0 left-2/3 bg-secondary-500 rounded-full border-2 border-secondary-500 shadow">
            <Icon name="md-add" size={16} color="white" />
          </Pressable>
        </View>

        <View className="my-4 w-3/4">
          <View>
            <Text className="text-center text-slate-400 py-2">
              Phone number
            </Text>
            <Text className="text-center text-slate-600 py-3 border border-slate-300 rounded-lg">
              {`+237 ${userInfo.phoneNumber}`}
            </Text>
          </View>

          <View>
            <Text className="text-center text-slate-400 py-2">Location</Text>
            <Text className="text-slate-600 text-center font-medium border border-slate-300 rounded-lg w-full py-3">
              Douala, Cameroon
            </Text>
          </View>

          <View className="flex-row justify-center items-center gap-2 my-2">
            <Pressable
              android_ripple={{ color: 'lightgray' }}
              className="flex-1 flex-row items-center gap-x-2 justify-center text-slate-600 border border-slate-300 py-3 rounded-lg px-4 my-2">
              <Text className="text-center text-slate-600 font-semibold">
                Report
              </Text>
            </Pressable>
            <Pressable
              android_ripple={{ color: 'lightgray' }}
              className="flex-1 flex-row items-center gap-x-2 justify-center text-slate-600 border border-slate-300 py-3 rounded-lg px-4 my-2">
              <Text className="text-center text-slate-600 font-semibold">
                Mute
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
            <View>
              {userAsks.length === 0 ? (
                <View className="justify-center items-center my-5">
                  {loadingUserAsksStatus === 'loading' && (
                    <ActivityIndicator
                      size={'large'}
                      color={Styles.bgSecondary.backgroundColor}
                    />
                  )}
                </View>
              ) : (
                userAsks.map((ask: any, key: any) => (
                  <UserAsk key={key} ask={ask} />
                ))
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const UserAsk = (props: { ask: any }) => {
  return (
    <View className="flex-row items-center gap-x-2 justify-between py-2">
      <View className="flex-1 flex-row items-center">
        <View className="h-12 mr-2 aspect-square bg-slate-300 rounded-full overflow-hidden">
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
    </View>
  );
};

export default UserDetails;
