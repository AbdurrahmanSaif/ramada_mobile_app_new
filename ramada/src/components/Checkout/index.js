/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Text } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions';
import ItemRow from './ItemRow';
import InnerHeader from '../InnerHeader';
import { setNavabarOptions } from '../../actions/nav';
import { COLORS, FONTS, icons } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Checkout({ navigation, route }) {
  const [loading, setLoading] = useState(false);

  const cartItems = useSelector(state => state.cart.items);

  const order = useSelector(state => state.orders.order);

  const shippingAddress = order.order.shipping_details;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const orderData = order.order;

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Checkout' }));
    }
  }, [dispatch, isFocused]);

  return (
    <>
      <InnerHeader navigation={navigation} hideTopIcons={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: COLORS.lightGray4 }}>
          {shippingAddress && (
            <View style={styles.information}>
              <View style={styles.headingSec}>
                <Text style={styles.heading}>Shipping Information</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={icons.write}
                    style={{ width: 18, height: 18 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.address}>
                <View style={styles.addressList}>
                  <Image style={styles.icon} source={icons.user} />
                  <Text>{shippingAddress.contact_person}</Text>
                </View>
                <View style={styles.addressList}>
                  <Image style={styles.icon} source={icons.placeholder} />
                  <Text>{`${shippingAddress.full_address} - ${shippingAddress.pin_code}`}</Text>
                </View>
                <View style={styles.addressList}>
                  <Image style={styles.icon} source={icons.phone} />
                  <Text>{shippingAddress.mobile_number}</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.productSec}>
            <Text style={styles.heading}>Items</Text>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <ItemRow item={item} />}
              keyExtractor={item => item?.id.toString()}
              ListFooterComponent={() => (
                <ActivityIndicator
                  color={COLORS.primary}
                  size={20}
                  animating={loading}
                />
              )}
            />
          </View>
          <View style={styles.amountSec}>
            <View style={styles.totalPriceContainer}>
              <Text style={{ ...styles.text, color: COLORS.primary }}>
                Sub Total
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 10, height: 10 }} source={icons.rupee} />
                <Text style={styles.text}>{orderData.item_amount}</Text>
              </View>
            </View>
            {orderData.coupon_code ? (
              <View style={styles.totalPriceContainer}>
                <Text style={{ ...styles.text, color: COLORS.primary }}>
                  Coupon Discount ({orderData.coupon_code})
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ width: 10, height: 10, tintColor: 'green' }}
                    source={icons.rupee}
                  />
                  <Text style={{ color: 'green' }}>
                    -{orderData.coupon_discount_amount}
                  </Text>
                </View>
              </View>
            ) : null}
            <View style={styles.totalPriceContainer}>
              <Text style={{ ...styles.text, color: COLORS.primary }}>
                Delivery Charges
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 10, height: 10 }} source={icons.rupee} />
                <Text style={styles.textSmall}>
                  {orderData.delivery_charges}
                </Text>
              </View>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={{ ...styles.text, color: COLORS.primary }}>
                Total Amount
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 10, height: 10 }} source={icons.rupee} />
                <Text style={styles.text}>{orderData.total_amount}</Text>
              </View>
            </View>
            <Text style={{ textAlign: 'center', margin: 5, fontSize: 12 }}>
              (Inclusive Of all Taxes)
            </Text>
          </View>

          <PaymentOptions orderData={orderData} navigation={navigation} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  information: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  headingSec: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    ...FONTS.body3,
    fontWeight: '700',
  },
  addressList: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  productSec: {
    // backgroundColor: COLORS.white,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  amountSec: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    // elevation: 1,
    marginBottom: 20,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 6,
  },
  attr: {
    fontWeight: '700',
  },
  values: {
    color: '#666',
  },
  totalPriceContainer: {
    paddingHorizontal: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    alignSelf: 'flex-end',
    borderRadius: 30,
  },
});
