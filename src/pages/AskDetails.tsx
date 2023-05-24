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
import { fetchUserById } from '../store/slices/userSlice';
import { createAsk } from '../apiService/fetchingFunctions';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

type Props = NativeStackScreenProps<HomeStackParamList, 'AskDetails'>;
const AskDetails = ({ navigation, route }: Props) => {
  const askId = route.params ? route.params.askId : '';
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [askDetails, setAskDetails] = useState<any>(null);
  const [loadingAskstatus, setLoadingAskStatus] = useState<
    'idle' | 'loading' | 'failed' | 'successful'
  >('loading');
  //const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    if (askId) {
      setLoadingAskStatus('loading');
      fetchOneAskById(askId)
        .then(ask => {
          setAskDetails(ask);
          console.log(ask);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoadingAskStatus('idle');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRespond = async () => {
    if (isAuthenticated) {
      setShowRespondModal(true);
    } else {
      navigation.navigate('Authentication');
    }
  };

  return loadingAskstatus === 'loading' ? (
    <View className="mt-8">
      <ActivityIndicator color={Styles.bgSecondary.backgroundColor} />
    </View>
  ) : (
    askDetails && (
      <ScrollView className="px-4 relative bg-white min-h-screen py-4">
        <PageHeader
          navigation={navigation}
          component={
            <View className="flex-1 flex-row justify-between items-center">
              <View className="flex-row gap-x-2 items-center">
                {askDetails.imageUrl !== undefined && (
                  <View className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      source={{ uri: askDetails.imageUrl }}
                      className="h-full w-full"
                    />
                  </View>
                )}
                <View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('UserDetails', {
                        userId: askDetails.userId,
                      });
                    }}
                    android_ripple={{ color: 'lightgray' }}>
                    <Text className="text-slate-600 text-sm">
                      {askDetails.owner.name === '' || !askDetails.owner.name
                        ? '~Unkown'
                        : askDetails.owner.name}
                    </Text>
                  </Pressable>
                  <Text className="text-xs text-slate-400">
                    {askDetails.createdAt}
                  </Text>
                </View>
              </View>

              <View>
                <Menu>
                  <MenuTrigger
                    children={<Icon name="dots-vertical" size={20} />}
                  />
                  <MenuOptions>
                    <MenuOption
                      children={
                        <View className="flex-row justify-between px-4 py-2">
                          <Text>Share</Text>
                          <Icon name="share" />
                        </View>
                      }
                    />
                    <MenuOption>
                      <View className="flex-row justify-between px-4 py-2">
                        <Text>Report</Text>
                        <Ionicon name="warning" />
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          }
        />
        <View className="mt-5">
          {askDetails.imageUrl !== undefined && (
            <View className="translate-y-2 h-fit flex-1 mx-1 rounded-t-lg overflow-hidden">
              <Image
                source={{ uri: askDetails.imageUrl }}
                className="h-48 w-full object-cover object-center"
              />
            </View>
          )}
        </View>
        <View className="mx-1 py-5 rounded-lg bg-slate-50 px-4">
          <Text className="text-slate-600 py-2 text-base">
            {askDetails.message}
          </Text>
        </View>
        <View>
          <View className="flex-row items-center gap-2 py-2">
            <Text className="text-slate-600 text-xl">
              <SIcon name="location-pin" size={15} />
            </Text>
            <Text className="text-base text-slate-400">
              {askDetails.location}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="text-slate-400">
              <Icon name="clock-time-eight-outline" size={17} />
            </Text>
            <Text className="text-slate-400">
              {new Date(askDetails.expirationDate).toLocaleDateString()}
            </Text>
          </View>
          <View className="my-5">
            <Pressable
              onPress={handleRespond}
              android_ripple={{ color: 'gray' }}
              className="w-full self-end py-2 px-4 rounded-lg bg-primary-500">
              <Text className="text-center text-white font-bold">RESPOND</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showRespondModal}
          onRequestClose={async () => {
            setShowRespondModal(!showRespondModal);
          }}>
          <Pressable
            onPress={() => {
              setShowRespondModal(false);
            }}
            className="bg-slate-600/60 backdrop-blur-lg  items-center justify-center h-full">
            <View
              style={Styles.btnShadow}
              className="relative bg-white w-4/5 rounded-lg rounde-lg overflow-hidden">
              {/* the close button */}
              <Pressable
                onPress={() => {
                  setShowRespondModal(false);
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
                {(askDetails.contactNumber || askDetails.owner.phoneNumber) && (
                  <Pressable
                    onPress={() => {
                      const phoneNumber: string = askDetails.contactNumber
                        ? askDetails.contactNumber
                        : askDetails.owner.phoneNumber;

                      Linking.openURL(
                        `https://wa.me/${
                          phoneNumber.startsWith('+237') ||
                          phoneNumber.startsWith('237')
                            ? phoneNumber
                            : '+237' + phoneNumber
                        }`,
                      );
                    }}
                    android_ripple={{ color: 'lightgray' }}
                    className="border-t border-slate-200 py-4 px-5 flex-row items-center justify-between">
                    <Text className="text-slate-600">Whatsapp</Text>
                    <Text className="text-slate-600">
                      <Icon name="whatsapp" size={24} />
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => {
                    Linking.openURL(`mailto:${askDetails.owner.email}`);
                  }}
                  android_ripple={{ color: 'lightgray' }}
                  className="py-4 px-5 flex-row items-center justify-between">
                  <Text className="text-slate-600">Email</Text>
                  <Text className="text-slate-600">
                    <SIcon name="envelope" size={18} />
                  </Text>
                </Pressable>
                {(askDetails.contactNumber || askDetails.owner.phoneNumber) && (
                  <Pressable
                    onPress={() => {
                      Linking.openURL(`tel:${askDetails.owner.phoneNumber}`);
                    }}
                    android_ripple={{ color: 'lightgray' }}
                    className="py-4 px-5 flex-row items-center justify-between">
                    <Text className="text-slate-600">Call</Text>
                    <Text className="text-slate-600">
                      <Ionicon name="call-outline" size={18} />
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    )
  );
};

export default AskDetails;
