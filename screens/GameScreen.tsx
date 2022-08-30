import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

const generatedRandomBetween = (min: number, max: number, exclude: number): number => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generatedRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

interface IGameScreen {
  userNumber: number;
  onGameOver: (guessRoundLength: number) => void;
}

const GameScreen = ({ userNumber, onGameOver }: IGameScreen) => {
  const initialGuess = generatedRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { width, height } = useWindowDimensions();
  console.log('width,height:: ', width, height);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction: 'lower' | 'higher') => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert('Do not lie!', ' you know that this is wrong....', [
        { text: 'sorry', style: 'cancel' },
      ]);
      return;
    } else if (direction === 'higher') {
      minBoundary = currentGuess + 1;
    } else if (direction === 'lower') {
      maxBoundary = currentGuess;
    }
    const newRndNumber = generatedRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
  };
  const guessRoundsListLength = guessRounds.length;

  const content =
    width < 500 ? (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>

        <Card>
          <InstructionText style={S.instructionText}>Higher or lower</InstructionText>
          <View style={S.buttonsContainer}>
            <View style={S.buttonContainer}>
              <PrimaryButton onPressLowHigh={() => nextGuessHandler('lower')}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={S.buttonContainer}>
              <PrimaryButton onPressLowHigh={() => nextGuessHandler('higher')}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </>
    ) : (
      <>
        <View style={S.buttonsContainerWide}>
          <View style={S.buttonContainer}>
            <PrimaryButton onPressLowHigh={() => nextGuessHandler('lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={S.buttonContainer}>
            <PrimaryButton onPressLowHigh={() => nextGuessHandler('higher')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );

  return (
    <View style={S.screen}>
      <Title>Opponent&apos;s Guess</Title>
      {content}
      <View style={S.listContainer}>
        {/* {guessRounds.map(guessRound => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={item => String(item)}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const S = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 12,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
