import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';

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
    const initialGuess = generateRandomBetween(1, 100, props.selectedNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [rounds, setRounds] = useState([initialGuess.toString()])
    const currentMin = useRef(1)
    const currentMax = useRef(100)
    const {selectedNumber, onGameOver} = props

    useEffect(() => {
        if (currentGuess === props.selectedNumber) {
            props.onGameOver(rounds.length)
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
            currentMin.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentMin.current,currentMax.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(currentRounds => [nextNumber.toString(), ...currentRounds])
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={() => nextGuessHandler('lower')}/>
                <Button title="Higher" onPress={() => nextGuessHandler('higher')}/>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {rounds.map( (round, index) => (
                                <View style={styles.listItem} key={round}>
                                    <BodyText>
                                        #{rounds.length - index}
                                    </BodyText>
                                    <BodyText>
                                        {round}
                                    </BodyText>
                                </View>
                            )
                        )
                    }
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list}
                    data={rounds}
                    keyExtractor={item => item}
                    renderItem={({item, index}) => {
                            return (<View style={styles.listItem}>
                                <BodyText>
                                    #{rounds.length - index}
                                </BodyText>
                                <BodyText>
                                    {item}
                                </BodyText>
                            </View>)
                        }
                    }
                />
            </View>
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
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    }
})


export default GameScreen
