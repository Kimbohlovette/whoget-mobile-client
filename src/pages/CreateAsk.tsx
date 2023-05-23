import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Styles from '../SharedStyles';
import FoIcon from 'react-native-vector-icons/Fontisto';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import PageHeader from '../components/PageHeader';
import {
  createAsk,
  getCategoriesFromAsyncStorage,
  getLocationsFromAsyncStorage,
} from '../apiService/fetchingFunctions';
import { useAppSelector } from '../store/hooks';
import { toastAndroid } from '../shared/toastAndroid';
import { HomeStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'CreateAsk'>;
const CreateAsk = ({ navigation }: Props) => {
  const [selectedExpires, setSelectedExpires] = useState<string>('');
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>('Buea');
  const [selectedCategory, setSelectedCateory] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  /** Get data from redux store */
  const { user, isAuthenticated } = useAppSelector(state => state.user);
  const places = useAppSelector(state => state.location.locations);
  const categories = useAppSelector(state => state.category.categories);

  const handleImagePicker = (mode: 'camera' | 'gallery') => {
    if (mode === 'camera') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      }).then(image => {
        pushImageToList((state: any) => [
          {
            fileName: image.filename,
            path: image.path,
            height: image.height,
            width: image.width,
            size: image.size,
            id: Date.now().toString(),
          },
          ...state,
        ]);
      });
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      }).then(image => {
        pushImageToList((state: any) => [
          {
            fileName: image.filename,
            path: image.path,
            height: image.height,
            width: image.width,
            size: image.size,
            id: Date.now().toString(),
          },
          ...state,
        ]);
      });
    }
  };

  const AddImageBtn = () => {
    return (
      <Pressable
        onPress={() => {
          setShowImagePickerModal(true);
        }}
        android_ripple={{ color: 'lightgray' }}
        className="flex-1 border h-24 max-w-[96px] justify-center items-center gap-y-2 rounded-lg border-slate-300 aspect-square my-1 p-2">
        <Text className="text-center text-xs text-slate-600">Add image</Text>
        <MdIcon name="add-photo-alternate" size={30} />
      </Pressable>
    );
  };

  const [selectedImageList, pushImageToList] = useState<any[]>([
    <AddImageBtn />,
  ]);

  return (
    <ScrollView
      className="bg-white pb-16"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Styles.pageContainer}>
      <PageHeader
        navigation={navigation}
        component={
          <View className="flex-row items-center gap-x-2">
            <Text className="text-lg font-bold text-slate-600 my-5">
              Place ask
            </Text>
          </View>
        }
      />
      <View className="gap-y-4">
        <View>
          <TextInput
            className="border border-slate-300 py-2 px-4 rounded-lg"
            placeholder="Type description here"
            placeholderTextColor={'#475569'}
            multiline={true}
            numberOfLines={3}
            onChangeText={text => {
              setMessage(text);
            }}
          />
        </View>
        <View>
          <TextInput
            defaultValue="+237 "
            className="border border-slate-300 py-2 px-4 rounded-lg"
            placeholder="Enter Whatsapp number"
            placeholderTextColor={'#475569'}
            onChangeText={number => {
              setPhoneNumber(number);
            }}
          />
        </View>
        <View className="flex-row gap-x-1">
          <View className="flex-1">
            <AutocompleteDropdown
              inputContainerStyle={Styles.InputContainer}
              textInputProps={{
                placeholder: 'Location',
                placeholderTextColor: '#475569',
              }}
              onSelectItem={item => {
                item && setSelectedLocation(item);
              }}
              dataSet={places}
            />
          </View>
          <View className="flex-1">
            <AutocompleteDropdown
              clearOnFocus
              inputContainerStyle={Styles.InputContainer}
              dataSet={[
                { id: '1', title: 'Today' },
                { id: '2', title: 'Tomorrow' },
                { id: '3', title: '3 Days' },
                { id: '4', title: '4 Days' },
                { id: '5', title: '5 Days' },
                { id: '6', title: '6 Days' },
                { id: '7', title: '7 Days' },
              ]}
              textInputProps={{
                placeholder: 'Expiration date',
                placeholderTextColor: 'gray',
              }}
              onSelectItem={item => {
                item && setSelectedExpires(item.id as string);
              }}
            />
          </View>
        </View>
        <View>
          <AutocompleteDropdown
            inputContainerStyle={Styles.InputContainer}
            textInputProps={{
              placeholder: 'Select Category',
              placeholderTextColor: '#475569',
            }}
            showClear={false}
            clearOnFocus={false}
            closeOnBlur
            closeOnSubmit={false}
            initialValue={{ id: '2' }} // or just '2'
            onSelectItem={item => {
              item && setSelectedCateory(item);
            }}
            dataSet={categories}
          />
        </View>
        <View>
          <FlatList
            data={selectedImageList}
            ItemSeparatorComponent={() => {
              return <View className="m-2" />;
            }}
            renderItem={({ item }) => {
              return item.path ? (
                <View className="relative flex-1 h-24 aspect-square border m-1 max-w-[96px] rounded-lg border-slate-300">
                  <View className="absolute z-50 top-1 left-1 rounded-lg overflow-hidden">
                    <Pressable
                      onPress={() => {
                        pushImageToList(images => {
                          return images.filter(image => image.id !== item.id);
                        });
                      }}
                      android_ripple={{
                        color: Styles.bgSecondaryLight.backgroundColor,
                      }}>
                      <Text className="text-secondary-500 p-1">
                        <Ionicon name="ios-close-outline" size={14} />
                      </Text>
                    </Pressable>
                  </View>

                  <Image
                    source={{ uri: item.path }}
                    className="rounded-lg w-fit h-full"
                  />
                </View>
              ) : (
                item
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View className="flex-row justify-between mt-8">
        <Pressable
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          android_ripple={{ color: 'lightgray' }}
          className="w-1/3 py-2 px-5 rounded-lg border border-primary-500">
          <Text className="text-center text-slate-600">Cancel</Text>
        </Pressable>
        <Pressable
          disabled={isCreating}
          onPress={async () => {
            if (!isAuthenticated) {
              navigation.navigate('Authentication');
            }
            const newAsk = {
              location: selectedLocation.title,
              message,
              contactNumber: phoneNumber || user.contactNumber,
              categoryId: selectedCategory.id,
              categoryName: selectedCategory.title,
              userId: user.id,
              userName: user.name,
              status: 'visible',
              expirationDate: selectedExpires,
            };
            const imageUrl = selectedImageList.filter(
              item => item.id !== undefined,
            )[0];
            if (!imageUrl) {
              setIsCreating(true);
              createAsk({ ...newAsk })
                .then(() => {
                  toastAndroid('Ask successfully created.');
                })
                .catch(error => {
                  console.log('Eror occured while creating ask: ', error);
                })
                .finally(() => {
                  setIsCreating(false);
                });
            } else {
              setIsCreating(true);
              try {
                const { metadata } = await storage()
                  .ref(`images/whoget_${Date.now().toString()}.png`)
                  .putFile(imageUrl.path);
                const url = await storage()
                  .ref(metadata.fullPath)
                  .getDownloadURL();
                console.log('');
                console.log({ ...newAsk, imageUrl: url });
                createAsk({ ...newAsk, imageUrl: url })
                  .then(() => {
                    toastAndroid('Ask successfully created.');
                  })
                  .catch(error => {
                    console.log('Eror occured while creating ask: ', error);
                  })
                  .finally(() => {
                    setIsCreating(false);
                    navigation.goBack();
                  });
              } catch (error) {
                console.log(error);
              }
            }
          }}
          android_ripple={{ color: 'lightgray' }}
          className="w-1/3 py-2 px-5 rounded-lg border border-primary-500 bg-primary-500">
          <View className="flex-row gap-x-1">
            <Text className="text-white text-center">Place Ask</Text>
            {isCreating && <ActivityIndicator color={'white'} />}
          </View>
        </Pressable>
      </View>

      {/* Image selection mode modal */}

      <Modal visible={showImagePickerModal} transparent>
        <Pressable
          onPress={() => {
            setShowImagePickerModal(false);
          }}
          className="h-full flex-1 justify-end bg-primary-800/60">
          <View className="rounded-t-3xl overflow-hidden bg-primary-50 divide-y divide-slate-300">
            <Pressable
              onPress={() => {
                handleImagePicker('camera');
                setShowImagePickerModal(false);
              }}
              android_ripple={{
                color: Styles.bgPrimaryLight.backgroundColor,
              }}
              className="px-8 pb-4 pt-12 flex-row justify-between">
              <Text className="text-lg text-primary-500 font-medium">
                Camera
              </Text>
              <Text className="text-primary-500">
                <Ionicon name="camera-outline" size={25} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleImagePicker('gallery');
                setShowImagePickerModal(false);
              }}
              android_ripple={{
                color: Styles.bgPrimaryLight.backgroundColor,
              }}
              className="px-8 pt-4 pb-12 flex-row justify-between">
              <Text className="text-lg text-primary-500 font-medium">
                Gallery
              </Text>
              <Text className="text-primary-500">
                <Ionicon name="images-outline" size={25} />
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default CreateAsk;
