/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { colors, Icon, Image, Text } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

import colorPalette from '../../helpers/colorPalette';
import { backendUrl, toArray } from '../../helpers/common';

import HTML from 'react-native-render-html';
import { useEffect, useCallback } from 'react';
import AddToCartButton from '../AddToCartButton';

import { findProductInCart, updateCartData } from '../../helpers/cart';
import { updateCart } from '../../actions/cart';
import { getItemList, getSingleItem } from '../../api/items';
import ProductReview from './ProductReview';

export default function ProductDetails({ route }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(route.params.product);
  const [photos, setPhotos] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [productVariants, setProductVariants] = useState([]);

  console.log('product::', product);
  console.log(
    'productVariants::',
    productVariants[0]?.additional_fields?.item_weight,
  );
  console.log('product::', product);

  const cartItems = useSelector(state => state.cart.items);

  const updateQuantity = (product, quantity) => {
    let item = findProductInCart(cartItems, product);

    // if already added in the cart then updating the cart quantity.
    if (item) {
      const newCartData = updateCartData(cartItems, product, quantity);
      dispatch(updateCart(newCartData));
    }

    setQuantity(quantity);
  };

  const changeProduct = useCallback(id => {
    getSingleItem(id).then(result => setProduct(result));
  }, []);

  useEffect(() => {
    if (product?.group_id) {
      getItemList(`ProductsSearch[group_id]=${product.group_id}`, 10, 1).then(
        json => setProductVariants(json),
      );
    }
  }, [product]);

  // useEffect(() => {
  //   if (product?.group_id) {
  //     getItemList(`ProductsSearch[group_id]=${product.group_id}`, 10, 1).then(
  //       json => setProductVariants(json.filter(j => j.id !== product.id)), // removing the current product from the list.
  //     );
  //   }
  // }, [product]);

  useEffect(() => {
    if (product.media) {
      let mediaArr = toArray(product.media, ',');
      setPhotos(mediaArr);
    }
  }, [product.media]);

  // setting quantity on page load
  useEffect(() => {
    let quantity = findProductInCart(cartItems, product);

    if (quantity?.quantity) {
      setQuantity(quantity.quantity);
    } else {
      setQuantity(1);
    }
  }, [setQuantity, cartItems, product]);

  const getHighlights = highlights => {
    let html = [];
    let highlightsArr = toArray(highlights, '\n');

    highlightsArr.forEach(h => {
      html.push(`<div>* ${h}</div>`);
    });

    return html.join('');
  };
  const loadMoreWeight = () => {
    if (productVariants.length === 0) {
      return null;
    }

    return (
      <>
        {productVariants[0]?.additional_fields?.item_weight.length ===
        0 ? null : (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
            }}>
            <Text>{productVariants[0].toString()}</Text>
            <Text style={styles.moreText}>Weight</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                // paddingRight: 30,
                marginTop: 10,
              }}>
              {productVariants.map(variant => (
                <View style={styles.products}>
                  <TouchableOpacity
                    key={variant.id}
                    onPress={e => changeProduct(variant.id)}
                    style={[
                      styles.btnTab,
                      variant.id === product.id ? styles.btnTabActive : null,
                    ]}>
                    <Text
                      style={[
                        styles.textTab,
                        variant.id === product.id ? styles.textTabActive : null,
                      ]}>
                      {variant?.additional_fields?.item_weight}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </>
    );
  };
  const getAttributes = attributes => {
    let html = [];
    let attributesArr = toArray(attributes, '\n');

    attributesArr.forEach(attr => {
      let keyVal = toArray(attr, ':');
      html.push(`<div><strong>${keyVal[0]}</strong>: ${keyVal[1]}</div>`);
    });

    return html.join('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#00000066' }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Swiper
            loadMinimal
            loadMinimalSize={3}
            style={{ height: 250 }}
            loadMinimalLoader={
              <ActivityIndicator size="large" color={colors.primary} />
            }
            activeDotStyle={{ backgroundColor: colorPalette.primary }}
            dotStyle={{ backgroundColor: 'grey' }}
            activeDotColor={colors.primary}
            buttonWrapperStyle={{ color: colors.primary }}>
            {photos?.map(photo => (
              <TouchableOpacity
                key={photo.toString()}
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginHorizontal: 10,
                }}>
                <Image
                  source={{
                    uri: `${backendUrl}/data/products/${product.id}/300x300-${photo}`,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </Swiper>

          {findProductInCart(cartItems, product) ? (
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
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

          <View style={{ ...styles.headerContainer, marginTop: -10 }}>
            <View>
              <Text style={styles.title}>{product.name}</Text>
              {product?.additional_fields?.item_weight ? (
                <Text style={{}}>
                  {product?.additional_fields?.item_weight}
                </Text>
              ) : null}
            </View>
            <Text
              style={{
                color: colorPalette.primary,
                fontWeight: '700',
                fontSize: 14,
              }}>{`Rs. ${product?.selling_price}`}</Text>
          </View>

          {loadMoreWeight()}

          <CollapsibleView
            arrowStyling={{ size: 12, rounded: true, thickness: 1 }}
            style={styles.colBox}
            title={<Text style={styles.colHead}>Product Description</Text>}>
            {product.highlights ? (
              <View style={styles.colView}>
                <HTML source={{ html: getHighlights(product.highlights) }} />
              </View>
            ) : null}
          </CollapsibleView>

          <CollapsibleView
            arrowStyling={{ size: 12, rounded: true, thickness: 1 }}
            style={styles.colBox}
            title={<Text style={styles.colHead}>Attributes</Text>}>
            {product.attributes ? (
              <View style={styles.colView}>
                <HTML source={{ html: getAttributes(product.attributes) }} />
              </View>
            ) : null}
          </CollapsibleView>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: 9,
            }}>
            <Text style={styles.attributeName}>Quantity:</Text>
            <NumericInput
              initValue={quantity}
              minValue={1}
              onChange={val => {
                updateQuantity(product, val);
              }}
              rounded
              totalHeight={29}
            />
            <Text style={styles.inlineTotal}>
              {' '}
              Total: {`Rs. ${product?.selling_price * quantity} `}
            </Text>
          </View>

          <View style={{ alignSelf: 'center', marginTop: 9 }}>
            <AddToCartButton
              type="large"
              cartData={cartItems}
              product={product}
              quantity={quantity}
            />
          </View>
          <View style={{ display: 'none' }}>
            <ProductReview product={product} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colHead: {
    fontSize: 14,
    marginLeft: 3,
  },
  colBox: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    alignItems: 'flex-start',
  },
  colView: {
    marginHorizontal: 10,
    marginVertical: 3,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colorPalette.primary,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  moreProducts: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
  },
  image: {
    marginTop: 10,
    height: 200,
    borderRadius: 6,
  },
  imageTile: {
    height: 50,
    width: 50,
    marginTop: 10,
    marginRight: 10,
  },
  inlineTotal: {
    color: colorPalette.primary,
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  alreadyAddedText: {
    color: 'green',
    fontSize: 16,
    display: 'flex',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  cartButtonContainer: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceInput: {
    height: 40,
    flex: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    marginRight: 10,
  },
  attributeName: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey2,
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
    width: 50,
    height: 50,
  },
  row: {
    display: 'flex',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    marginHorizontal: 8,
    padding: 6,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    margin: 2,
    flexGrow: 1,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#222',
    fontSize: 12,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  sellingPrice: {
    fontWeight: '400',
    color: colorPalette.primary,
    fontSize: 11,
    marginLeft: 10,
  },
  icon: {
    height: 28,
    width: 28,
  },
  myBtn: {
    color: '#0000',
  },
  listcontainer: {
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  moreText: {
    marginRight: 40,
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey2,
  },
  products: {
    paddingRight: 0,
    marginBottom: 7,
  },
  btnTab: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    // width: 75,
    // height: 28,
    paddingHorizontal: 7,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
  textTab: {
    fontSize: 12,
    marginLeft: 4,
    color: 'gray',
  },
  textTabActive: {
    color: 'red',
  },
  btnTabActive: {
    borderWidth: 1,
    borderColor: 'red',
  },
  ratingSec: {
    paddingHorizontal: 10,
    marginTop: 20,
    width: '100%',
    // borderWidth: 1,
  },
  ratingLeft: {
    width: '40%',
  },
});
