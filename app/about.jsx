import { StyleSheet, Text, View } from 'react-native'
import SafeView from '../components/SafeView'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import React from 'react'

const About = () => {
  return (
    <SafeView>
      <ThemedView style={{marginTop: 20}}>
        <ThemedText type={'h1'}>
          Tentang
        </ThemedText>
      </ThemedView>
    </SafeView>
  )
}

export default About

const styles = StyleSheet.create({})