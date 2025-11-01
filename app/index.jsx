import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import SafeView from '../components/SafeView'
import ThemedText from '../components/ThemedText'
import ThemedView from '../components/ThemedView'
import DataCard from '../components/peta/DataCard'
import { ScrollView } from 'react-native'
import ThemedMarker from '../components/peta/ThemedMarker'
import { useRef } from 'react'
import React from 'react'

const INITIAL_REGION = {
	latitude: -7.709944,
	longitude: 112.307851,
	latitudeDelta: 3,
	longitudeDelta: 3
}

const markerCoordinate = {
	latitude: -7.719595,
	longitude: 112.206516
}

const markers = [
	{
		latitude: -7.759595,
		longitude: 112.306516,
		title: "Nama tempat",
		desc: "Deskripsi tempat"
	},
	{
		latitude: -7.729595,
		longitude: 112.406516,
		title: "Nama tempat",
		desc: "Deskripsi tempat"
	},
	{
		latitude: -7.709595,
		longitude: 112.506516,
		title: "Nama tempat",
		desc: "Deskripsi tempat"
	},
	{
		latitude: -7.799595,
		longitude: 112.606516,
		title: "Nama tempat",
		desc: "Deskripsi tempat"
	},
	{
		latitude: -7.779595,
		longitude: 112.706516,
		title: "Nama tempat",
		desc: "Deskripsi tempat"
	},
]

const customMapStyle = [
	{
		featureType: 'poi', // Points of interest
		elementType: 'labels',
		stylers: [{ visibility: 'off' }],
	},
	{
		featureType: 'road', // Roads
		elementType: 'labels',
		stylers: [{ visibility: 'off' }],
	},
	{
		featureType: 'transit', // Transit lines
		elementType: 'labels',
		stylers: [{ visibility: 'off' }],
	},
	// Add more styling rules as needed to hide other elements
];



const index = () => {
	const mapRef = useRef();

	const focusToCoordinate = (item) => {
		mapRef.current.animateCamera({ center: {latitude: item.latitude, longitude: item.longitude}, zoom: 10 }, {duration: 1000})
	}
	return (

		<SafeView>

			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				customMapStyle={customMapStyle}
				zoomControlEnabled
				ref={mapRef}
			>
				{
					markers.map((item, index) => (
						<ThemedMarker
							coordinate={item}
							title={item.title}
							description={item.desc}
							key={index}
							onPress={() => focusToCoordinate(item)}
						/>
					))
				}
			</MapView>

			<ThemedView style={{ paddingTop: 20 }}>

				<ScrollView style={{ marginBottom: 280, paddingBottom: 20 }}>
					<ThemedText type={"h2"}>
						Tempat bersejarah
					</ThemedText>
					<ThemedText style={{ marginTop: 10 }} type={"text"}>
						Temukan tempat bersejarah disekitarmu, data didasarkan pada hasil penelitian dan pengamatan
					</ThemedText>
					<View>
						{
							markers.map((item, index) => (
								<DataCard key={index} title={item.title} desc={item.desc} />
							))
						}
					</View>
				</ScrollView>
			</ThemedView>

		</SafeView>

	)
}

export default index

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '40%',
	},
});