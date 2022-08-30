import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

interface IGameOverScreen {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }: IGameOverScreen) => {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) imageSize = 150;
  if (height < 400) imageSize = 80;
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={S.screen}>
      <View style={S.rootContainer}>
        <Title>Game OVER!</Title>
        <View style={[S.imageContainer, imageStyle]}>
          <Image style={S.image} source={require('../assets/images/success.png')} />
        </View>
        <Text style={S.summaryText}>
          Your phone needed <Text style={S.highlight}>{roundsNumber}</Text> rounds to guess the
          number <Text style={S.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};
export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;

const S = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: deviceWidth * 0.5,
    height: deviceWidth * 0.5,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    marginVertical: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
