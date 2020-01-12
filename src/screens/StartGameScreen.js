import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Card from '../components/Card'
import colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = (props) => {

    const [number, setNumber] = useState('');

    const numberEnteredHandler = number => {
        setNumber(number)
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
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
                    onChangeText={() => numberEnteredHandler()}
                    value={number}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" color={colors.secundary} onPress={() => {}}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" color={colors.primary} onPress={() => {}}/>
                    </View>
                </View>
            </Card>
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
    }
})

export default StartGameScreen
