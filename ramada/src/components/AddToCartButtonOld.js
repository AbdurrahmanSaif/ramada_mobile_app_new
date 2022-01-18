/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from 'react-native-elements';

import { findProductInCart, updateCartData } from '../helpers/cart';

import { updateCart } from '../actions/cart';

import { showMessage } from 'react-native-flash-message';

const AddToCartButton = ({
  cartData,
  product,
  type = 'large',
  quantity = 1,
}) => {
  const dispatch = useDispatch();

  const addProductToCart = useCallback(
    product => {
      if (product.available_stock > 0 || product.selling_price <= 0) {
        const newCartData = updateCartData(cartData, product, quantity);
        dispatch(updateCart(newCartData));
        showMessage({
          message: 'Item added to cart.',
          type: 'success',
          floating: true,
        });
      }
    },
    [dispatch, cartData, quantity],
  );

  const removeProductFromCart = useCallback(
    product => {
      const newCartData = updateCartData(cartData, product, 0);

      dispatch(updateCart(newCartData));

      showMessage({
        message: 'Item removed from cart.',
        type: 'success',
        floating: true,
      });
    },
    [dispatch, cartData],
  );

  const buttonStyle = {
    large: {
      add: {
        buttonStyle: {
          height: 38,
        },
        containerStyle: {
          width: 155,
          marginTop: 10,
        },
        title: 'Add to cart',
      },
      remove: {
        buttonStyle: {
          backgroundColor: '#2e8c3e',
          height: 38,
        },
        containerStyle: {
          width: 155,
          marginTop: 10,
        },
        title: 'Remove from cart',
      },
    },
    small: {
      add: {
        buttonStyle: {
          height: 32,
          paddingHorizontal: 15,
        },
        containerStyle: {
          // width: 80,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 11,
        },
        title: 'Add to Cart',
      },
      remove: {
        buttonStyle: {
          backgroundColor: '#2ba33f',
          height: 32,
        },
        containerStyle: {
          width: 80,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 12,
        },
        title: 'Remove',
      },
    },
    extraSmall: {
      add: {
        buttonStyle: {
          height: 32,
          paddingHorizontal: 15,
        },
        containerStyle: {
          // width: 80,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 11,
        },
        title: 'Add to Cart',
      },
      remove: {
        buttonStyle: {
          backgroundColor: '#2ba33f',
          height: 32,
        },
        containerStyle: {
          width: 80,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 12,
        },
        title: 'Remove',
      },
    },
  };

  const buttonStyleOutOfStock = {
    large: {
      add: {
        buttonStyle: {
          backgroundColor: '#949494',
          height: 38,
        },
        containerStyle: {
          width: 155,
          marginTop: 10,
        },
        title: 'Out Of Stock',
      },
      remove: {
        buttonStyle: {
          backgroundColor: '#2e8c3e',
          height: 38,
        },
        containerStyle: {
          width: 155,
          marginTop: 10,
        },
        title: 'Remove from cart',
      },
    },
    small: {
      add: {
        buttonStyle: {
          backgroundColor: '#949494',
          height: 32,
          paddingHorizontal: 13,
        },
        containerStyle: {
          // width: 85,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 11,
        },
        title: 'Out Of Stock',
      },
      remove: {
        buttonStyle: {
          backgroundColor: '#2e8c3e',
          height: 32,
        },
        containerStyle: {
          width: 65,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 12,
        },
        title: 'Remove',
      },
    },
    extraSmall: {
      add: {
        buttonStyle: {
          backgroundColor: '#949494',
          height: 30,
          paddingHorizontal: 10,
        },
        containerStyle: {
          // width: 85,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 10,
        },
        title: 'Out Of Stock',
      },
      remove: {
        buttonStyle: {
          backgroundColor: '#2e8c3e',
          height: 32,
        },
        containerStyle: {
          width: 65,
          marginTop: 10,
        },
        titleStyle: {
          fontSize: 12,
        },
        title: 'Remove',
      },
    },
  };

  if (product.available_stock <= 0 || product.selling_price <= 0) {
    return (
      <View>
        {findProductInCart(cartData, product) ? (
          <Button
            {...buttonStyleOutOfStock[type].remove}
            onPress={val => removeProductFromCart(product)}
          />
        ) : (
          <Button
            {...buttonStyleOutOfStock[type].add}
            onPress={val => addProductToCart(product)}
          />
        )}
      </View>
    );
  }

  return (
    <View>
      {findProductInCart(cartData, product) ? (
        <Button
          {...buttonStyle[type].remove}
          onPress={val => removeProductFromCart(product)}
        />
      ) : (
        <Button
          {...buttonStyle[type].add}
          onPress={val => addProductToCart(product)}
        />
      )}
    </View>
  );
};

export default AddToCartButton;
