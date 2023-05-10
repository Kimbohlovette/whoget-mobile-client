const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';

export const fetchOneUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}users/${userId}`, {
    method: 'GET',
  });
  const jsonData = await response.json();
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
      console.log(error);
      return [];
    }
  } else if (page && !limit) {
    try {
      const response = await fetch(`${BASE_URL}asks?page=${page}`);
      const { asks } = await response.json();
      return asks;
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    try {
      const response = await fetch(`${BASE_URL}asks`);
      const { asks } = await response.json();
      return asks;
    } catch (error) {
      console.log(error);
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
    console.log('asks: ', asks);
    console.log('length: ', numOfAsks);
    return {
      asks,
      numOfAsks,
    };
  }
};
