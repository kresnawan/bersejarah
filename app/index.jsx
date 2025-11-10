import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import SafeView from '../components/SafeView'
import ThemedText from '../components/ThemedText'
import ThemedView from '../components/ThemedView'
import DataCard from '../components/peta/DataCard'
import { ScrollView, Animated } from 'react-native'
// import ThemedMarker from '../components/peta/ThemedMarker'
import { Pressable } from 'react-native'
import { useRef } from 'react'
import { useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'
import Colors from '../constants/Colors'
import { MapView, PointAnnotation, Camera } from "@maplibre/maplibre-react-native"
import { Suspense } from 'react'
import axios from 'axios';

const INITIAL_REGION = {
	latitude: -7.709944,
	longitude: 112.307851,
	latitudeDelta: 3,
	longitudeDelta: 3
}

// const markers = [
// 	{
// 		latitude: -7.759595,
// 		longitude: 112.306516,
// 		title: "Candi Yurta",
// 		addr: "Jl. Kaca Piring, Tulungrejo, Pare",
// 		desc: "Lorem ipsum dolor sit amet pronc des tur elit ange du blanc pur"
// 	},
// 	{
// 		latitude: -7.729595,
// 		longitude: 112.406516,
// 		title: "Tempat 2",
// 		addr: "Jl. Kaca Piring, Tulungrejo, Pare",
// 		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie ac nulla at egestas. In hac habitasse platea dictumst. In hendrerit enim ex, rutrum interdum risus imperdiet in. Maecenas eu elementum leo. Sed suscipit fringilla porta. Sed at lacinia ex, in imperdiet nibh. Pellentesque venenatis neque sit amet sapien finibus, a fermentum eros vehicula. Aenean a ullamcorper urna, at egestas lorem. Nullam pretium, dui sed malesuada facilisis, est mi placerat urna, eu hendrerit ante risus at odio. Morbi sagittis vulputate lacus, non porta magna consequat a. Vestibulum luctus, nisi eu aliquet hendrerit, nibh nisi condimentum lacus, ac lacinia magna libero vel nunc. Vestibulum justo lorem, porta nec nulla eu, placerat commodo lectus. Pellentesque elementum pellentesque libero in facilisis."
// 	},
// 	{
// 		latitude: -7.709595,
// 		longitude: 112.506516,
// 		title: "Nama tempat",
// 		addr: "Jl. Kaca Piring, Tulungrejo, Pare",
// 		desc: "Deskripsi tempat"
// 	},
// 	{
// 		latitude: -7.799595,
// 		longitude: 112.606516,
// 		title: "Nama tempat",
// 		addr: "Jl. Kaca Piring, Tulungrejo, Pare",
// 		desc: "Deskripsi tempat"
// 	},
// 	{
// 		latitude: -7.779595,
// 		longitude: 112.706516,
// 		title: "Nama tempat",
// 		addr: "Jl. Kaca Piring, Tulungrejo, Pare",
// 		desc: "Deskripsi tempat"
// 	},
// ]

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

const { width, height } = Dimensions.get("window");

const index = () => {
	const cameraRef = useRef();
	const mapRef = useRef();
	const markerRef = useRef([]);
	const theme = useColorScheme();
	const [initialRegion, setInitialRegion] = useState(null);

	const [loadingDone, setLoadingDone] = useState(false);

	const [calloutName, setCalloutName] = useState("");
	const [calloutAddress, setCalloutAddress] = useState("");
	const [calloutShown, setCalloutShown] = useState(false);
	const [markers, setMarkers] = useState([]);

	function getAllData() {
		axios({
			url: "http://d1fe7b0caf1c.ngrok-free.app/api/v1/data",
			method: "GET"
		}).then(res => {
			setMarkers(res.data);
			setLoadingDone(true);
		}).catch(err => {
			console.log(err);
			setLoadingDone(true);
		})
	}

	function showCallout(name, address) {

		setTimeout(() => {
			setCalloutName(cutText(name, 18));
			setCalloutAddress(cutText(address, 86))
			setCalloutShown(true)
		}, 1200);
	}

	function cutText(text, len) {
		if (text.length > len) {
			return `${text.slice(0, len - 3)}...`
		} else {
			return text
		}
	}

	useEffect(() => {
		getAllData();
		if (markers.length > 0) {
			let minLat = Infinity;
			let maxLat = -Infinity;
			let minLon = Infinity;
			let maxLon = -Infinity;

			markers.forEach(marker => {
				minLat = Math.min(minLat, marker.latitude);
				maxLat = Math.max(maxLat, marker.latitude);
				minLon = Math.min(minLon, marker.longitude);
				maxLon = Math.max(maxLon, marker.longitude);
			})

			const centerLat = (minLat + maxLat) / 2;
			const centerLon = (minLon + maxLon) / 2;

			const latitudeDelta = (maxLat - minLat) * 1.2; // 20% padding
			const longitudeDelta = (maxLon - minLon) * 1.2; // 20% padding

			setInitialRegion([
				centerLon, centerLat
			]);
		}
	}, []);

	return (


		<SafeView>
			{
				loadingDone === true && (
					<MapView
						style={{
							flex: 1
						}}
						mapStyle={"https://api.maptiler.com/maps/outdoor-v2/style.json?key=qMwjSy8lYbHFysUGYPyX"}
					>
						{
							markers.map((item, index) => (
								<PointAnnotation coordinate={[item.longitude, item.latitude]} key={index} />
							))
						}
						<Camera centerCoordinate={initialRegion} zoomLevel={9} ref={cameraRef} />
					</MapView>
				)
			}

			{
				calloutShown &&
				<View
					style={{
						position: 'absolute',
						left: '50%',
						top: '7%',
						backgroundColor: theme == "dark" ? Colors[theme].bgColor : 'white',
						paddingHorizontal: 15,
						paddingVertical: 10,
						borderRadius: 5,
						transform: [{ translateX: '-50%' }],
						maxWidth: 280,
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
					}}
				>
					<ThemedText
						type={'h3'}
						style={{ textAlign: 'center' }}
					>
						{calloutName}
					</ThemedText>

					<ThemedText
						type={'text'}
						style={{
							textAlign: 'justify',
							textAlign: 'center',
							fontSize: 12,
							marginTop: 5
						}}
					>
						{calloutAddress}
					</ThemedText>
				</View>
			}

			<ThemedView style={{ paddingHorizontal: 0, paddingVertical: 15 }}>
				<ThemedText style={{ marginTop: 0, paddingHorizontal: 15 }} type={"text"}>
					Temukan tempat bersejarah disekitarmu, data didasarkan pada hasil penelitian dan pengamatan
				</ThemedText>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					horizontal
					style={{
						flexDirection: 'row',
						paddingHorizontal: 15,
						marginTop: 15
					}}
				>
					<Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
						{
							markers.map((item, index) => (
								<Pressable key={index} onPress={() => {
									cameraRef.current?.setCamera({
										centerCoordinate: [item.longitude, item.latitude],
										zoomLevel: 12,
										animationDuration: 5000,
									});



								}}>
									<DataCard title={item.title} desc={item.description} />
								</Pressable>
							))
						}
					</Suspense>
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
		height: '50%',
	},
});