import { Tabs } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { useColorScheme } from 'react-native';

const mainLayout = () => {
	const theme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					paddingTop: 20,
					height: 100,
					backgroundColor: Colors[theme].tabBgColor
				},
				headerShown: false
			}}
		>

			<Tabs.Screen
				name='index'
				options={{
					title: '',
					headerTitle: 'Peta',
					tabBarIcon: ({focused}) =>(
						<Ionicons 
							size={32} 
							name={focused ? "map" : "map-outline"}
							color={focused ? Colors[theme].iconFocusedColor : Colors[theme].iconUnfocusedColor}
						/>
					)
				}} />

				<Tabs.Screen
				name='faq'
				options={{
					title: '',
					headerTitle: 'Pertanyaan',
					tabBarIcon: ({focused}) =>(
						<Ionicons 
							size={32} 
							name={focused ? "help-circle" : "help-circle-outline"}
							color={focused ? Colors[theme].iconFocusedColor : Colors[theme].iconUnfocusedColor}
						/>
					)
				}} />

				<Tabs.Screen
				name='about'
				options={{
					title: '',
					headerTitle: 'Tentang',
					tabBarIcon: ({focused}) =>(
						<Ionicons 
							size={32} 
							name={focused ? "information-circle" : "information-circle-outline"}
							color={focused ? Colors[theme].iconFocusedColor : Colors[theme].iconUnfocusedColor}
						/>
					)
				}} />

		</Tabs>
	)
}

export default mainLayout