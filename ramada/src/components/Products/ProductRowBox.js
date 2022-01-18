/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, Image, Text } from 'react-native-elements';
import { COLORS, FONTS, icons } from '../../constants';

import { imageUrl, truncate } from '../../helpers/common';

import AddToCartButton from '../AddToCartButton';

const ProductRowBox = ({ cartItems, product, onPress }) => {
  return (
    <TouchableOpacity
      key={product.id.toString()}
      onPress={() => onPress(product)}
      style={{
        borderRadius: 12,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 10,
        ...styles.shadow,
      }}>
      <View style={styles.row}>
        <View style={{ position: 'relative' }}>
          {product.additional_fields?.show_rx_symbol === 'Yes' ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                top: 5,
                left: 0,
              }}>
              <Image source={icons.rx} style={{ width: 12, height: 12 }} />
            </View>
          ) : null}
          <Image
            resizeMode="contain"
            source={{
              uri: imageUrl(
                product.main_image,
                `products/${product.id}`,
                '300x300-',
              ),
            }}
            style={styles.pic}
          />
        </View>
        <View style={styles.nameContainer}>
          <View>
            <Text style={{ ...FONTS.body5, marginLeft: 10 }}>
              {truncate(product.name, 20)}
            </Text>
          </View>
          {product?.additional_fields?.item_weight ? (
            <View>
              <Text style={styles.sellingPrice}>
                {product?.additional_fields?.item_weight}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Image
              source={icons.rupee}
              style={{ width: 10, height: 10, tintColor: COLORS.black }}
            />
            <Text style={styles.sellingPrice}> {product.selling_price}</Text>
          </View>
        </View>
        <AddToCartButton cartData={cartItems} product={product} type="medium" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  theImage: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  listEndItem: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    height: 35,
    width: 100,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  carouselBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemTitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 60,
    margin: 10,
  },
  pic: {
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  nameContainer: {
    margin: 2,
    flexGrow: 1,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  sellingPrice: {
    fontWeight: '400',
    color: COLORS.black,
    fontSize: 12,
    marginLeft: -2,
  },
  icon: {
    height: 28,
    width: 28,
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

export default ProductRowBox;
