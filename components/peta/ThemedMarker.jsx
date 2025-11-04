import { Image, Text, View } from 'react-native'
import { Marker, Callout, CalloutSubview } from 'react-native-maps'

const ThemedMarker = ({ coordinate, title, description, id, ref }) => {
	return (
		<Marker
			title={title}
			description={description}
			calloutEnabled={false}
			coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}
			identifier={id}
			ref={ref}
		>
			<Image
				source={require("../../assets/marker.png")}
				style={{
					width: 35,
					height: 35,
					resizeMode: 'contain'
				}}
			/>
			{/* <Callout
				style={{
					padding: 20,
					width: 300,
					height: 150,
					backgroundColor: 'orange',
					zIndex: 100
				}}
				onPress={() =>{
					console.log("Callout pressed")
				}}
			>
				<Text>Android asu</Text>

			</Callout> */}

		</Marker>
	)
}

export default ThemedMarker