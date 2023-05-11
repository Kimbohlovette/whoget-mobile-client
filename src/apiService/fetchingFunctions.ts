import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';

export const fetchOneUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}users/${userId}`, {
    method: 'GET',
  });
  const jsonData = await response.json();
  //console.log('data in function: ', jsonData.user);
  return jsonData.user;
};

export const fetchOneAskById = async (askId: string) => {
  const response = await fetch(`${BASE_URL}asks/${askId}`, {
    method: 'GET',
  });
  const resData = await response.json();
  return resData.ask;
};

export const fetchPaginatedAks = async (page?: number, limit?: number) => {
  if (page && limit) {
    try {
      const response = await fetch(
        `${BASE_URL}asks?page=${page}&limit=${limit}`,
      );
      const { asks } = await response.json();
      return asks;
    } catch (error) {
      return [];
    }
  } else if (page && !limit) {
    try {
      const response = await fetch(`${BASE_URL}asks?page=${page}`);
      const { asks } = await response.json();
      return asks;
    } catch (error) {
      return [];
    }
  } else {
    try {
      const response = await fetch(`${BASE_URL}asks`);
      const { asks } = await response.json();
      return asks;
    } catch (error) {
      return [];
    }
  }
};

export const fetchAsksByUserId = async (userId: string) => {
  const response = await fetch(`${BASE_URL}users/${userId}/asks`);
  const resData = await response.json();
  if (resData.numOfAsks) {
    const { asks, numOfAsks } = resData;
    return {
      asks,
      numOfAsks,
    };
  } else {
    console.log(resData.message);
  }
};

export const fetchAsksByCategoryId = async (catId: string) => {
  const response = await fetch(`${BASE_URL}categories/${catId}/asks`);
  const resData = await response.json();
  if (resData.numOfAsks) {
    const { asks, numOfAsks } = resData;
    return {
      asks,
      numOfAsks,
    };
  }
};

export const fetchCategories = async (page?: number, limit?: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}categories?page=${page}&limit=${limit}`,
    );
    const resData = await response.json();
    return resData.categories;
  } catch (error) {
    // handle the error correctly
    console.log(error);
  }
};

// Functions to store and retrieve categories from async storage

export const getCategoriesFromAsyncStorage = async () => {
  try {
    const categoryList = await AsyncStorage.getItem('@whoget-categories');
    if (categoryList !== null) {
      return JSON.parse(categoryList);
    }
  } catch (error) {
    // handle error
  }
};

export const saveCategoriesToAsyncStorage = async (categoryList: any) => {
  try {
    await AsyncStorage.setItem(
      '@whoget-categories',
      JSON.stringify(categoryList),
    );
  } catch (error) {
    // raise saving error
  }
};

export const saveLocationsToAsyncStorage = async (locationList: any) => {
  try {
    await AsyncStorage.setItem(
      '@whoget-locations',
      JSON.stringify(locationList),
    );
  } catch (error) {
    // raise saving error
  }
};

export const getLocationsFromAsyncStorage = async () => {
  try {
    const locationList = await AsyncStorage.getItem('@whoget-locations');
    if (locationList !== null) {
      return JSON.parse(locationList);
    }
  } catch (error) {
    // handle error
  }
};

export const createAsk = async (ask: any) => {
  const response = await fetch(`${BASE_URL}asks`, {
    method: 'POST',
    body: JSON.stringify(ask),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();
  console.log('In fetch function', resData);
  return resData.user;
};
