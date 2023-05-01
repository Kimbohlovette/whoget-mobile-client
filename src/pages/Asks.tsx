import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { textEllipsis } from '../shared/ellipseText';

const Asks = () => {
  return (
    <SafeAreaView className="w-full px-4">
      <StatusBar />
      <View className="header flex-row items-center gap-3">
        <View className="flex-1 flex-row items-center border border-slate-300 rounded-md px-2">
          <Icon name="search" size={20} />
          <TextInput className="py-1 px-2" placeholder="Search" />
        </View>
        <View className="border border-slate-300 p-2 rounded-md">
          <Icon name="md-funnel-outline" size={18} />
        </View>
      </View>

      {/* Asks list section */}

      <View className="w-full pt-10">
        <FlatList
          ListEmptyComponent={ListEmptyComponent}
          data={[1, 2, 3, 5]}
          renderItem={() => {
            return (
              <View>
                <Ask />
              </View>
            );
          }}
          ItemSeparatorComponent={ListSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

const ListSeparator = () => {
  return <View className="border-b border-slate-200 py-2" />;
};
const ListEmptyComponent = () => {
  return (
    <View>
      <Text className="text-center text-slate-600 text-lg font-medium">
        No asks to show.
      </Text>
    </View>
  );
};
const Ask = () => {
  return (
    <TouchableOpacity className="py-2 px-2 flex-row gap-4">
      <View className="shrink">
        <View>
          <Text className="text-slate-400 font-extralight py-1">
            Kimboh Lovette, Today
          </Text>
        </View>
        <View>
          <Text className="text-slate-600 text-sm">
            {textEllipsis(
              ' I need a glass transparent flower vessel or a vessel with flower in it. my location is Bamenda',
              13,
            )}
          </Text>
        </View>
      </View>
      <Image
        source={require('../assets/istockphoto-157399336-1024x1024.jpg')}
        className="h-16 w-16 rounded-md"
      />
    </TouchableOpacity>
  );
};

export default Asks;
