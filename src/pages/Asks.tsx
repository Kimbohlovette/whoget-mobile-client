import {
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { textEllipsis } from '../shared/ellipseText';
import Styles from '../SharedStyles';
import { useAppSelector } from '../store/hooks';
import { Props } from '../../types';
import {
  fetchFilteredAsks,
  fetchPaginatedAks,
} from '../apiService/fetchingFunctions';
import { Dropdown } from 'react-native-element-dropdown';

const Asks = ({ navigation, route }: Props) => {
  const [showFilter, setShowFilter] = useState(false); //state  to show/hide filter modal
  const [asks, setAsks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // state for handling refreshes
  const [nextPage, setNextPage] = useState(2);
  const [endOfListReached, setEndOfListReached] = useState<boolean>(false);

  /** ===== States for filtering asks =======*/
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [selectedExpires, setSelectedExpires] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [filtering, setFiltering] = useState<boolean>(false);
  /** ===================================== */
  const pageLimit = 15;
  useEffect(() => {
    fetchPaginatedAks(1, pageLimit)
      .then(data => {
        setAsks(data);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const categories = useAppSelector(state => state.category.categories);
  const locations = useAppSelector(state => state.location.locations);
  //const navigation = useNavigation();
  const handleShowFilter = () => {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  const onRefresh = () => {
    fetchPaginatedAks(1, pageLimit)
      .then(data => {
        setAsks(data);
        setNextPage(2);
      })
      .catch(error => {
        console.log(error);
        setRefreshing(false);
      });
  };
  return (
    <>
      <View style={Styles.pageContainer} className="min-h-screen w-full">
        <View className="relative header flex-row items-center gap-2 border-b border-slate-200 py-4">
          <View className="flex-1 flex-row items-center bg-slate-50 rounded-lg px-2">
            <View className="p-1">
              <Icon name="search" size={20} />
            </View>
            <TextInput
              onPressIn={() => {
                navigation.navigate('Search');
              }}
              className="py-1 px-2 flex-1"
              placeholder="Search asks, users, categories etc."
            />
          </View>

          <Pressable
            className="rounded-lg bg-slate-50 w-fit aspect-square p-2"
            onPress={handleShowFilter}>
            <Icon name="md-funnel-outline" size={18} />
          </Pressable>
        </View>

        {/* ========================Filter modal ==================== */}
        <Modal visible={showFilter} transparent>
          <Pressable
            onPress={() => {
              setShowFilter(false);
            }}
            className="w-full h-full items-center bg-primary-800/60 relative z-20 justify-center px-2">
            <View className="relative w-full px-4 py-8 rounded-lg bg-white z-50">
              <Text className="text-center py-2 text-lg text-slate-600">
                Filter Asks
              </Text>
              <View className="gap-y-4">
                <View>
                  <Text className="text-primary-500 py-2">Ask category</Text>
                  <Dropdown
                    style={Styles.InputContainer}
                    value={selectedCategory}
                    placeholder="Select category"
                    containerStyle={{
                      width: '100%',
                      borderRadius: 5,
                    }}
                    labelField="title"
                    valueField="id"
                    onChange={value => {
                      setSelectedCategory(value);
                    }}
                    data={categories}
                  />
                </View>
                <View>
                  <Text className="text-primary-500 py-2">Location</Text>
                  <Dropdown
                    style={Styles.InputContainer}
                    value={selectedLocation}
                    placeholder="Select location"
                    containerStyle={{
                      width: '100%',
                      borderRadius: 5,
                    }}
                    labelField="title"
                    valueField="id"
                    onChange={value => {
                      setSelectedLocation(value);
                    }}
                    data={locations}
                  />
                </View>
                <View>
                  <Text className="text-primary-500 py-2">Date to expire</Text>
                  <Dropdown
                    style={Styles.InputContainer}
                    value={selectedExpires}
                    placeholder="Expiration date"
                    containerStyle={{
                      width: '100%',
                      borderRadius: 5,
                    }}
                    labelField="title"
                    valueField="id"
                    onChange={value => {
                      setSelectedExpires(value);
                    }}
                    data={[
                      { id: '1', title: 'Today' },
                      { id: '2', title: 'Tomorrow' },
                      { id: '3', title: '3 days' },
                      { id: '4', title: '4 days' },
                      { id: '5', title: '5 days' },
                      { id: '6', title: '6 days' },
                      { id: '7', title: '7 days' },
                    ]}
                  />
                </View>
              </View>
              <View className="shrink flex-row justify-end mt-8">
                <Pressable
                  onPress={() => {
                    const isValidSelection =
                      !!selectedCategory &&
                      !!selectedLocation &&
                      !!selectedExpires;

                    if (isValidSelection) {
                      // fetch categories with filters
                      setRefreshing(true);
                      setFiltering(true);
                      fetchFilteredAsks(
                        selectedCategory.id,
                        selectedLocation.title,
                        Number(selectedExpires.id),
                      )
                        .then(data => {
                          setAsks(data);
                          setFiltering(false);
                        })
                        .catch(error => {
                          console.log(error);
                          setFiltering(false);
                        })
                        .finally(() => {
                          setSelectedCategory(null);
                          setSelectedLocation(null);
                          setSelectedExpires(null);
                          setFiltering(false);
                          setRefreshing(false);
                        });
                    }
                    setShowFilter(false);
                  }}
                  disabled={filtering}
                  className={
                    filtering
                      ? 'rounded-lg border bg-primary-300 border-primary-500 focus:shadow-sm'
                      : 'rounded-lg border bg-primary-600 border-primary-500 focus:shadow-sm'
                  }
                  android_ripple={{ color: 'lightgray' }}>
                  <Text className="text-center text-white font-medium py-2 px-5">
                    Apply filter
                  </Text>
                </Pressable>
              </View>

              {/* The cancel button */}

              <View className="absolute top-2 right-5 overflow-hidden rounded-3xl justify-center items-center">
                <Pressable
                  onPress={() => {
                    setShowFilter(false);
                  }}
                  className="focus:shadow-sm"
                  android_ripple={{ color: 'lightgray' }}>
                  <Text className="text-xl px-1">
                    <Icon name="close-outline" size={20} />
                  </Text>
                </Pressable>
              </View>
              {/* End of cancel button */}
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
            keyExtractor={item => `${item.id}${Date.now()}`}
            ItemSeparatorComponent={ListSeparator}
            onEndReachedThreshold={0.4}
            onEndReached={() => {
              // Implement the pagination fetching here
              if (!refreshing) {
                // Check if end of list was reached to prevent calls with empty response
                if (!endOfListReached) {
                  fetchPaginatedAks(nextPage, pageLimit).then(data => {
                    if (data.length !== 0) {
                      setAsks(currentAsk =>
                        // use a set data structure to filter repeated data
                        Array.from(new Set([...currentAsk, ...data])),
                      );
                      setNextPage(state => state + 1);
                    } else {
                      console.log('End of list reached');
                      setEndOfListReached(true); // List is empty
                    }
                  });
                }
              }
            }}
          />
        </View>
      </View>
      <View className="absolute bottom-8 right-5 rounded-full overflow-hidden">
        <Pressable
          onPress={() => {
            if (isAuthenticated) {
              navigation.navigate('CreateAsk', { mode: 'create' });
            } else {
              navigation.navigate('Authentication');
            }
          }}
          style={Styles.btnShadow}
          className="py-4 px-5 rounded-full flex-row justify-center items-center gap-x-2 bg-primary-500 shadow-md"
          android_ripple={{ color: '#070716' }}>
          <Text className="text-center text-primary-50 font-bold">
            <Icon name="md-add" size={20} color={'white'} />
          </Text>
          <Text className="text-center text-primary-50 text-base font-bold">
            New Ask
          </Text>
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
    <View className="my-5">
      <Text className="text-center text-slate-600 text-sm font-medium">
        No asks to show.
      </Text>
      <Text className="text-center text-slate-600 text-sm font-medium">
        Pull down to refresh page
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
              props.navigation.navigate('UserDetails', {
                userId: props.ask.userId,
              });
            }}>
            <Text className="text-slate-500 font-extralight">
              {!props.ask.userName || props.ask.userName === ''
                ? '~Unkown'
                : `~${props.ask.userName}`}
            </Text>
          </Pressable>
          <Text className="text-slate-400 font-extralight py-1">
            , {new Date(props.ask.createdAt).toDateString().slice(0, 10)}
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
