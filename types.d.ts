/// <reference types="nativewind/types" />
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  Asks: undefined;
  CreateAsk: undefined;
  Authentication?: CompositeNavigationProp<AuthStackParamList>;
  UserDetails: { userId: string };
  AskDetails: { askId: string };
  Search: undefined;
};

export type RootTabParamList = {
  Home: CompositeNavigationProp<HomeStackParamList>;
  Profile: undefined;
  Notifications: undefined;
};

export type AuthStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Categories: undefined;
};

export type Props = NativeStackScreenProps<
  HomeStackParamList,
  | 'UserDetails'
  | 'AskDetail'
  | 'CreateAsk'
  | 'Asks'
  | 'Authentication'
  | 'Search'
>;
