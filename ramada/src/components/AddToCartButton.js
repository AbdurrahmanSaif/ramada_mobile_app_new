/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { findProductInCart, updateCartData } from '../helpers/cart';
import { updateCart } from '../actions/cart';
import { showMessage } from 'react-native-flash-message';
import { COLORS, icons } from '../constants';

const AddToCartButton = ({
  cartData,
  product,
  type = 'small',
  quantity = 1,
}) => {
  const dispatch = useDispatch();

  const addProductToCart = useCallback(
    product => {
      if (product.available_stock > 0 || product.selling_price <= 0) {
        const newCartData = updateCartData(cartData, product, quantity);
        dispatch(updateCart(newCartData));
      }
    },
    [dispatch, cartData, quantity],
  );

  const removeProductFromCart = useCallback(
    product => {
      const newCartData = updateCartData(cartData, product, 0);

      dispatch(updateCart(newCartData));
    },
    [dispatch, cartData],
  );

  if (product.available_stock <= 0 || product.selling_price <= 0) {
    return (
      <View>
        {findProductInCart(cartData, product) ? (
          <>
            {type === 'large' ? (
              <View
                onPress={val => removeProductFromCart(product)}
                style={{
                  paddingVertical: 18,
                  paddingHorizontal: 50,
                  backgroundColor: COLORS.darkgray,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{ color: '#fff' }}>Out Of stock</Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: COLORS.darkgray,
                  borderWidth: 1,
                  borderColor: COLORS.darkgray,
                  width: 27,
                  height: 27,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Image
                  source={icons.trash}
                  style={{ width: 13, height: 13, tintColor: COLORS.white }}
                />
              </View>
            )}
          </>
        ) : (
          <>
            {type === 'large' ? (
              <View
                onPress={val => removeProductFromCart(product)}
                style={{
                  paddingVertical: 18,
                  paddingHorizontal: 50,
                  backgroundColor: COLORS.darkgray,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{ color: '#fff' }}>Out Of stock</Text>
              </View>
            ) : (
              <View
                onPress={val => addProductToCart(product)}
                style={{
                  backgroundColor: COLORS.lightGray,
                  width: 27,
                  height: 27,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Image
                  source={icons.plus}
                  style={{ width: 9, height: 9, tintColor: COLORS.darkgray }}
                />
              </View>
            )}
          </>
        )}
      </View>
    );
  }

  return (
    <View>
      {findProductInCart(cartData, product) ? (
        <>
          {type === 'large' ? (
            <TouchableOpacity
              onPress={val => removeProductFromCart(product)}
              style={{
                paddingVertical: 18,
                paddingHorizontal: 25,
                backgroundColor: COLORS.primary,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={icons.shoppingCart}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                  marginRight: 10,
                }}
              />
              <Text style={{ color: '#fff' }}>Remove from Cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={val => removeProductFromCart(product)}
              style={{
                // backgroundColor: COLORS.darkgray,
                borderWidth: 1,
                borderColor: COLORS.darkgray,
                width: 27,
                height: 27,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={icons.trash}
                style={{ width: 13, height: 13, tintColor: COLORS.black }}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          {type === 'large' ? (
            <TouchableOpacity
              onPress={val => addProductToCart(product)}
              style={{
                paddingVertical: 18,
                paddingHorizontal: 45,
                backgroundColor: COLORS.primary,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={icons.shoppingCart}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                  marginRight: 10,
                }}
              />
              <Text style={{ color: '#fff' }}>Add To Cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={val => addProductToCart(product)}
              style={{
                width: 27,
                height: 27,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderColor: COLORS.primary,
                borderWidth: 1,
              }}>
              <Image
                source={icons.plus}
                style={{ width: 9, height: 9, tintColor: COLORS.black }}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default AddToCartButton;
