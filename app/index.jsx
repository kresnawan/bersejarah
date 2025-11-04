import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import SafeView from '../components/SafeView'
import ThemedText from '../components/ThemedText'
import ThemedView from '../components/ThemedView'
import DataCard from '../components/peta/DataCard'
import { ScrollView, Animated } from 'react-native'
import ThemedMarker from '../components/peta/ThemedMarker'
import AbsoluteDataCard from '../components/peta/AbsoluteDataCard'
import { Pressable } from 'react-native'
import { useRef } from 'react'
import { useColorScheme } from 'react-native'
import { useEffect } from 'react'

const INITIAL_REGION = {
	latitude: -7.709944,
	longitude: 112.307851,
	latitudeDelta: 3,
	longitudeDelta: 3
}

const markers = [
	{
		latitude: -7.759595,
		longitude: 112.306516,
		title: "Candi Yumerta",
		addr: "Jl. Kaca Piring, Tulungrejo, Pare",
		desc: "Lorem ipsum dolor sit amet pronc des tur elit ange du blanc pur"
	},
	{
		latitude: -7.729595,
		longitude: 112.406516,
		title: "Tempat 2",
		desc: "Deskripsi tempat 2"
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
		stylers: [{ visibility: 'on' }],
	},
	{
		featureType: 'road', // Roads
		elementType: 'labels',
		stylers: [{ visibility: 'on' }],
	},
	{
		featureType: 'transit', // Transit lines
		elementType: 'labels',
		stylers: [{ visibility: 'on' }],
	},
	// Add more styling rules as needed to hide other elements
];

const {width, height} = Dimensions.get("window");



const index = () => {
	const mapRef = useRef();
	const markerRef = useRef([]);
	const theme = useColorScheme();

	const focusToCoordinate = (item, index) => {
		mapRef.current.animateCamera({ center: { latitude: item.latitude, longitude: item.longitude }, zoom: 12 }, { duration: 1000 })
		setTimeout(() =>{
			markerRef.current[index].showCallout();
		}, 1000);
	}

	return (

		<SafeView>

			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				customMapStyle={customMapStyle}
				userInterfaceStyle='dark'
				ref={mapRef}
				toolbarEnabled={false}
			>
				{
					markers.map((item, index) => (
						<ThemedMarker
							coordinate={item}
							title={item.title}
							description={item.addr}
							key={index}
							ref={e => markerRef.current[index] = e}
						/>
					))
				}
			</MapView>
			{/* <View
				style={{
					zIndex: 100,
					width: '100%',
					height: 300,
					position: 'absolute',
					bottom: 0,
					backgroundColor: 'white'
				}}
			>
				<View
				>
					<ThemedText>{width}</ThemedText>
					<ThemedText>{height}</ThemedText>
				</View>
			</View> */}

			<ThemedView style={{ paddingTop: 0 }}>

				<ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 280, paddingVertical: 20 }}>
					<ThemedText type={"h1"}>
						Peta
					</ThemedText>
					<ThemedText style={{ marginTop: 10 }} type={"text"}>
						Temukan tempat bersejarah disekitarmu, data didasarkan pada hasil penelitian dan pengamatan
					</ThemedText>
					<View>
						{
							markers.map((item, index) => (
								<Pressable key={index} onPress={() => focusToCoordinate(item, index)}>
									<DataCard title={item.title} desc={item.desc} />
								</Pressable>
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
		width: width,
		height: '40%',
	},
});