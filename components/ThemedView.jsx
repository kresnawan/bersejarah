import { StyleSheet, View, Dimensions } from 'react-native'
import { useColorScheme } from 'react-native'
import Colors from '../constants/Colors'

const ThemedView = ({ children, style }) => {
	const {screenWidth, screenHeight} = Dimensions.get("window");
	const theme = useColorScheme();
	const styles = StyleSheet.create({
		view: {
			backgroundColor: Colors[theme].bgColor,
			width: screenWidth,
			height: screenHeight,
			paddingHorizontal: 15,
			borderRadius: 10
		}
	})
	return (
		<View style={[styles.view, style]}>
			{children}
		</View>
	)
}

export default ThemedView

