/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

import colorPalette from '../../helpers/colorPalette';
import { backendUrl, truncate } from '../../helpers/common';

import AddToCartButton from '../AddToCartButton';

const ProductBox = ({ product, onPress, cartItems }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: SIZES.width / 2.2,
        height: SIZES.height / 3,
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        ...styles.shadow,
        marginBottom: 13,
        position: 'relative',
      }}>
      {product.additional_fields?.show_rx_symbol === 'Yes' ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            top: 10,
            left: 15,
          }}>
          <Image source={icons.rx} style={{ width: 15, height: 15 }} />
        </View>
      ) : null}
      <Image
        style={styles.theImage}
        resizeMode="contain"
        source={{
          uri: `${backendUrl}/data/products/${product.id}/120x120-${product.main_image}`,
        }}
      />

      <Text
        style={{
          marginTop: SIZES.padding,
          width: '100%',
          ...FONTS.body5,
        }}>
        {product.name}
      </Text>
      <Text
        style={{
          width: '100%',
          color: 'gray',
          ...FONTS.body6,
          marginTop: 5,
        }}>
        {truncate(product.description.replace(/(<([^>]+)>)/gi, ''), 30)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: 10,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={icons.rupee}
            style={{ width: 10, height: 10, tintColor: COLORS.black }}
          />
          <Text
            style={{
              alignItems: 'center',
              textAlign: 'center',
              ...FONTS.body4,
            }}>
            {product.selling_price}
          </Text>
        </View>
        <AddToCartButton cartData={cartItems} product={product} type="small" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productBox: {
    height: 255,
    borderColor: '#c4c4c4',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  imageHolder: {
    alignSelf: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    height: 120,
    width: 120,
  },
  theImage: {
    height: 120,
    width: 120,
  },
  item_weight: {
    fontSize: 11,
  },
  cardTitle: {
    color: colorPalette.secondary,
    fontSize: 14,
    alignSelf: 'center',
    margin: 2,
  },
  price: {
    color: colorPalette.primary,
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default ProductBox;
