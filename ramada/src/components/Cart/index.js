/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/cart';
import { setNavabarOptions } from '../../actions/nav';
import colorPalette from '../../helpers/colorPalette';
import Cartitem from './CartItem';
import { ScrollView } from 'react-native-gesture-handler';
import { getToken } from '../../helpers/storage';
import InnerHeader from '../InnerHeader';
import { COLORS, icons, images, SIZES } from '../../constants';
import { TouchableOpacity } from 'react-native';
import CouponCode from './CouponCode';
import { Keyboard } from 'react-native';
import { prescriptionRequired } from '../../helpers/common';

const Cart = ({ route, navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const customer = useSelector(state => state.auth.profile);

  const [prescriptionRequiredList, setPrescriptionRequiredList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Cart Items' }));
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (route.params) {
      const { item, quantity } = route.params;
      dispatch(addItemToCart({ ...item, quantity }));
    }
  }, [route, dispatch]);

  const totalPrice = () => {
    return cartItems.reduce(
      (acc, item) => item.selling_price * item.quantity + acc,
      0,
    );
  };

  // checking that how many items requires prescription.
  useEffect(() => {
    let presList = [];

    console.log('presList::', presList);

    if (cartItems && cartItems) {
      cartItems.forEach(cartItem => {
        let required = prescriptionRequired(cartItem);
        if (required) {
          presList.push(cartItem);
        }
      });
    }

    setPrescriptionRequiredList(presList);
  }, [cartItems]);

  const [showTab, setShowTab] = useState(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowTab(false);
  };

  const _keyboardDidHide = () => {
    setShowTab(true);
  };

  const proceed = useCallback(async () => {
    const token = await getToken('authToken');

    if (token && customer?.id) {
      if (prescriptionRequiredList.length > 0) {
        navigation.navigate('Attachment');
      } else {
        navigation.navigate('Shipping');
      }
    } else {
      navigation.navigate('Login', 'navigation');
    }
  }, [navigation, prescriptionRequiredList.length, customer?.id]);

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <InnerHeader navigation={navigation} hideTopIcons={true} />

      {cartItems.length === 0 && (
        <Image
          source={images.emptyCart}
          resizeMode="cover"
          style={{
            width: SIZES.width,
            height: '100%',
          }}
        />
      )}
      <ScrollView style={{ backgroundColor: COLORS.lightGray4 }}>
        {cartItems.length !== 0 && (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id?.toString()}
              renderItem={({ item }) => (
                <Cartitem cartItems={cartItems} item={item} onItemClick={[]} />
              )}
            />
            <CouponCode navigation={navigation} customer={customer} />
          </>
        )}

        {cartItems.length !== 0 && (
          <View
            style={{
              marginTop: 10,
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              backgroundColor: '#fff',
              elevation: 1,
              marginBottom: 30,
            }}>
            <View style={styles.totalPriceContainer}>
              <Text style={{ ...styles.text, color: colorPalette.primary }}>
                Sub Total
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.rupee}
                  style={{ width: 11, height: 11, tintColor: COLORS.black }}
                />
                <Text style={styles.text}>{`${totalPrice().toFixed(2)}`}</Text>
              </View>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={{ ...styles.text, color: colorPalette.primary }}>
                Delivery Charges
              </Text>
              <Text style={styles.textSmall}>(Calculated at next screen)</Text>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={{ ...styles.text, color: colorPalette.primary }}>
                Total Amount
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.rupee}
                  style={{ width: 11, height: 11, tintColor: COLORS.black }}
                />
                <Text style={styles.text}>{totalPrice().toFixed(2)}</Text>
              </View>
            </View>
            <Text style={{ textAlign: 'center', margin: 5, fontSize: 12 }}>
              (Inclusive Of all Taxes)
            </Text>
          </View>
        )}

        {/* <Updatecartmodal
          isVisible={isVisble}
          cartItem={cartItem}
          setVisible={setVisible}
        /> */}
      </ScrollView>

      {showTab && (
        <View style={styles.bottomButton}>
          <View
            style={{
              width: SIZES.width / 4,
            }}>
            <Text style={{ fontSize: 11 }}>Total Amount:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={icons.rupee}
                style={{
                  width: 17,
                  height: 17,
                }}
              />
              <Text style={{ fontSize: 23 }}>{totalPrice().toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={proceed}
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
            <Text style={{ color: '#fff' }}>Proceed To Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  deliveryCharges: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
  },
  totalPriceContainer: {
    // padding: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  textSmall: {
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  image: {
    marginTop: 50,
    width: SIZES.width,
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
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
});
