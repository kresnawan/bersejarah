import { View, Text, StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native'
import Colors from '../constants/Colors'

const ThemedText = ({children, style, type}) => {
	const theme = useColorScheme();

	const styles = StyleSheet.create({
	text: {
		color: Colors[theme].txtColor
	},
	h1: {
		fontSize: 40,
		fontWeight: 'bold',
		color: Colors[theme].txtColor
	},
	h2: {
		fontSize: 30,
		fontWeight: 'bold',
		color: Colors[theme].txtColor
	},
	h3: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors[theme].txtColor
	},
})
	return (
		<Text style={[styles[type], style]}>
			{children}
		</Text>
	)
}



export default ThemedText