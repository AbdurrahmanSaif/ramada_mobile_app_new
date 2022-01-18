/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { SIZES, FONTS, COLORS, icons } from '../../constants';
import { backendUrl, toArray } from '../../helpers/common';
import InnerHeader from '../InnerHeader';
import { findProductInCart, updateCartData } from '../../helpers/cart';
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from '../AddToCartButton';
import { updateCart } from '../../actions/cart';

export default function ProductDetails({ route, navigation }) {
  const [photos, setPhotos] = useState([]);
  const [product, setProduct] = useState(route.params.product);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch;

  console.log('product::', product);

  const totalPrice = product?.selling_price * quantity;

  useEffect(() => {
    if (product.media) {
      let mediaArr = toArray(product.media, ',');
      setPhotos(mediaArr);
    }
  }, [product.media]);

  const updateQuantity = (product, action) => {
    let item = findProductInCart(cartItems, product);
    let newQty = quantity;

    if (action === 'increase') {
      newQty = quantity + 1;
      setQuantity(newQty);
    }

    if (action === 'decrease') {
      if (newQty > 1) {
        newQty = quantity - 1;
        setQuantity(newQty);
      }
    }
    // if already added in the cart then updating the cart quantity.
    if (item) {
      const newCartData = updateCartData(cartItems, product, newQty);
      dispatch(updateCart(newCartData));
    }
  };

  useEffect(() => {
    let quantity = findProductInCart(cartItems, product);
    console.log('quantity::', quantity);
    if (quantity?.quantity) {
      setQuantity(quantity.quantity);
    } else {
      setQuantity(1);
    }
  }, [setQuantity, cartItems, product]);

  return (
    <SafeAreaView style={{ position: 'relative', height: '100%' }}>
      <InnerHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Swiper
          loadMinimal
          loadMinimalSize={3}
          style={{ height: 280 }}
          loadMinimalLoader={
            <ActivityIndicator size="large" color={COLORS.primary} />
          }
          activeDotStyle={{
            backgroundColor: COLORS.primary,
            marginBottom: -10,
          }}
          dotStyle={{ backgroundColor: 'grey', marginBottom: -10 }}
          activeDotColor={COLORS.primary}
          buttonWrapperStyle={{ color: COLORS.primary }}>
          {photos?.map(photo => (
            <>
              <TouchableOpacity
                key={photo.toString()}
                style={{
                  backgroundColor: COLORS.white,
                  padding: 10,
                  position: 'relative',
                }}>
                {product.additional_fields?.show_rx_symbol === 'Yes' ? (
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 100,
                      right: 40,
                      top: 10,
                    }}>
                    <Image
                      source={icons.rx}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                ) : null}
                <Image
                  resizeMode="contain"
                  source={{
                    uri: `${backendUrl}/data/products/${product.id}/300x300-${photo}`,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  style={styles.image}
                />
              </TouchableOpacity>
            </>
          ))}
        </Swiper>

        <View style={styles.contentSec}>
          <View style={styles.line} />
          <Text style={styles.name}>{product.name}</Text>
          {product.additional_fields?.show_rx_symbol === 'Yes' ? (
            <Text style={{ color: 'red', ...FONTS.body5, marginTop: 8 }}>
              * Prescription is required for this medicine
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              marginBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'black' }}>Price: </Text>
              <Image
                source={icons.rupee}
                style={{
                  width: 13,
                  height: 13,
                }}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '700',
                  color: COLORS.black,
                }}>
                {product.selling_price}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 7,
                }}>
                <Image
                  source={icons.rupee}
                  style={{
                    width: 11,
                    height: 11,
                    tintColor: COLORS.darkgray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    fontWeight: '500',
                    color: COLORS.darkgray,
                    textDecorationLine: 'line-through',
                  }}>
                  {product.mrp}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: SIZES.width / 4.5,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => updateQuantity(product, 'decrease')}
                style={styles.quantityBtn}>
                <Image source={icons.minus} style={{ width: 10, height: 8 }} />
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(product, 'increase')}
                style={styles.quantityBtn}>
                <Image source={icons.plus} style={{ width: 10, height: 10 }} />
              </TouchableOpacity>
            </View>
          </View>

          <CollapsibleView
            noArrow={true}
            style={{
              borderColor: 'transparent',
              alignItems: 'flex-start',
              width: SIZES.width - 10,
              alignSelf: 'center',
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 1,
              borderTopColor: COLORS.lightGray,
              borderTopWidth: 1,
              paddingVertical: 15,
            }}
            title={
              <View style={styles.colHead}>
                <Text>Product Description</Text>
                <Image source={icons.next} style={{ width: 18, height: 18 }} />
              </View>
            }>
            {product.highlights ? (
              <View style={styles.colView}>
                <Text
                  style={{
                    width: '100%',
                    color: 'gray',
                    ...FONTS.body4,
                    marginTop: 5,
                  }}>
                  {product.highlights.replace(/(<([^>]+)>)/gi, '')}
                </Text>
              </View>
            ) : null}
          </CollapsibleView>

          <CollapsibleView
            noArrow={true}
            style={{
              borderColor: 'transparent',
              alignItems: 'flex-start',
              width: SIZES.width - 10,
              alignSelf: 'center',
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 1,
              paddingBottom: 15,
            }}
            title={
              <View style={styles.colHead}>
                <Text>Product Attributes</Text>
                <Image source={icons.next} style={{ width: 18, height: 18 }} />
              </View>
            }>
            {product.attributes ? (
              <View style={styles.colView}>
                {/* <Text>{product.attributes.replace(/(<([^>]+)>)/gi, '')}</Text> */}
                {/* <HTML source={{ html: getAttributes(product.attributes) }} /> */}
                <Text
                  style={{
                    width: '100%',
                    color: 'gray',
                    ...FONTS.body4,
                    marginTop: 5,
                  }}>
                  {product.attributes.replace(/(<([^>]+)>)/gi, '')}
                </Text>
              </View>
            ) : null}
          </CollapsibleView>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <View
          style={{
            width: SIZES.width / 2.7,
          }}>
          <Text style={{ fontSize: 11 }}>Total Price:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={icons.rupee}
              style={{
                width: 17,
                height: 17,
              }}
            />
            <Text style={{ fontSize: 23 }}>{totalPrice.toFixed(2)}</Text>
          </View>
        </View>
        <AddToCartButton
          cartData={cartItems}
          product={product}
          quantity={quantity}
          type="large"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.black,
    marginRight: 30,
  },
  image: {
    width: '100%',
    marginTop: 10,
    height: 230,
    borderRadius: 6,
    marginVertical: 10,
  },
  contentSec: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    elevation: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: SIZES.height / 2.2,
  },
  line: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.lightGray,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: -5,
    marginBottom: 20,
  },
  quantityBtn: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
  },
  bottomButton: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  quantitySec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quantity: {
    flexDirection: 'row',
    width: SIZES.width / 3.4,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingVertical: 5,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    marginLeft: 15,
  },
  colHead: {
    fontSize: 14,
    // marginLeft: -15,
    justifyContent: 'space-between',
    width: SIZES.width - 30,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 10,
  },
});
