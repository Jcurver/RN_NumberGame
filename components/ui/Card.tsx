import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors';
import IReactNode from '../../interface/reactnode';

const Card = ({ children }: IReactNode) => {
  return <View style={S.inputContainer}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get('window').width;

const S = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
