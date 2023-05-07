import { Text, ScrollView } from 'react-native';
import React from 'react';
import Styles from '../SharedStyles';

const Home = () => {
  return (
    <ScrollView
      style={Styles.pageContainer}
      className="py-2 px-5 bg-primary-500 w-full">
      <Text className="text-secondary-50">Home</Text>
    </ScrollView>
  );
};

export default Home;
