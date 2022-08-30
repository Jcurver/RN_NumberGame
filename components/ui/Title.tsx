import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/colors';

interface ITitle {
  children: ReactNode;
}

const Title = ({ children }: ITitle) => {
  return <Text style={S.title}>{children}</Text>;
};

export default Title;

const S = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({
      ios: 0,
      android: 2,
    }),
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
  },
});
