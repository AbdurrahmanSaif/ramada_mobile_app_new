/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS, icons } from '../../constants';
import { imageUrl } from '../../helpers/common';

export default function ItemRow({ item }) {
  const total = item.selling_price * item.quantity;

  return (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: `${imageUrl(item.main_image, `products/${item.id}`)}` }}
        style={styles.image}
      />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontWeight: '700' }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 10, height: 10 }} source={icons.rupee} />
            <Text>
              {item.selling_price} x {item.quantity}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 10, height: 10 }} source={icons.rupee} />
            <Text>{total?.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  image: {
    marginVertical: 10,
    height: 70,
    width: 70,
    borderRadius: 6,
    marginRight: 8,
  },
});
