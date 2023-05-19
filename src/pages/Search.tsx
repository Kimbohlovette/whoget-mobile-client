import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  RefreshControl,
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
  const [searchResults, setSearchResults] = useState<any>({
    asks: [],
    categories: [],
    users: [],
  });

  const handleSearch = () => {
    setRefreshing(true);
    searchWhoget(searchKey).then(data => {
      console.log(data.asks);
      setSearchResults(data);
      setRefreshing(false);
    });
  };
  const onRefresh = React.useCallback(() => {
    handleSearch();
  }, []);

  return (
    <View className="py-4 bg-white min-h-screen">
      <View className="px-4 py-2">
        <View className="flex-row items-center border rounded-md px-2 border-slate-200 bg-white">
          <Pressable
            focusable={false}
            onPress={() => {}}
            className="p-1 rounded-full">
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

      {searchResults.asks.length === 0 && !searchLoader && (
        <Text className="px-4 text-center text-slate-600 my-2">
          Search results show here
        </Text>
      )}
      {searchLoader && (
        <Text className="text-center text-slate-600">Loading data ...</Text>
      )}
      {!searchLoader && !(searchResults.asks.length === 0) && (
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
                  navigation.replace('AskDetails', { askId: ask.id });
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
    </View>
  );
}
