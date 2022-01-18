/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import colors from '../../helpers/colorPalette';
import { backendUrl } from '../../helpers/common';
import { COLORS, FONTS, icons } from '../../constants';
import UpdateProductQty from '../../helpers/UpdateProductQty';
import { updateCartData } from '../../helpers/cart';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../actions/cart';

export default function Cartitem({ cartItems, item, onItemClick }) {
  const dispatch = useDispatch();
  const updateQuantity = useCallback(
    (product, quantity) => {
      const newCartData = updateCartData(cartItems, product, quantity);
      dispatch(updateCart(newCartData));
    },
    [cartItems, dispatch],
  );

  const total = item.selling_price * item.quantity;

  return (
    <View style={styles.cartListContainer}>
      {item.additional_fields?.show_rx_symbol === 'Yes' ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            top: 10,
            left: 13,
          }}>
          <Image source={icons.rx} style={{ width: 9, height: 9 }} />
        </View>
      ) : null}
      <Image
        style={styles.theImage}
        source={{
          uri: `${backendUrl}/data/products/${item.id}/120x120-${item.main_image}`,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ ...styles.cartItemName }}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 8,
            marginVertical: 3,
          }}>
          <Text style={{ ...FONTS.body5 }}>Price:</Text>
          <Image
            source={icons.rupee}
            style={{ width: 9, height: 9, tintColor: COLORS.black }}
          />
          <Text style={{ ...FONTS.body5 }}>{item.selling_price}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
          <Image
            source={icons.rupee}
            style={{ width: 10, height: 10, tintColor: COLORS.primary }}
          />
          <Text
            style={{ color: COLORS.primary, ...FONTS.body5 }}>{`${total.toFixed(
            2,
          )}`}</Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={() => updateQuantity(item, 0)}>
          <Image
            style={{ width: 14, height: 14, marginRight: 4, marginBottom: 30 }}
            source={icons.trash}
          />
        </TouchableOpacity>
        <UpdateProductQty item={item} cartData={cartItems} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartListContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 1,
    position: 'relative',
  },
  cartItemName: {
    // flex: 1,
    marginLeft: 10,
    fontSize: 14,
    marginRight: 10,
  },
  totalPrice: {
    color: colors.primary,
    marginRight: 10,
  },
  price: {
    marginBottom: 5,
    // marginHorizontal: 10,
    fontSize: 12,
  },
  theImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
});
