/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import colorPalette from '../../helpers/colorPalette';
import { backendUrl } from '../../helpers/common';

import AddToCartButton from '../AddToCartButton';

const ProductBox = ({ cartItem, product, onPress, cartItems }) => {
  return (
    <View style={styles.productBox}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageHolder}>
          {cartItem ? (
            <View
              style={{
                position: 'absolute',
                top: 3,
                right: 3,
                zIndex: 100,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <Icon
                type="font-awesome-5"
                name="check-circle"
                color={colorPalette.green}
                size={20}
              />
            </View>
          ) : null}
          <Image
            style={styles.theImage}
            source={{
              uri: `${backendUrl}/data/products/${product.id}/120x120-${product.main_image}`,
            }}
          />
        </View>
        <View>
          <Text style={{ ...styles.cardTitle }}>{product.name}</Text>
        </View>
      </TouchableOpacity>

      {product?.additional_fields?.item_weight ? (
        <Text style={styles.item_weight}>
          ({product?.additional_fields?.item_weight})
        </Text>
      ) : null}

      <Text style={styles.price}>{`Rs. ${product.selling_price}`}</Text>

      <AddToCartButton cartData={cartItems} product={product} />
    </View>
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
});

export default ProductBox;
