/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import ColorPalette from '../../helpers/colorPalette';

export default function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo-main.png')}
        style={styles.logo}
      />
      <ActivityIndicator color={ColorPalette.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 240,
    height: 220,
  },
});
