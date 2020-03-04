import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exlude) => {
    min = Math.ceil(min);
    max = Math.floor(max)

    const rndNumber = Math.floor(Math.random() * (max - min)) + min;

    if (rndNumber === exlude) {
        return generateRandomBetween(min, max, exlude)
    }

    return rndNumber
}

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.selectedNumber))
    const [rounds, setRounds] = useState(0)
    const currentMin = useRef(1)
    const currentMax = useRef(100)
    const {selectedNumber, onGameOver} = props

    useEffect(() => {
        if (currentGuess === props.selectedNumber) {
            props.onGameOver(rounds)
        }
    }, [currentGuess, selectedNumber, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.selectedNumber) || 
        (direction === 'higher' && currentGuess > props.selectedNumber)) {
            Alert.alert('Dont lie!',' You know that its wrong', [{
                text: "Sorry!", style: "cancel"
            }])
            return
        }

        if (direction === 'lower') {
            currentMax.current = currentGuess
        } else {
            currentMin.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentMin.current,currentMax.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(currentRounds => currentRounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={() => nextGuessHandler('lower')}/>
                <Button title="Higher" onPress={() => nextGuessHandler('higher')}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})


export default GameScreen
