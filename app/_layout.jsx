import { Tabs } from 'expo-router'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mainLayout = () => {
	const theme = useColorScheme();
	const insets = useSafeAreaInsets();
	return (
		<Tabs
		safeAreaInsets={{
			bottom: Platform.OS === 'android' ? 10 : inse
		}}
			screenOptions={{
				tabBarStyle: {
					paddingTop: 8,
					height: 60 + insets.bottom,
					backgroundColor: Colors[theme].tabBgColor
				},
				headerTintColor: Colors[theme].txtColor,
				headerStyle:{
					backgroundColor: Colors[theme].bgColor
				}
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