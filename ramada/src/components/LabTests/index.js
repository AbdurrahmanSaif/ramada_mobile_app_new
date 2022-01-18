import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InnerHeader from '../InnerHeader';

export default function LabTests({ navigation }) {
  return (
    <>
      <InnerHeader navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.text}>Lab Tests</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
