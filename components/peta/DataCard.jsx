import { StyleSheet, Text, View } from 'react-native'
import ThemedText from '../ThemedText'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const DataCard = ({title, desc, lat, long}) => {
	return (
		<View
			style={{
				paddingVertical: 20,
				paddingLeft: 15,
				paddingRight: 25,
				borderWidth: 2,
				borderColor: 'orange',
				borderRadius: 10,
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 30
			}}
		>
			<View style={{
				maxWidth: '85%'
			}}>

				<ThemedText type={"h3"}>{title}</ThemedText>
				<ThemedText type={"text"} style={{ marginTop: 10 }}>{desc}</ThemedText>
				<ThemedText type={"text"} style={{color: 'orange', marginTop: 20}}>Baca selengkapnya</ThemedText>
			</View>
			<View>
				<Ionicons name='map' size={34} color={`orange`} />
			</View>
		</View>
	)
}

export default DataCard

const styles = StyleSheet.create({})