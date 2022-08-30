import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet, GestureResponderEvent } from 'react-native';
import Colors from '../../constants/colors';
import IReactNode from '../../interface/reactnode';

interface IPrimaryButton extends IReactNode {
  onPress?: () => string | void;
  onPressLowHigh?: (direction: GestureResponderEvent) => void;
}

const PrimaryButton = ({ children, onPress, onPressLowHigh }: IPrimaryButton) => {
  const pressHandler = () => {
    console.log('pressHandler');
  };
  return (
    <View style={S.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [S.buttonInnerContainer, S.pressed] : S.buttonInnerContainer
        }
        onPress={onPress ? onPress : onPressLowHigh}
        android_ripple={{ color: Colors.primary500 }}
      >
        <Text style={S.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};
export default PrimaryButton;

const S = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: '#cb1e7d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
