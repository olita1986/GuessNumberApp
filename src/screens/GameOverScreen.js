import React from 'react'
import { View, StyleSheet, Button, Image, Text, Dimensions, ScrollView } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import  Colors  from '../constants/colors'
import MainButton from '../components/MainButton'

import { Ionicons } from '@expo/vector-icons'

const GameOverScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image 
                        // source={require('../../assets/original.png')}
                        source={{
                            uri: 'https://www.nationalgeographic.com.es/medio/2013/05/21/everest_basecamp_above-1_1800x1779.jpg'
                        }}
                        style={styles.image}
                    />
                </View>
                
                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlighted}>{props.rounds}</Text> rounds to guess the number <Text style={styles.highlighted}>{props.selectedNumber}</Text>.</BodyText>
                <MainButton onPress={props.startAgain}>Start Again <Ionicons name="md-remove" size={24} color="white"/></MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').width / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlighted: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }, 
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height > 400 ? 16 : 20
    }
})


export default GameOverScreen
