/* eslint-disable react-native/no-inline-styles */
import { StackActions } from '@react-navigation/native';
import React, { useCallback, useState, useEffect } from 'react';

import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-elements';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import { verifyPayment } from '../../api/orders';

import colors from '../../helpers/colorPalette';

import { UPDATE_CART } from '../../constants/actionTypes';

import RadioForm from 'react-native-simple-radio-button';

import { showMessage } from 'react-native-flash-message';
import { COLORS, FONTS, SIZES } from '../../constants';

export default function PaymentOptions({ navigation }) {
  const [loading, setLoading] = useState(false);

  const order = useSelector(state => state.orders.order);

  const orderData = order.order;
  const orderSettings = order.settings;
  const customer = order.customer;

  const dispatch = useDispatch();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('online-payment');

  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);

  useEffect(() => {
    const paymentMethodOptionsList = [];

    if (orderSettings?.payment_methods?.includes('online-payment')) {
      paymentMethodOptionsList.push({
        label: 'Online Payment',
        value: 'online-payment',
      });
    }

    if (orderSettings?.payment_methods?.includes('cod')) {
      paymentMethodOptionsList.push({ label: 'COD', value: 'cod' });
    }

    setPaymentMethodOptions(paymentMethodOptionsList);
  }, [orderSettings]);

  const handleOnlinePayment = () => {
    var options = {
      description: 'Checkout',
      image: require('../../assets/images/logo.png'),
      currency: 'INR',
      key: 'rzp_test_7ZWQ9b9WBOyxIn',
      amount: parseInt(orderData?.total_amount, 10) * 100,
      name: 'Pillsgo',
      order_id: orderData?.order_id, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        contact: customer.mobile_number,
        name: customer.name,
      },
      theme: { color: colors.primary },
    };

    setLoading(true);

    RazorpayCheckout.open(options)
      .then(async data => {
        let response = await verifyPayment({
          order_id: orderData?.order_id,
          payment_option: 'razorpay',
          payload: data,
        });

        setLoading(false);

        if (response.payment_status === 'Paid') {
          showMessage({
            message: 'Payment done successfully!',
            type: 'success',
            floating: true,
          });
          orderDone();
        } else {
          showMessage({
            message: 'Payment could not be verified!',
            type: 'danger',
            floating: true,
          });
        }
      })
      .then(ack => {
        console.log('ack::', ack);
        setLoading(false);
        // navigation.dispatch(StackActions.replace('OrdersList'));
      })
      .catch(err => {
        console.log('err::', err);
        setLoading(false);
        showMessage({
          message: 'Payment was not successful!',
          type: 'danger',
          floating: true,
        });
      });
  };

  // in case of COD
  const handleCODPayment = useCallback(async () => {
    try {
      setLoading(true);

      const requestBody = {
        order_id: orderData.order_id,
        payment_option: 'COD',
        payload: {},
      };

      let reponse = await verifyPayment(requestBody);

      if (reponse?.payment_status === 'Pending') {
        showMessage({
          message: 'COD Order placed successfully!',
          type: 'success',
          floating: true,
        });
        orderDone();
      } else {
        showMessage({
          message: 'Order failed, please try again later!',
          type: 'danger',
          floating: true,
        });
      }
    } catch (err) {
      showMessage({
        message: 'Order failed, please try again later!',
        type: 'danger',
        floating: true,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [ orderData ]);

  const orderDone = () => {
    dispatch({ type: UPDATE_CART, payload: [] });

    navigation.dispatch(StackActions.replace('Home'));
  };

  const CODButton = (
    <>
      <TouchableOpacity
        onPress={handleCODPayment}
        style={{
          paddingVertical: 18,
          paddingHorizontal: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 20,
          width: SIZES.width - 20,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <Text style={{ color: '#fff' }}>Order Now</Text>
      </TouchableOpacity>
    </>
  );

  const onlinePaymentButton = (
    <>
      <TouchableOpacity
        onPress={handleOnlinePayment}
        style={{
          paddingVertical: 18,
          paddingHorizontal: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 20,
          width: SIZES.width - 20,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <Text style={{ color: '#fff' }}>Pay Now</Text>
      </TouchableOpacity>
    </>
  );

  const loadingButton = (
    <>
      {/* <Button
        disabled={true}
        title="Submitting"
        icon={
          <Icon
            name="autorenew"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
        containerStyle={{
          borderRadius: 30,
          marginHorizontal: 10,
          marginBottom: 20,
          marginTop: 10,
          width: 150,
          alignSelf: 'center',
        }}
      /> */}
      <View
        onPress={handleOnlinePayment}
        style={{
          paddingVertical: 18,
          paddingHorizontal: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 20,
          width: SIZES.width - 20,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <ActivityIndicator color="#ffff" size={22} />
      </View>
    </>
  );

  const changeMethod = method => {
    setSelectedPaymentMethod(method);
  };

  const getButton = () => {
    if (loading) {
      return loadingButton;
    }

    if (selectedPaymentMethod === 'cod') {
      return CODButton;
    }

    return onlinePaymentButton;
  };

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 10,
          borderRadius: 10,
          padding: 8,
        }}>
        <Text style={{ ...FONTS.body3, fontWeight: '700', margin: 5 }}>
          Payment Methods
        </Text>

        <RadioForm
          initial={0}
          radio_props={paymentMethodOptions}
          onPress={value => changeMethod(value)}
          style={{ margin: 10, marginLeft: 5 }}
          animation={true}
          buttonSize={11}
          buttonOuterSize={23}
          buttonColor={COLORS.primary}
          selectedButtonColor={COLORS.primary}
        />
      </View>
      {getButton()}
    </>
  );
}
