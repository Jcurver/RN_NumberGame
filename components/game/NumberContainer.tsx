import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import IReactNode from '../../interface/reactnode';
import Colors from '../../constants/colors';

const NumberContainer = ({ children }: IReactNode) => {
  return (
    <View style={S.container}>
      <Text style={S.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
console.log('deviceWidth, deviceHeight:: ', deviceWidth, deviceHeight);

const S = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontFamily: 'open-sans-bold',
  },
});
