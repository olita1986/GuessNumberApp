import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>Number of rounds: {props.rounds}</Text>
            <Text>Number: {props.selectedNumber}</Text>
            <Button title="Start Again" onPress={props.startAgain}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})


export default GameOverScreen
