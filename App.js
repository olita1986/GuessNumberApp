import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

const fonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [selectedNumber, setSelectedNumber ]= useState()
  const [rounds, setRounds ]= useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading 
      startAsync={fonts} 
      onFinish={() => setDataLoaded(true)} 
      onError={error => console.log(error)}/>
  }

  const configureNewGameHandler = () => {
    setRounds(0)
    setSelectedNumber(null)
  }
  const startGameHandler = (selectedNumber) => {
    setSelectedNumber(selectedNumber)
    setRounds(0)
  }

  const gameOverHandler = (rounds) => {
    setRounds(rounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if (selectedNumber && rounds <= 0) {
    content = <GameScreen selectedNumber={selectedNumber} onGameOver={gameOverHandler}/>
  } else if (rounds > 0) {
    content = <GameOverScreen 
    selectedNumber={selectedNumber} 
    rounds={rounds}
    startAgain={configureNewGameHandler}/>
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
