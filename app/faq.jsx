import { StyleSheet, Text, View } from 'react-native'
import SafeView from '../components/SafeView'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import React from 'react'

const FAQ = () => {
  return (
    <SafeView>
      <ThemedView style={{marginTop: 20}}>
        <ThemedText type={'h1'}>
          FAQ
        </ThemedText>
      </ThemedView>
    </SafeView>
  )
}

export default FAQ

const styles = StyleSheet.create({})