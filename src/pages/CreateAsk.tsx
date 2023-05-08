import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Styles from '../SharedStyles';
import FoIcon from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-picker';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../components/PageHeader';
import { toastAndroid } from '../shared/toastAndroid';

const CreateAsk = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const handleImagePicker = (mode: 'camera' | 'gallery') => {
    if (mode === 'camera') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      }).then(image => {
        console.log(image);
        pushImageToList((state: any) => [
          {
            fileName: image.filename,
            path: image.path,
            height: image.height,
            width: image.width,
            size: image.size,
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
        console.log(image);
        pushImageToList((state: any) => [
          {
            fileName: image.filename,
            path: image.path,
            height: image.height,
            width: image.width,
            size: image.size,
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
  const navigation = useNavigation();
  return (
    <ScrollView
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
          />
        </View>
        <View>
          <TextInput
            defaultValue="+237 "
            className="border border-slate-300 py-2 px-4 rounded-lg"
            placeholder="Enter contact phone number"
            placeholderTextColor={'#475569'}
          />
        </View>
        <View>
          <AutocompleteDropdown
            inputContainerStyle={Styles.InputContainer}
            textInputProps={{
              placeholder: 'Location',
              placeholderTextColor: '#475569',
            }}
          />
        </View>
        <View>
          <Pressable
            onPress={() => {
              setOpen(true);
            }}
            android_ripple={{ color: 'lightgray' }}
            className="flex-row justify-between py-3 px-4 border border-slate-300 rounded-lg">
            <Text>{date.toLocaleDateString()}</Text>
            <View>
              <FoIcon name="date" size={16} />
            </View>
          </Pressable>
        </View>
        <View>
          <FlatList
            data={selectedImageList}
            ItemSeparatorComponent={() => {
              return <View className="m-2" />;
            }}
            renderItem={({ item }) => {
              return item.path ? (
                <View className="flex-1 h-24 aspect-square border m-1 max-w-[96px] rounded-lg border-slate-300">
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
          onPress={() => {
            toastAndroid(
              'Ask successfully created. It will now show on the asks list',
              'short',
              'center',
            );
            setTimeout(() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }, 1000);
          }}
          android_ripple={{ color: 'lightgray' }}
          className="w-1/3 py-2 px-5 rounded-lg border border-primary-500 bg-primary-500">
          <Text className="text-white text-center">Place Ask</Text>
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

      {/* Date picker component triggering code */}

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={dte => {
          setOpen(false);
          setDate(dte);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateAsk;
