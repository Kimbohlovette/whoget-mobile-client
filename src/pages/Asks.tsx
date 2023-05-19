import {
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { textEllipsis } from '../shared/ellipseText';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Styles from '../SharedStyles';
import { useAppSelector } from '../store/hooks';
import { Props } from '../../types';
//import { useNavigation } from '@react-navigation/native';
import { fetchPaginatedAks } from '../apiService/fetchingFunctions';

const Asks = ({ navigation, route }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [asks, setAsks] = useState([]);
  const user = useAppSelector(state => state.user.user);
  const [showFilterBtn, setShowFilterBtn] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const getAsks = (page?: number, limit?: number) => {
    setRefreshing(true);
    fetchPaginatedAks(page, limit)
      .then(data => {
        setAsks(data);
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  };
  useEffect(() => {
    console.log('User selected in asks component', user);
    getAsks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  //const navigation = useNavigation();
  const handleShowFilter = () => {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  const onRefresh = React.useCallback(() => {
    getAsks(1, 15);
  }, []);
  return (
    <>
      <View style={Styles.pageContainer} className="min-h-screen w-full">
        <View className="relative header flex-row items-center gap-2 border-b border-slate-200 py-4">
          <View className="flex-1 flex-row items-center bg-slate-50 rounded-lg px-2">
            <TextInput
              onPressIn={() => {
                navigation.navigate('Search');
              }}
              className="py-1 px-2 flex-1"
              placeholder="Search asks, users, categories etc."
            />
            <View className="p-1">
              <Icon name="search" size={20} />
            </View>
          </View>

          <Pressable
            className="rounded-lg bg-slate-50 w-fit aspect-square p-2"
            onPress={handleShowFilter}>
            <Icon name="md-funnel-outline" size={18} />
          </Pressable>
        </View>

        {/* Filter modal */}
        <Modal visible={showFilter} transparent>
          <Pressable
            onPress={() => {
              setShowFilter(false);
            }}
            className="w-full h-full items-center bg-primary-800/60 relative z-20">
            <View className="w-full px-4 py-8 rounded-md bg-white relative z-50">
              <Text className="text-center py-2 text-lg text-slate-600">
                Filter Asks
              </Text>
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
          </Pressable>
        </Modal>

        {/* Asks list section */}

        <View className="w-full">
          <FlatList
            contentContainerStyle={{ paddingBottom: 300 }}
            bounces
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[
                  Styles.bgPrimary.backgroundColor,
                  Styles.bgSecondary.backgroundColor,
                ]}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
            data={asks}
            renderItem={({ item }) => {
              return (
                <View className="overflow-hidden rounded-sm">
                  <Ask ask={item} navigation={navigation} route={route} />
                </View>
              );
            }}
            ItemSeparatorComponent={ListSeparator}
            onEndReached={() => {
              // Implement the pagination fetching here
              setPage(state => state + 1);
              getAsks(page);
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
const Ask = (props: { ask: any; navigation: any; route: any }) => {
  //const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate('AskDetails', { askId: props.ask.id });
      }}
      android_ripple={{ color: 'slate' }}
      className="z-0 py-4 px-2 flex-row gap-4">
      <View className="flex-1">
        <View className="w-full flex-row flex-between items-center">
          <Pressable
            onPress={() => {
              props.navigation.navigate('Profile');
            }}>
            <Text className="text-slate-500 font-extralight">
              {!props.ask.userName || props.ask.userName === ''
                ? '~Unkown'
                : `~${props.ask.userName}`}
            </Text>
          </Pressable>
          <Text className="text-slate-400 font-extralight py-1">
            , {new Date(props.ask.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text className="text-slate-700 text-sm">
            {textEllipsis(props.ask.message, 13)}
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: props.ask.imageUrl }}
        className="h-16 w-16 rounded-md"
      />
    </Pressable>
  );
};

export default Asks;
