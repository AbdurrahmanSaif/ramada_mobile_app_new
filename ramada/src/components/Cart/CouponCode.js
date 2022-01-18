import React, { useCallback, useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';
import { getCouponCodeList } from '../../api/items';
import { showMessage } from 'react-native-flash-message';
import { getToken } from '../../helpers/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CouponCode({ navigation, customer }) {
  const [couponList, setCouponList] = useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    getCouponCodeList()
      .then(function (response) {
        setCouponList(response);
      })
      .catch(function (error) {
        showMessage({
          message: error,
          type: 'danger',
          floating: true,
        });
      });
  }, []);

  let couponCodeValue = couponList.find(
    code => code.coupon_code === inputValue,
  );

  const onInputApply = useCallback(async () => {
    const token = await getToken('authToken');

    if (token && customer?.id) {
      if (inputValue === '') {
        setCouponError('enter promo code');
        return false;
      }
      if (inputValue === couponCodeValue?.coupon_code) {
        AsyncStorage.setItem('couponCode', inputValue);
      } else {
        setCouponError('This coupon is not valid at the moment.');
      }
    } else {
      navigation.navigate('Login', 'navigation');
    }
  }, [inputValue, couponCodeValue, customer?.id, navigation]);

  return (
    <>
      <View style={{ position: 'relative' }}>
        <Input
          textContentType="none"
          placeholder="Promo Code"
          value={inputValue}
          onChangeText={setInputValue}
          inputContainerStyle={styles.inputContainerStyle}
          style={styles.inputBox}
        />
        {couponError ? (
          <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>
            {couponError}
          </Text>
        ) : null}
        <TouchableOpacity style={styles.btn} onPress={onInputApply}>
          <Text style={{ color: COLORS.white }}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: 0,
    padding: 0,
    fontSize: 14,
    paddingRight: 10,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
  },
  inputContainerStyle: {
    borderColor: '#eeee',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: -25,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 90,
    height: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    top: 20,
  },
});
