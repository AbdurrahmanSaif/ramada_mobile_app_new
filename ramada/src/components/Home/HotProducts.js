/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-elements';
import { imageUrl, truncate } from '../../helpers/common';
import Heading from './Heading';
import { getProductsByLabel } from '../../actions/products';
import { SafeAreaView } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import AddToCartButton from '../AddToCartButton';

const HotProducts = ({ navigation }) => {
  let label = 'Hot';
  const dispatch = useDispatch();
  const products = useSelector(state => state.products[label] || []);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    dispatch(getProductsByLabel(label));
  }, [dispatch, label]);

  const openProduct = product => {
    navigation.navigate('ProductDetails', { product });
  };

  useEffect(() => {
    dispatch(getProductsByLabel(label));
  }, [dispatch, label]);

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => openProduct(item)}
          style={{
            width: SIZES.width / 2.3,
            height: SIZES.height / 3,
            padding: SIZES.padding,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius / 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
            position: 'relative',
          }}>
          {item.additional_fields?.show_rx_symbol === 'Yes' ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 100,
                top: 20,
                left: 15,
              }}>
              <Image source={icons.rx} style={{ width: 13, height: 13 }} />
            </View>
          ) : null}
          <Image
            style={styles.carouselImage}
            resizeMode="contain"
            source={{
              uri: imageUrl(item.main_image, `products/${item.id}`, '300x300-'),
            }}
          />
          {/* </View> */}

          <Text
            style={{
              marginTop: SIZES.padding,
              width: '100%',
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              width: '100%',
              color: 'gray',
              ...FONTS.body6,
              marginTop: 5,
            }}>
            {truncate(item.description.replace(/(<([^>]+)>)/gi, ''), 30)}
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
                {item.selling_price}
              </Text>
            </View>
            <AddToCartButton cartData={cartItems} product={item} type="small" />
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingHorizontal: SIZES.padding * 1 }}>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: SIZES.padding * 1.5,
            paddingTop: 5,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.divider }}>
      <View
        style={{
          backgroundColor: COLORS.lightGray,
          paddingTop: 20,
          paddingBottom: 10,
          marginBottom: 10,
        }}>
        <Heading>Hot Products</Heading>
        <View style={styles.container}>{renderMainCategories()}</View>
      </View>
    </SafeAreaView>
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
  carouselImage: {
    width: SIZES.width / 3,
    height: SIZES.height / 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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

export default HotProducts;
