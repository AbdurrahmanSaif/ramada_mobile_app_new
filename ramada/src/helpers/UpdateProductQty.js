/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateCart } from '../actions/cart';
import { COLORS, icons, SIZES } from '../constants';
import { updateCartData } from './cart';

export default function UpdateProductQty({ item, cartData }) {
  const dispatch = useDispatch();

  const updateQty = useCallback(
    (product, action) => {
      let newQty = product.quantity;

      if (action === 'increase') {
        newQty = product.quantity + 1;
      }

      if (action === 'decrease') {
        if (newQty > 1){
          newQty = product.quantity - 1;
        }
      }

      // customer can not add more products than the available stock.
      if (newQty > product.available_stock) {
        alert({ data: product });
        return;
      }

      // customer can not buy more products than the given value (it is a law).
      // if (newQty > settings.maximumAllowedQuantityPerOrder) {
      //   maxOrderMessage({
      //     data: product,
      //     maximumAllowedQuantityPerOrder:
      //       settings.maximumAllowedQuantityPerOrder,
      //   });
      //   return;
      // }

      const newCartData = updateCartData(cartData, product, newQty);
      dispatch(updateCart(newCartData));
    },
    [dispatch, cartData],
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        width: SIZES.width / 4.5,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => updateQty(item, 'decrease')}
        style={{
          width: 25,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: COLORS.primary,
        }}>
        <Image source={icons.minus} style={{ width: 10, height: 8 }} />
      </TouchableOpacity>
      <Text>{item.quantity}</Text>
      <TouchableOpacity
        onPress={() => updateQty(item, 'increase')}
        style={{
          // padding: 10,
          width: 25,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: COLORS.primary,
        }}>
        <Image source={icons.plus} style={{ width: 10, height: 10 }} />
      </TouchableOpacity>
    </View>
  );
}
