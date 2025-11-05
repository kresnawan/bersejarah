import { View, Text } from 'react-native'
import { useColorScheme } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const SafeView = ({children}) => {
  const theme = useColorScheme();
  return (
    <View style={{
        paddingHorizontal: 0,
        width: '100%',
        height: '100%',
        backgroundColor: Colors[theme].bgColor
    }}>
    {children}
    </View>
  )
}

export default SafeView