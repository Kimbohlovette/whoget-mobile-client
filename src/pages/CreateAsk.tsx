import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Styles from '../SharedStyles';
import FoIcon from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-picker';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

const CreateAsk = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleImagePicker = () => {
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
  };

  const AddImageBtn = () => {
    return (
      <Pressable
        onPress={handleImagePicker}
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="text-lg font-bold text-slate-600 text-center my-5">
        Place Your Ask
      </Text>
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
                    className="rounded-lg w-fit aspect-square"
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
          android_ripple={{ color: 'lightgray' }}
          className="w-1/3 py-2 px-5 rounded-lg border border-primary-500">
          <Text className="text-center text-slate-600">Cancel</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: 'lightgray' }}
          className="w-1/3 py-2 px-5 rounded-lg border border-primary-500 bg-primary-500">
          <Text className="text-white text-center">Place Ask</Text>
        </Pressable>
      </View>
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
