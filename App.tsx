import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import Colors from './constants/colors';
import { useFonts } from 'expo-font';
import Apploading from 'expo-app-loading';

import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>();
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <Apploading />;
  }

  console.log('👍 NO ERROR');
  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };
  const gameOverHandler = (finalRound: number) => {
    setGameIsOver(true);
    setGuessRounds(finalRound);
  };
  const startNewGameHandler = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds(0);
  };
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={[Colors.primary800, Colors.accent500]} style={S.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={S.rootScreen}
          imageStyle={S.backgroudImage}
        >
          <SafeAreaView style={S.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const S = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroudImage: {
    opacity: 0.15,
  },
});
