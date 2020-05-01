import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

const generateRandomBetween = (min, max, exlude) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	const rndNumber = Math.floor(Math.random() * (max - min)) + min;

	if (rndNumber === exlude) {
		return generateRandomBetween(min, max, exlude);
	}

	return rndNumber;
};

const GameScreen = (props) => {
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	const initialGuess = generateRandomBetween(1, 100, props.selectedNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [rounds, setRounds] = useState([initialGuess.toString()]);
	const [deviceDimensions, setDeviceDimensions] = useState({
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	});
	const currentMin = useRef(1);
	const currentMax = useRef(100);
	const { selectedNumber, onGameOver } = props;

	useEffect(() => {
		const updateLayout = () => {
			setDeviceDimensions({
				width: Dimensions.get("window").width,
				height: Dimensions.get("window").height,
			});
		};
		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === props.selectedNumber) {
			props.onGameOver(rounds.length);
		}
	}, [currentGuess, selectedNumber, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < props.selectedNumber) ||
			(direction === "higher" && currentGuess > props.selectedNumber)
		) {
			Alert.alert("Dont lie!", " You know that its wrong", [
				{
					text: "Sorry!",
					style: "cancel",
				},
			]);
			return;
		}

		if (direction === "lower") {
			currentMax.current = currentGuess;
		} else {
			currentMin.current = currentGuess + 1;
		}

		const nextNumber = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
		setCurrentGuess(nextNumber);
		setRounds((currentRounds) => [nextNumber.toString(), ...currentRounds]);
	};

	if (deviceDimensions.height < 500) {
		return (
			<View style={styles.screen}>
				<Text>Opponent's Guess</Text>
				<View style={styles.controls}>
					<MainButton onPress={() => nextGuessHandler("lower")}>
						<Ionicons name="md-remove" size={24} color="white" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={() => nextGuessHandler("higher")}>
						<Ionicons name="md-add" size={24} color="white" />
					</MainButton>
				</View>

				<View style={styles.listContainer}>
					<FlatList
						contentContainerStyle={styles.list}
						data={rounds}
						keyExtractor={(item) => item}
						renderItem={({ item, index }) => {
							return (
								<View style={styles.listItem}>
									<BodyText>#{rounds.length - index}</BodyText>
									<BodyText>{item}</BodyText>
								</View>
							);
						}}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button title="Lower" onPress={() => nextGuessHandler("lower")} />
				<Button title="Higher" onPress={() => nextGuessHandler("higher")} />
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
					keyExtractor={(item) => item}
					renderItem={({ item, index }) => {
						return (
							<View style={styles.listItem}>
								<BodyText>#{rounds.length - index}</BodyText>
								<BodyText>{item}</BodyText>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height > 600 ? 30 : 10,
		width: 300,
		maxWidth: "80%",
	},
	listContainer: {
		flex: 1,
		width: Dimensions.get("window").width > 350 ? "60%" : "80%",
	},
	list: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
		alignContent: "center",
	},
});

export default GameScreen;
