import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  const [selectedNumber, setSelectedNumber ]= useState()

  const startGameHandler = (selectedNumber) => {
    setSelectedNumber(selectedNumber)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if (selectedNumber) {
    content = <GameScreen selectedNumber={selectedNumber}/>
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
