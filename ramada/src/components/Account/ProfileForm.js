/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../actions/customer';
import { setNavabarOptions } from '../../actions/nav';

import { showMessage } from 'react-native-flash-message';
import InnerHeader from '../InnerHeader';
import { COLORS, FONTS, SIZES } from '../../constants';

export default function ProfileForm({ navigation }) {
  const { id, name, address, mobile_number, pin_code } = useSelector(
    state => state.auth.profile,
  );
  const [customer, setCustomer] = useState({
    name: name || '',
    address: address || '',
    mobile_number:
      (mobile_number?.length === 12
        ? mobile_number?.slice(2)
        : mobile_number) || '',
    // city: city || '',
    // country: country || 'India',
    // state: state || '',
    pin_code: pin_code || '',
    // additional_phone_number: additional_phone_number?.slice(2) || ''
  });
  const [remarks, setRemarks] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Update Profile' }));
    }
  }, [dispatch, isFocused]);

  const updateCustomerDetails = () => {
    setLoading(true);
    let err = {};

    Object.keys(customer).forEach(key => {
      if (customer[key] === '') {
        err = { ...err, [key]: `${key.replaceAll('_', ' ')} is required` };
        setErrors(err);
      }

      if (
        key === 'mobile_number' &&
        customer[key].length !== 10 &&
        /^\d+$/.test(customer[key])
      ) {
        err = { ...err, [key]: 'Phone number is not valid' };
        setErrors(err);
      }
    });

    if (Object.keys(err).length > 0) {
      setLoading(false);
      return;
    }

    dispatch(updateProfile({ ...customer, id })).then(ack => {
      if (ack) {
        showMessage({
          message: 'Profile updated successfully.',
          type: 'success',
          floating: true,
        });
      } else {
        showMessage({
          message: 'Error while updating the profile. Please try again.',
          type: 'danger',
          floating: true,
        });
        setLoading(false);
      }
    });
  };

  const onChangeValue = (field, value) => {
    if (
      field === 'mobile_number' &&
      (value === '' || (value.length <= 10 && /^\d+$/.test(value)))
    ) {
      setCustomer({ ...customer, [field]: value });
      return;
    } else {
      setCustomer({ ...customer, [field]: value });
    }
  };

  return (
    <>
      <InnerHeader navigation={navigation} hideTopIcons={true} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollView}>
          <Input
            label="Mobile Number*"
            textContentType="telephoneNumber"
            placeholder="Enter Mobile number"
            value={customer.mobile_number}
            keyboardType="phone-pad"
            onChangeText={value => onChangeValue('mobile_number', value)}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.phone}
            style={styles.inputBox}
            labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
            inputContainerStyle={styles.inputContainerStyle}
            disabled
          />

          <Input
            label="Name*"
            textContentType="name"
            placeholder="Enter name"
            value={customer.name}
            onChangeText={value => onChangeValue('name', value)}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.name}
            style={styles.inputBox}
            labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Input
            label="Address*"
            textContentType="streetAddressLine1"
            placeholder="Enter address"
            value={customer.address}
            onChangeText={value => onChangeValue('address', value)}
            numberOfLines={2}
            multiline={true}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.address}
            style={styles.inputBox}
            labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Input
            label="Pin Code*"
            textContentType="postalCode"
            placeholder="Enter zip"
            value={customer.pin_code}
            keyboardType="numeric"
            onChangeText={value => onChangeValue('pin_code', value)}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.pin_code}
            style={styles.inputBox}
            labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Input
            label="Additional Mobile Number"
            textContentType="telephoneNumber"
            placeholder="Enter additional mobile number"
            value={customer.additional_phone_number}
            keyboardType="phone-pad"
            onChangeText={value =>
              onChangeValue('additional_phone_number', value)
            }
            errorStyle={{ color: 'red' }}
            errorMessage={errors.additional_phone_number}
            style={styles.inputBox}
            labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
            inputContainerStyle={styles.inputContainerStyle}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity
          onPress={updateCustomerDetails}
          style={{
            paddingVertical: 18,
            paddingHorizontal: 45,
            backgroundColor: COLORS.primary,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: SIZES.width - 20,
          }}>
          {loading ? (
            <ActivityIndicator color="#ffff" size={22} />
          ) : (
            <Text style={{ color: '#fff' }}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
    backgroundColor: COLORS.lightGray4,
  },
  inputBox: {
    paddingVertical: 0,
    padding: 0,
    fontSize: 14,
    paddingRight: 10,
    alignSelf: 'flex-start',
  },
  inputContainerStyle: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: -10,
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
