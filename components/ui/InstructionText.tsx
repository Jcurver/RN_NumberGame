import React, { Children } from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import Colors from '../../constants/colors';
import IReactNode from '../../interface/reactnode';
import IStyle from '../../interface/style';

interface IInstructionText extends IReactNode, IStyle {}

const InsructionText = ({ children, style }: IInstructionText) => {
  return <Text style={[S.insructionText, style]}> {children}</Text>;
};

export default InsructionText;

const S = StyleSheet.create({
  insructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
