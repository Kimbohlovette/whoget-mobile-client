import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { textEllipsis } from '../shared/ellipseText';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Styles from '../SharedStyles';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';

const Asks = () => {
  const [showFilter, setShowFilter] = useState(false);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const navigation = useNavigation();
  const handleShowFilter = () => {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  return (
    <>
      <View style={Styles.pageContainer} className="min-h-screen w-full">
        <StatusBar />
        <View className="relative header flex-row items-center gap-2 border-b border-slate-200 py-4">
          <View className="flex-1 flex-row items-center border border-slate-300 rounded-md px-2">
            <Icon name="search" size={20} />
            <TextInput className="py-1 px-2 flex-1" placeholder="Search" />
          </View>
          <Pressable onPress={handleShowFilter}>
            <Icon name="md-funnel-outline" size={18} />
          </Pressable>
          {showFilter && (
            <View
              style={Styles.btnShadow}
              className="absolute z-50 left-0 top-0 right-0 shadow-lg flex-1 justify-center">
              <View className="w-full px-4 py-8 rounded-md bg-white">
                <View className="gap-y-4">
                  <View>
                    <AutocompleteDropdown
                      clearOnFocus
                      inputContainerStyle={Styles.InputContainer}
                      showClear={false}
                      initialValue={{ id: '0', title: 'Category' }}
                      dataSet={[
                        { id: '0', title: 'Category' },
                        { id: '1', title: 'Mobile Phone' },
                        { id: '2', title: 'Electronics' },
                        { id: '3', title: 'Health Care' },
                        { id: '4', title: 'Agriculture' },
                      ]}
                      textInputProps={{ placeholder: 'search categories' }}
                    />
                  </View>
                  <View>
                    <AutocompleteDropdown
                      clearOnFocus
                      inputContainerStyle={Styles.InputContainer}
                      showClear={false}
                      initialValue={{ id: '0', title: 'Location' }}
                      dataSet={[
                        { id: '0', title: 'Location' },
                        { id: '1', title: 'Buea' },
                        { id: '2', title: 'Limbe' },
                        { id: '3', title: 'Yaounde' },
                        { id: '4', title: 'Douala' },
                      ]}
                    />
                  </View>
                  <View>
                    <AutocompleteDropdown
                      clearOnFocus
                      inputContainerStyle={Styles.InputContainer}
                      showClear={false}
                      initialValue={{ id: '0', title: 'Expiration date' }}
                      dataSet={[
                        { id: '0', title: 'Expiration date' },
                        { id: '1', title: 'Mobile Phone' },
                        { id: '2', title: 'Electronics' },
                        { id: '3', title: 'Health Care' },
                        { id: '4', title: 'Agriculture' },
                      ]}
                      textInputProps={{ placeholder: 'search categories' }}
                    />
                  </View>
                </View>
                <View className="shrink flex-row justify-between mt-8">
                  <Pressable
                    onPress={() => {
                      setShowFilter(false);
                    }}
                    className="rounded-md border border-primary-500 focus:shadow-sm"
                    android_ripple={{ color: 'lightgray' }}>
                    <Text className="text-center text-primary-600 font-medium py-2 px-5">
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setShowFilter(false);
                    }}
                    className="rounded-md border bg-primary-600 border-primary-500 focus:shadow-sm"
                    android_ripple={{ color: 'lightgray' }}>
                    <Text className="text-center text-white font-medium py-2 px-5">
                      Apply filter
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Asks list section */}

        <View className="w-full">
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
            data={[1, 2, 3, 5, 5, 5, 5, 1, 2, 3, 5, 5, 5, 5]}
            renderItem={() => {
              return (
                <View className="overflow-hidden rounded-sm">
                  <Ask />
                </View>
              );
            }}
            ItemSeparatorComponent={ListSeparator}
            onEndReached={() => {
              // Implement the pagination fetching here
            }}
          />
        </View>
      </View>
      <View className="absolute bottom-8 right-5 rounded-full overflow-hidden">
        <Pressable
          onPress={() => {
            if (isAuthenticated) {
              navigation.navigate('CreateAsk');
            } else {
              navigation.navigate('Authentication');
            }
          }}
          style={Styles.btnShadow}
          className="py-4 px-5 rounded-full flex-row justify-center items-center gap-x-2 bg-primary-500 shadow-md"
          android_ripple={{ color: '#070716' }}>
          <Icon name="md-add" size={20} color={'white'} />
          <Text className="text-center text-primary-50">New ask</Text>
        </Pressable>
      </View>
    </>
  );
};

const ListSeparator = () => {
  return <View className="border-t mx-1 border-slate-200" />;
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
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Ask detail');
      }}
      android_ripple={{ color: 'slate' }}
      className="py-4 px-2 flex-row gap-4">
      <View className="shrink">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Text className="text-slate-500 font-extralight">
              Kimboh Lovette
            </Text>
          </Pressable>
          <Text className="text-slate-400 font-extralight py-1">, Today</Text>
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
    </Pressable>
  );
};

export default Asks;
