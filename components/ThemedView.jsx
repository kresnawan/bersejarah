import { StyleSheet, View } from 'react-native'
import { useColorScheme } from 'react-native'
import Colors from '../constants/Colors'

const ThemedView = ({ children, style }) => {
	const theme = useColorScheme();
	const styles = StyleSheet.create({
		view: {
			backgroundColor: Colors[theme].bgColor,
			width: '100%',
			height: '100%',
			paddingHorizontal: 15
		}
	})
	return (
		<View style={[styles.view, style]}>
			{children}
		</View>
	)
}

export default ThemedView

