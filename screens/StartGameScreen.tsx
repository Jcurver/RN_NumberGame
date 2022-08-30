import React, { useState } from 'react';
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { runInNewContext } from 'vm';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

interface IStartGameScreen {
  onPickNumber?: (pickedNumber: number) => void;
}

const StartGameScreen = ({ onPickNumber }: IStartGameScreen) => {
  const [enteredNumber, setEnteredNumber] = useState<string>('');

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (e: string) => {
    setEnteredNumber(e);
  };
  const resetInputHandler = () => {
    setEnteredNumber('');
    return;
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //show alert...
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    if (onPickNumber) {
      onPickNumber(chosenNumber);
    }
  };
  const marginTop = height < 380 ? 30 : 100;
  return (
    <ScrollView style={S.screen}>
      <KeyboardAvoidingView style={S.screen} behavior="position">
        <View style={[S.rootContainer, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={S.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={S.buttonsContainer}>
              <View style={S.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={S.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const S = StyleSheet.create({
  screen: { flex: 1 },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 400 ? 30 : 100,
    alignItems: 'center',
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
});
