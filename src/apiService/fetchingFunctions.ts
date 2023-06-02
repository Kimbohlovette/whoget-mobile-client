import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';

export const fetchOneUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}users/${userId}`, {
    method: 'GET',
  });
  const jsonData = await response.json();
  //console.log('data in function: ', jsonData.user);
  return jsonData.user;
};

export const fetchOneUserByEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}users/email/${email}`, {
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
      console.log('Locations from local storage: ', locationList);
      return JSON.parse(locationList);
    }
  } catch (error) {
    console.log('Nothing to show');
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
  return resData.user;
};

export const signinWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

export const createUser = async (payload: any) => {
  const response = await fetch(`${BASE_URL}users`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();
  return resData.newUser;
};

export const searchWhoget = async (q: string) => {
  const response = await fetch(`${BASE_URL}search?q=${q}`);
  const results = await response.json();
  return results;
};

export const fetchFilteredAsks = async (
  category: string,
  location: string,
  expires: number,
) => {
  const response = await fetch(
    `${BASE_URL}asks/filter?category=${category}&location=${location}&expires=${expires}`,
  );

  const resData = await response.json();
  return resData.asks;
};

export const deleteAsk = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}asks/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result.deletedId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateAsk = async (id: string, payload: any) => {
  console.log('\n\n Payload: ', payload);
  console.log('Editting the ask with ID: ', id);
  try {
    const response = await fetch(`${BASE_URL}asks/${id}`, {
      method: 'PUT',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.updated;
  } catch (error) {
    console.log(error);
    return null;
  }
};
