/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';
import { addAddress } from '../../api/customer';
import { showMessage } from 'react-native-flash-message';
import { getCustomerAddress } from '../../actions/customer';
import colorPalette from '../../helpers/colorPalette';
import { COLORS, FONTS, SIZES } from '../../constants';

export default function AddAddressForm({
  setCurrentComponent,
  selectedTab,
  setSelectedTab,
}) {
  // const cartItems = useSelector(state => state.cart.items);

  const {
    address_type,
    address_name,
    contact_person,
    full_address,
    mobile_number,
    pin_code,
    additional_phone_number,
    landmark,
  } = useSelector(state => state.auth.profile);

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const initialState = {
    address_type: address_type || 'home',
    address_name: address_name || '',
    contact_person: contact_person || '',
    full_address: full_address || '',
    landmark: landmark || '',
    mobile_number:
      (mobile_number?.length === 12
        ? mobile_number?.slice(2)
        : mobile_number) || '',
    pin_code: pin_code || '202001',
    additional_phone_number: additional_phone_number?.slice(2) || '',
  };
  const [customer, setCustomer] = useState(initialState);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Add Address' }));
    }
  }, [dispatch, isFocused]);

  const submitForm = () => {
    let err = {};

    setErrors(err);

    if (!customer.mobile_number) {
      err.mobile_number = 'Mobile number is required';
    }
    if (!customer.contact_person) {
      err.name = 'Name is required';
    }
    if (!customer.pin_code) {
      err.pin_code = 'Pin Code is required';
    }
    if (!customer.full_address) {
      err.full_address = 'Enter your full Address';
    }

    if (customer.pin_code) {
      // TODO: pin code validation by checking settings.

      let allowedPincodes = [202001, 202002];

      if (!allowedPincodes.includes(parseInt(customer.pin_code, 10))) {
        err.pin_code =
          'The given Pin Code is is not supported as of now. We are only delivering in Aligarh.';
      }
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    setLoading(true);
    addAddress(customer)
      .then(() => {
        dispatch(getCustomerAddress()).then(ack => {
          setCustomer(initialState);
          showMessage({
            message: 'Address added successfully.',
            type: 'success',
            floating: true,
          });
          // navigation.navigate('Shipping');
          setCurrentComponent('AddressList');
        });
      })
      .catch(_err => {
        showMessage({
          message: 'Error occurred, please try again later.',
          type: 'danger',
          floating: true,
        });
      })
      .finally(() => {
        setLoading(false);
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
    <View>
      <Input
        editable={true}
        label="Address Name"
        textContentType="telephoneNumber"
        placeholder="Enter address name"
        value={customer.address_name}
        onChangeText={value => onChangeValue('address_name', value)}
        errorStyle={{ color: 'red' }}
        errorMessage={errors.address_name}
        style={styles.inputBox}
        labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <Input
        editable={true}
        label="Mobile Number*"
        textContentType="telephoneNumber"
        placeholder="Enter Mobile number"
        value={customer.mobile_number}
        keyboardType="phone-pad"
        onChangeText={value => onChangeValue('mobile_number', value)}
        errorStyle={{ color: 'red' }}
        errorMessage={errors.mobile_number}
        style={styles.inputBox}
        labelStyle={{ paddingTop: 0, marginLeft: 3, ...FONTS.body4 }}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <Input
        label="Name*"
        textContentType="name"
        placeholder="Enter Your Full Name"
        value={customer.contact_person}
        onChangeText={value => onChangeValue('contact_person', value)}
        errorStyle={{ color: 'red' }}
        errorMessage={errors.name}
        style={styles.inputBox}
        labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <Input
        label="Full Address*"
        textContentType="fullStreetAddress"
        placeholder="Enter Your Full address"
        value={customer.full_address}
        onChangeText={value => onChangeValue('full_address', value)}
        numberOfLines={2}
        multiline={true}
        errorStyle={{ color: 'red' }}
        errorMessage={errors.full_address}
        style={styles.inputBox}
        labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <Input
        label="Pin Code*"
        textContentType="postalCode"
        placeholder="Enter your Pin Code"
        value={customer.pin_code}
        keyboardType="numeric"
        onChangeText={value => onChangeValue('pin_code', value)}
        errorStyle={{ color: 'red' }}
        errorMessage={errors.pin_code}
        style={styles.inputBox}
        labelStyle={{ marginLeft: 3, ...FONTS.body4 }}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <View style={styles.btnSec}>
        <TouchableOpacity
          onPress={submitForm}
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
            <Text style={{ color: '#fff' }}>Save Address</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 8,
    paddingBottom: 50,
  },
  addTypeSec: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  btnSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
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
  listcontainer: {
    paddingHorizontal: 10,
    paddingBottom: 13,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  listTab: {
    flexDirection: 'row',
    marginTop: 15,
  },
  btnTab: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexDirection: 'row',
    backgroundColor: '#86939e',
  },
  textTab: {
    fontSize: 16,
    marginLeft: 4,
    color: 'white',
  },
  btnTabActive: {
    backgroundColor: colorPalette.primary,
  },
});
