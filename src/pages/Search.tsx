import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { searchWhoget } from '../apiService/fetchingFunctions';
import { textEllipsis } from '../shared/ellipseText';
import Styles from '../SharedStyles';
import { Props } from '../../types';

export default function Search({ navigation }: Props) {
  const [searchLoader, setSearchLoader] = useState<boolean>(false);
  const [showSearchResultPage, setShowSearchResultPage] =
    useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [resultToShow, setResultToShow] = useState<
    'asks' | 'users' | 'categories'
  >('asks');
  const [searchResults, setSearchResults] = useState<{
    asks: any[];
    users: any[];
    categories: any[];
  }>({
    asks: [],
    categories: [],
    users: [],
  });

  const handleSearch = () => {
    setRefreshing(true);
    searchWhoget(searchKey).then(data => {
      setSearchResults(data);
      setRefreshing(false);
    });
  };
  const onRefresh = React.useCallback(() => {
    handleSearch();
  }, []);

  const handleResultsToShow = (type: 'categories' | 'asks' | 'users') => {
    if (resultToShow !== type) {
      setResultToShow(type);
    }
  };

  return (
    <View className="py-4 bg-white min-h-screen">
      <View className="px-4 py-2">
        <View className="flex-row items-center border rounded-md px-2 border-slate-200 bg-white">
          <Pressable className="p-1 rounded-full">
            <Ionicon name="search" size={20} />
          </Pressable>
          <TextInput
            onSubmitEditing={() => {
              handleSearch();
            }}
            value={searchKey}
            onChangeText={setSearchKey}
            className="py-1 px-2 flex-1"
            placeholder="Search asks, users, categories etc."
            autoFocus
          />
        </View>
      </View>

      <View>
        <View className="px-4 py-5 flex-row items-center gap-x-2 border-b border-slate-200">
          <Pressable
            onPress={() => {
              handleResultsToShow('asks');
            }}
            className={
              resultToShow === 'asks'
                ? 'rounded-sm px-4 py-1 border-b border-secondary-300 bg-white'
                : 'rounded-sm px-4 py-1 border-b border-transparent bg-slate-50'
            }>
            <Text className="text-slate-600 text-center">
              Asks({searchResults.asks.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleResultsToShow('users');
            }}
            className={
              resultToShow === 'users'
                ? 'rounded-sm px-4 py-1 border-b border-secondary-300 bg-white'
                : 'rounded-sm px-4 py-1 border-b border-transparent bg-slate-50'
            }>
            <Text className="text-slate-600 text-center">
              Users({searchResults.users.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleResultsToShow('categories');
            }}
            className={
              resultToShow === 'categories'
                ? 'rounded-sm px-4 py-1 border-b border-secondary-300 bg-white'
                : 'rounded-sm px-4 py-1 border-b border-transparent bg-slate-50'
            }>
            <Text className="text-slate-600 text-center">
              Categories({searchResults.categories.length})
            </Text>
          </Pressable>
        </View>
      </View>

      {searchResults.asks.length === 0 && !searchLoader && (
        <Text className="px-4 text-slate-600 my-2">
          Search results show here
        </Text>
      )}
      {searchLoader && (
        <Text className="text-center text-slate-600">Loading data ...</Text>
      )}
      {resultToShow === 'asks' &&
        !searchLoader &&
        !(searchResults.asks.length === 0) && (
          <ScrollView
            className="py-8"
            contentContainerStyle={{ paddingBottom: 200 }}
            refreshControl={
              <RefreshControl
                colors={[
                  Styles.bgPrimary.backgroundColor,
                  Styles.bgSecondary.backgroundColor,
                ]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            {searchResults.asks.map((ask: any) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('AskDetails', { askId: ask.id });
                  }}
                  key={ask.id}
                  android_ripple={{
                    color: Styles.bgPrimaryLight.backgroundColor,
                  }}
                  className="px-4 py-2 bg-white">
                  <View className="flex-row justify-between py-1">
                    <Text className="text-primary-200">
                      {`~${ask.userName || 'unknown'}`}
                    </Text>
                    <Text> {new Date(ask.createdAt).toLocaleDateString()}</Text>
                  </View>
                  <View>
                    <Text className="text-slate-600">
                      {textEllipsis(ask.message, 18)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      {resultToShow === 'users' &&
        !searchLoader &&
        !(searchResults.users.length === 0) && (
          <ScrollView
            className="py-8"
            contentContainerStyle={{ paddingBottom: 200 }}
            refreshControl={
              <RefreshControl
                colors={[
                  Styles.bgPrimary.backgroundColor,
                  Styles.bgSecondary.backgroundColor,
                ]}
                refreshing={refreshing}
              />
            }>
            {searchResults.users.map((user: any) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('UserDetails', { userId: user.id });
                  }}
                  key={user.id}
                  android_ripple={{
                    color: Styles.bgPrimaryLight.backgroundColor,
                  }}
                  className="px-4 py-2 bg-white">
                  <View className="flex-row items-center justify-start gap-x-4">
                    <View className="border border-slate-200 rounded-full h-12 aspect-square overflow-hidden">
                      <Image
                        source={{ uri: user.profileImage }}
                        className="h-12 w-12 object-cover object-center"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-600">{user.name}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      {resultToShow === 'categories' &&
        !searchLoader &&
        !(searchResults.categories.length === 0) && (
          <ScrollView
            className="py-8"
            contentContainerStyle={{ paddingBottom: 200 }}
            refreshControl={
              <RefreshControl
                colors={[
                  Styles.bgPrimary.backgroundColor,
                  Styles.bgSecondary.backgroundColor,
                ]}
                refreshing={refreshing}
              />
            }>
            {searchResults.categories.map((cat: any) => {
              return (
                <Pressable
                  key={cat.id}
                  android_ripple={{
                    color: Styles.bgPrimaryLight.backgroundColor,
                  }}
                  className="px-4 py-2 bg-white">
                  <Pressable>
                    <Text className="text-slate-600">{cat.name}</Text>
                  </Pressable>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
    </View>
  );
}
