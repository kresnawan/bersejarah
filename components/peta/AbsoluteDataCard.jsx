import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../constants/Colors'
import { useColorScheme } from 'react-native'
import ThemedText from '../ThemedText'
import React from 'react'

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const AbsoluteDataCard = () => {
    const theme = useColorScheme();

    const styles = StyleSheet.create({
        view: {
            backgroundColor: Colors[theme].bgColor,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            paddingVertical: 20,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginHorizontal: 5
        }
    })

    return (
        <View style={styles.view}>
            <ThemedText type={'h3'}>
                Judul
            </ThemedText>
            <ThemedText type={'text'}>
                Deskripsi singkat...
            </ThemedText>
        </View>
    )
}



export default AbsoluteDataCard