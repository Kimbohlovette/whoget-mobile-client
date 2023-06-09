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
import Styles from '../SharedStyles';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import PageHeader from '../components/PageHeader';
import {
  createAsk,
  fetchOneAskById,
  updateAsk,
} from '../apiService/fetchingFunctions';
import { useAppSelector } from '../store/hooks';
import { toastAndroid } from '../shared/toastAndroid';
import { HomeStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';

type Props = NativeStackScreenProps<HomeStackParamList, 'CreateAsk'>;
const CreateAsk = ({ navigation, route }: Props) => {
  // Get route params
  const [editAskId, setEditAskId] = useState<string>('');
  useEffect(() => {
    fetchOneAskById(route.params.askId as string)
      .then(ask => {
        console.log(ask);
        setEditAskId(ask.id);
        //console.log(ask);
        setSelectedCateory(
          categories.filter(
            (cat: { id: string; title: string }) => cat.id === ask.categoryId,
          )[0],
        );

        setSelectedLocation(
          places.filter(
            (place: { id: string; title: string }) =>
              place.title === ask.location,
          )[0],
        );

        setPhoneNumber(ask.contactNumber || ask.owner.phoneNumber);
        setMessage(ask.message);
        setSelectedExpires(state => {
          const days =
            new Date(ask.expirationDate).getDate() - new Date().getDate();
          switch (days) {
            case 1:
              return { id: '1', title: 'Today' };
            case 2:
              return { id: '2', title: 'Tomorrow' };
            case 3:
              return { id: '3', title: '3 days' };
            case 4:
              return { id: '4', title: '4 days' };
            case 5:
              return { id: '5', title: '5 days' };
            case 6:
              return { id: '6', title: '6 days' };
            case 7:
              return { id: '7', title: '7 days' };
            default:
              return { id: '1', title: 'Today' };
          }
        });
        if (ask.imageUrl) {
          pushImageToList([{ path: ask.imageUrl }, ...selectedImageList]);
        }
      })
      .catch(error => {
        console.log('Error occured while fetch ask for editting: \n', error);
      });
  }, []);

  /** Get data from redux store */
  const { user, isAuthenticated } = useAppSelector(state => state.user);
  const places = useAppSelector(state => state.location.locations);
  const categories = useAppSelector(state => state.category.categories);
  // end

  const [selectedExpires, setSelectedExpires] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [selectedCategory, setSelectedCateory] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(
    user.phoneNumber,
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Input validation states
  const [invalidInputs, setInvalidInputs] = useState<boolean>(false);
  // end

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
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-primary-500 text-base py-2">
              Description*
            </Text>
            {message === '' && invalidInputs && (
              <Text className="text-red-500">This field is equired</Text>
            )}
          </View>
          <TextInput
            className="border border-slate-300 py-2 px-4 rounded-lg text-slate-600 text-base leading-loose"
            value={message || ''}
            placeholder="Describe your need here"
            placeholderTextColor={'#475569'}
            multiline={true}
            onChangeText={text => {
              setMessage(text);
            }}
          />
        </View>
        <View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-primary-500 text-base py-2">
              Preferred contact number*
            </Text>
            {(phoneNumber === undefined ||
              !phoneNumber ||
              phoneNumber === '') &&
              invalidInputs && (
                <Text className="text-red-500">This field is equired</Text>
              )}
          </View>
          <TextInput
            value={phoneNumber || ''}
            className="border border-slate-300 py-2 px-4 rounded-lg text-primary-600 text-base"
            placeholder="+237"
            placeholderTextColor={'#475569'}
            onChangeText={number => {
              setPhoneNumber(number);
            }}
          />
        </View>
        <View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-primary-500 text-base py-2">Location*</Text>
            {!selectedLocation && invalidInputs && (
              <Text className="text-red-500">This field is equired</Text>
            )}
          </View>
          <Dropdown
            style={Styles.InputContainer}
            itemTextStyle={Styles.inputText}
            selectedTextStyle={Styles.inputText}
            value={selectedLocation}
            placeholder="Select location"
            containerStyle={{
              width: '100%',
              borderRadius: 5,
            }}
            labelField="title"
            valueField="id"
            onChange={val => {
              setSelectedLocation(val);
            }}
            mode="modal"
            data={places}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-primary-500 text-base py-2">
              Expiration date*
            </Text>
            {!selectedExpires && invalidInputs && (
              <Text className="text-red-500">This field is equired</Text>
            )}
          </View>
          <Dropdown
            style={Styles.InputContainer}
            itemTextStyle={Styles.inputText}
            selectedTextStyle={Styles.inputText}
            value={selectedExpires}
            placeholder="Select expiration date"
            containerStyle={{
              width: '100%',
              borderRadius: 5,
            }}
            labelField="title"
            valueField="id"
            onChange={value => {
              setSelectedExpires(value);
            }}
            mode="modal"
            data={[
              { id: '1', title: 'Today' },
              { id: '2', title: 'Tomorrow' },
              { id: '3', title: '3 Days' },
              { id: '4', title: '4 Days' },
              { id: '5', title: '5 Days' },
              { id: '6', title: '6 Days' },
              { id: '7', title: '7 Days' },
            ]}
          />
        </View>
        <View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-primary-500 text-base py-2">
              Ask category*
            </Text>
            {!selectedCategory && invalidInputs && (
              <Text className="text-red-500">This field is equired</Text>
            )}
          </View>
          <Dropdown
            style={Styles.InputContainer}
            itemTextStyle={Styles.inputText}
            selectedTextStyle={Styles.inputText}
            value={selectedCategory}
            placeholder="Select category"
            containerStyle={{
              width: '100%',
              borderRadius: 5,
            }}
            labelField="title"
            valueField="id"
            onChange={value => {
              value && setSelectedCateory(value);
            }}
            mode="modal"
            data={categories}
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
                          return images.filter(
                            image => image.path && image.id !== item.id,
                          );
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
            const isInvalid =
              !message ||
              message === '' ||
              !phoneNumber ||
              phoneNumber === '' ||
              phoneNumber == undefined ||
              !selectedCategory ||
              !selectedLocation ||
              !selectedExpires;
            setInvalidInputs(isInvalid);
            if (!isInvalid) {
              const newAsk = {
                location: selectedLocation?.title,
                message,
                contactNumber: phoneNumber,
                categoryId: selectedCategory?.id,
                categoryName: selectedCategory?.title,
                userId: user.id,
                userName: user.name,
                status: 'visible',
                expirationDate: Number(selectedExpires?.id),
              };

              const imageUrl = selectedImageList.filter(
                item => item.id !== undefined,
              )[0];
              if (!imageUrl) {
                setIsCreating(true);
                // Create ask without image
                if (route.params.mode === 'create') {
                  createAsk({ ...newAsk })
                    .then(() => {
                      toastAndroid('Ask successfully created.');
                    })
                    .catch(error => {
                      console.log('Eror occured while creating ask: ');
                    })
                    .finally(() => {
                      setIsCreating(false);
                    });
                } else {
                  updateAsk(editAskId, newAsk)
                    .then(() => {
                      toastAndroid('Ask successfully created.');
                    })
                    .catch(error => {
                      console.log('Eror occured while creating ask: ');
                    })
                    .finally(() => {
                      setIsCreating(false);
                    });
                }
              } else {
                setIsCreating(true);
                if (route.params.mode === 'create') {
                  try {
                    const { metadata } = await storage()
                      .ref(`images/whoget_${Date.now().toString()}.png`)
                      .putFile(imageUrl.path);
                    const url = await storage()
                      .ref(metadata.fullPath)
                      .getDownloadURL();
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
                    setIsCreating(false);
                  }
                } else {
                  try {
                    const { metadata } = await storage()
                      .ref(`images/whoget_${Date.now().toString()}.png`)
                      .putFile(imageUrl.path);
                    const url = await storage()
                      .ref(metadata.fullPath)
                      .getDownloadURL();
                    updateAsk(editAskId, { ...newAsk, imageUrl: url })
                      .then(() => {
                        toastAndroid('Ask successfully updated.');
                      })
                      .catch(error => {
                        console.log('Eror occured while updating ask: ', error);
                      })
                      .finally(() => {
                        setIsCreating(false);
                        navigation.goBack();
                      });
                  } catch (error) {
                    console.log(error);
                    setIsCreating(false);
                  }
                }
              }
            }
          }}
          android_ripple={{ color: 'lightgray' }}
          className="w-1/3 py-2 px-5 rounded-lg border border-primary-500 bg-primary-500">
          <View className="flex-row gap-x-1 justify-center">
            {route.params.mode === 'create' ? (
              <Text className="text-white text-center">Place ask</Text>
            ) : (
              <Text className="text-white text-center">Update</Text>
            )}
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
