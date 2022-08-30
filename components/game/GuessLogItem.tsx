import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IReactNode from '../../interface/reactnode';
import Colors from '../../constants/colors';

interface IGuessLogItem {
  roundNumber: number;
  guess: number;
}

const GuessLogItem = ({ roundNumber, guess }: IGuessLogItem) => {
  return (
    <View style={S.listItem}>
      <Text style={S.itemText}># {roundNumber}</Text>
      <Text>Opponents Guess:{guess}</Text>
    </View>
  );
};

export default GuessLogItem;

const S = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    // overflow: 'scroll',
  },
  itemText: {},
});
