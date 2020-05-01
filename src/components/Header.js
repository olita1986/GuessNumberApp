import React from "react";
import { View, Text, StyleSheet, Platform, ColorPropType } from "react-native";
import colors from "../constants/colors";
import TitleText from "./TitleText";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Header = (props) => {
	return (
		<View style={styles.header}>
			<TitleText style={styles.title}>{props.title}</TitleText>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		backgroundColor: Platform.OS === "android" ? colors.primary : "white",
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: Platform.OS === "ios" ? colors.primary : "transparent",
		borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
	},
	headerTitle: {
		color: "white",
		fontSize: 18,
		fontFamily: "open-sans-bold",
	},
	title: {
		color: Platform.OS === "ios" ? colors.primary : "white",
	},
});

export default Header;
