import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../components/Card'
import colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {

    const [number, setNumber] = useState('');
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberEnteredHandler = number => {
        setNumber(number)
        setConfirmed(false)
    }

    const resetInputHandler = () => {
        setNumber('')
        setConfirmed(false)
    }

    const confirmNumberHandler = () => {
        console.log(number)
        const chosenNumber = parseInt(number)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number",
                "Number has to be between 1 and 99",
                [{
                    text: "Ok",
                    style: "destructive",
                    onPress: resetInputHandler
                }]
                
            )
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setNumber('')
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>
                {selectedNumber}
            </NumberContainer>
            <Button title="Start Game" onPress={() => {props.onStartGame(selectedNumber)}}/>
        </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
            <Text style={styles.title}>Start a new game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <Input 
                    style={styles.textInput} 
                    blurOnSubmit autocapitalize="none" 
                    autocorrect={false}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberEnteredHandler}
                    value={number}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" color={colors.secundary} onPress={resetInputHandler}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" color={colors.primary} onPress={confirmNumberHandler}/>
                    </View>
                </View>
            </Card>
            { confirmedOutput }
        </View> 
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    button: {
        width: '50%'
    },
    textInput: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen
