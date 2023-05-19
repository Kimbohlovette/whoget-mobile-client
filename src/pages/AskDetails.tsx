import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Styles from '../SharedStyles';
import PageHeader from '../components/PageHeader';
import { useAppSelector } from '../store/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types';
import {
  fetchOneAskById,
  fetchOneUserById,
} from '../apiService/fetchingFunctions';

type Props = NativeStackScreenProps<HomeStackParamList, 'AskDetails'>;
const AskDetails = ({ navigation, route }: Props) => {
  const askId = route.params ? route.params.askId : '';
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentAsk, setCurrentAsk] = useState<any>(null);
  const [askOwnerInfo, setAskOwnerInfo] = useState<any>(null);
  const [loadingAskstatus, setLoadingAskStatus] = useState<
    'idle' | 'loading' | 'failed' | 'successful'
  >('loading');
  //const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    setLoadingAskStatus('loading');
    fetchOneAskById(askId)
      .then(data => {
        setCurrentAsk(data);
        setLoadingAskStatus('successful');
      })
      .catch(() => {
        setLoadingAskStatus('failed');
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingAskStatus('idle');
        }, 3000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRespond = async () => {
    if (isAuthenticated) {
      fetchOneUserById(currentAsk.userId).then(user => {
        setAskOwnerInfo(user);
        console.log(user);
        setShowModal(true);
      });
    } else {
      navigation.navigate('Authentication');
    }
  };

  return loadingAskstatus === 'loading' ? (
    <View>
      <ActivityIndicator
        size={'large'}
        color={Styles.bgPrimaryDark.backgroundColor}
      />
    </View>
  ) : (
    currentAsk && (
      <ScrollView className="px-4 relative bg-white min-h-screen py-4">
        <PageHeader
          navigation={navigation}
          component={
            <View className="flex-1 flex-row justify-between items-center">
              <View className="flex-row gap-x-2 items-center">
                {currentAsk.image !== undefined && (
                  <View className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      source={{ uri: currentAsk.imageUrl }}
                      className="h-full w-full"
                    />
                  </View>
                )}
                <View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('UserDetails', {
                        userId: currentAsk.userId,
                      });
                    }}
                    android_ripple={{ color: 'lightgray' }}>
                    <Text className="text-slate-600 text-sm">
                      {currentAsk.userName === '' || !currentAsk.userName
                        ? '~Unkown'
                        : currentAsk.userName}
                    </Text>
                  </Pressable>
                  <Text className="text-xs text-slate-400">
                    {currentAsk.createdAt}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => {
                  setShowMenu(state => !state);
                }}
                android_ripple={{ color: 'lightgray', borderless: true }}
                className="px-1 py-2 rounded-full">
                <Icon name="dots-vertical" size={20} />
              </Pressable>
              {showMenu && (
                <View
                  className="absolute right-0 top-0 z-50 w-3/4 bg-white rounded-sm divide-y divide-slate-200 px-4"
                  style={Styles.btnShadow}>
                  <Pressable
                    android_ripple={{ color: 'lightgray' }}
                    className="flex-row items-center justify-between py-4 px-5">
                    <Text>Share</Text>
                    <Text>
                      <Icon name="share-outline" />
                    </Text>
                  </Pressable>
                  <Pressable
                    android_ripple={{ color: 'lightgray' }}
                    className="flex-row items-center justify-between py-4 px-5">
                    <Text>Report</Text>
                    <Text>
                      <Ionicon name="warning-outline" />
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          }
        />
        <View className="mt-5">
          {currentAsk.imageUrl !== undefined && (
            <View className="border border-slate-100 h-fit flex-1 mx-1 rounded-md">
              <Image
                source={{ uri: currentAsk.imageUrl }}
                className="h-48 w-full object-cover object-center"
              />
            </View>
          )}
        </View>
        <View className="mx-1">
          <Text className="text-slate-600 py-2 text-base">
            {currentAsk.message}
          </Text>
        </View>
        <View>
          <View className="flex-row items-center gap-2 py-2">
            <Text className="text-slate-600 text-xl">
              <SIcon name="location-pin" size={15} />
            </Text>
            <Text className="text-base text-slate-400">
              {currentAsk.location}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="text-slate-400">
              <Icon name="clock-time-eight-outline" size={17} />
            </Text>
            <Text className="text-slate-400">
              {new Date(currentAsk.expirationDate).toLocaleDateString()}
            </Text>
          </View>
          <View className="my-5">
            <Pressable
              onPress={handleRespond}
              android_ripple={{ color: 'gray' }}
              className="w-1/3 self-end py-2 px-4 rounded-lg bg-primary-500">
              <Text className="text-center text-white">Respond</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          onRequestClose={async () => {
            setShowModal(!showModal);
          }}>
          <View className="bg-slate-600/60 backdrop-blur-lg  items-center justify-center h-full">
            <View
              style={Styles.btnShadow}
              className="relative bg-white w-4/5 rounded-lg rounde-lg overflow-hidden">
              {/* the close button */}
              <Pressable
                onPress={() => {
                  setShowModal(false);
                }}
                android_ripple={{ color: 'gray' }}
                className="absolute right-5 top-2 z-50">
                <Text className="p-2">
                  <Ionicon name="close-outline" size={16} />
                </Text>
              </Pressable>
              <View>
                <Text className="py-8 px-5 text-primary-400 font-bold">
                  Respond
                </Text>
              </View>
              <View className=" divide-y divide-slate-200">
                <Pressable
                  onPress={() => {
                    console.log(askOwnerInfo.phoneNumber);
                    Linking.openURL(
                      `https://wa.me/${askOwnerInfo.phoneNumber}`,
                    );
                  }}
                  android_ripple={{ color: 'lightgray' }}
                  className="border-t border-slate-200 py-4 px-5 flex-row items-center justify-between">
                  <Text className="text-slate-600">Whatsapp</Text>
                  <Text className="text-slate-600">
                    <Icon name="whatsapp" size={24} />
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`mailto:${askOwnerInfo.email.trim()}`);
                  }}
                  android_ripple={{ color: 'lightgray' }}
                  className="py-4 px-5 flex-row items-center justify-between">
                  <Text className="text-slate-600">Email</Text>
                  <Text className="text-slate-600">
                    <SIcon name="envelope" size={18} />
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`tel:${currentAsk.contactNumber}`);
                  }}
                  android_ripple={{ color: 'lightgray' }}
                  className="py-4 px-5 flex-row items-center justify-between">
                  <Text className="text-slate-600">Calls</Text>
                  <Text className="text-slate-600">
                    <Ionicon name="call-outline" size={18} />
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  );
};

export default AskDetails;
