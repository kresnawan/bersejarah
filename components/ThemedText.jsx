import { View, Text, StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native'
import Colors from '../constants/Colors'
import { useState } from 'react'

const ThemedText = ({ children, style, type, props }) => {
	const theme = useColorScheme();

	const styles = StyleSheet.create({
		text: {
			color: Colors[theme].txtColor,
			fontSize: 12
		},
		h1: {
			fontSize: 30,
			fontWeight: 'bold',
			color: Colors[theme].txtColor,
		},
		h2: {
			fontSize: 20,
			fontWeight: 'bold',
			color: Colors[theme].txtColor,
		},
		h3: {
			fontSize: 15,
			fontWeight: 'bold',
			color: Colors[theme].txtColor,
		},
	})
	return (
		<Text style={[styles[type], style]} {...props}>
			{children}
		</Text>
	)
}



export default ThemedText