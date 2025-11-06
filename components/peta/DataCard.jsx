import { StyleSheet, Text, View, Image } from 'react-native'
import ThemedText from '../ThemedText'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { useColorScheme } from 'react-native'
import { Dimensions } from 'react-native'

const DataCard = ({title, desc, lat, long}) => {
	const {width, height} = Dimensions.get("window");
	const theme = useColorScheme();
	return (
		<View
			style={{
				// borderWidth: 1,
				// borderColor: 'orange',
				borderRadius: 10,
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 30,
				backgroundColor: Colors[theme].tabBgColor,
				width: width * 0.90,
				height: height / 2 * 0.5,
				marginRight: 20
			}}
		>
			<View
				style={{
					width: '35%',
					height: height / 2 * 0.5,
					backgroundColor: 'white',
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					overflow: 'hidden'
				}}
			>
				<Image 
					source={require('../../assets/foto-candi.jpg')}
					style={{
						width: '100%',
						height: height / 2 * 0.5,
						resizeMode: 'cover'
					}}
				/>
			</View>
			<View style={{
				width: '65%',
				padding: 15
			}}>

				<ThemedText type={"h3"}>{title}</ThemedText>
				<ThemedText type={"text"} style={{ marginTop: 10, height: 100 }}>{desc}</ThemedText>
				<ThemedText type={"text"} style={{color: 'orange',  position: 'absolute', bottom: 20, left: 20,textDecorationLine: 'underline'}}>Baca selengkapnya</ThemedText>
			</View>
			{/* <View>
				<Ionicons name='map' size={15} color={`orange`} />
			</View> */}
		</View>
	)
}

export default DataCard

const styles = StyleSheet.create({})