import { View, Text } from 'react-native'
import React from 'react'

const SafeView = ({children}) => {
  return (
    <View style={{
        paddingHorizontal: 0,
        width: '100%',
        height: '100%'
    }}>
    {children}
    </View>
  )
}

export default SafeView