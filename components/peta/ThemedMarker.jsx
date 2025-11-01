import { StyleSheet, Image } from 'react-native'
import { Marker } from 'react-native-maps'

const ThemedMarker = ({ coordinate, title, description, onPress }) => {
	return (
		<Marker
			coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}
			title={title}
			description={description}
			onPress={onPress}
		>
			<Image
				source={require("../../assets/marker.png")}
				style={{
					width: 35,
					height: 35,
					resizeMode: 'contain'
				}}
			/>
		</Marker>
	)
}

export default ThemedMarker