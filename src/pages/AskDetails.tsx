import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Styles from '../SharedStyles';
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../components/PageHeader';
import { useAppSelector } from '../store/hooks';

const AskDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const handleRespond = () => {
    if (isAuthenticated) {
      setShowModal(true);
    } else {
      navigation.navigate('Authentication');
    }
  };

  return (
    <ScrollView className="px-4 relative bg-white min-h-screen py-4">
      <PageHeader
        navigation={navigation}
        component={
          <View className="flex-1 flex-row justify-between items-center">
            <View className="flex-row gap-x-2 items-center">
              <View className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <Image
                  source={require('../assets/eypic.png')}
                  className="h-full w-full"
                />
              </View>
              <View>
                <Pressable android_ripple={{ color: 'lightgray' }}>
                  <Text className="text-slate-600 text-sm">Eyong Ebai</Text>
                </Pressable>
                <Text className="text-xs text-slate-400">Today</Text>
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
                className="absolute right-2 top-8 z-50 w-3/4 bg-white rounded-lg divide-y divide-slate-200"
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
        <FlatList
          data={[1, 2, 4, 2]}
          renderItem={() => {
            return (
              <View className="border border-slate-100 h-fit flex-1 mx-1 rounded-md">
                <Image
                  source={require('../assets/istockphoto-157399336-1024x1024.jpg')}
                  className="h-24 w-full object-cover object-center"
                />
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View className="m-1" />}
          numColumns={2}
          contentContainerStyle={styles.listContainerStyles}
        />
      </View>
      <View className="mx-1">
        <Text className="my-2 text-slate-600 py-2 text-base">
          Where can I get a glass transparent vessels for flowers, or with
          flowers in it already?
        </Text>
      </View>
      <View>
        <View className="flex-row items-center gap-2 py-2">
          <Text className="text-slate-600 text-xl">
            <SIcon name="location-pin" size={15} />
          </Text>
          <Text className="text-base text-slate-600">Bamenda</Text>
        </View>
        <View className="flex-row gap-2">
          <Text className="text-slate-400">
            <Icon name="clock-time-eight-outline" size={17} />
          </Text>
          <Text className="text-slate-400">May 2, 2023</Text>
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
        onRequestClose={() => {
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
              <Text className="py-8 px-5 text-primary-400">Respond</Text>
            </View>
            <View className=" divide-y divide-slate-200">
              <Pressable
                android_ripple={{ color: 'lightgray' }}
                className="border-t border-slate-200 py-4 px-5 flex-row items-center justify-between">
                <Text className="text-slate-600">Whatsapp</Text>
                <Text className="text-slate-600">
                  <Icon name="whatsapp" size={18} />
                </Text>
              </Pressable>
              <Pressable
                android_ripple={{ color: 'lightgray' }}
                className="py-4 px-5 flex-row items-center justify-between">
                <Text className="text-slate-600">Email</Text>
                <Text className="text-slate-600">
                  <SIcon name="envelope" size={18} />
                </Text>
              </Pressable>
              <Pressable
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
  );
};

export default AskDetails;

const styles = StyleSheet.create({
  listContainerStyles: {
    gap: 4,
    padding: 4,
    width: '100%',
  },
});
