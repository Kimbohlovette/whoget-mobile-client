/// <reference types="nativewind/types" />
import { CompositeNavigationProp } from '@react-navigation/native';

export type HomeStackParamList = {
  Asks: undefined;
  CreateAsk: undefined;
  Authentication?: CompositeNavigationProp<AuthStackParamList>;
  Profile: undefined;
  AskDetail: undefined;
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
