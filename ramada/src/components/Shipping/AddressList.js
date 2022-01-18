/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import colors from '../../helpers/colorPalette';

import radioOn from '../../../src/assets/images/radio-on.png';
import radioOff from '../../../src/assets/images/radio-off.png';
import { COLORS, FONTS, icons } from '../../constants';
import { useState } from 'react';
import { deleteShippingAddress } from '../../api/customer';
import { useDispatch } from 'react-redux';
import { getCustomerAddress } from '../../actions/customer';
import { showMessage } from 'react-native-flash-message';

export default function AddressList({
  selectedAddress,
  setSelectedAddress,
  setCurrentComponent,
}) {
  const customerAddress = useSelector(state => state.auth.address);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const dispatch = useDispatch();

  const {
    address_type,
    address_name,
    contact_person,
    full_address,
    mobile_number,
    pin_code,
    additional_phone_number,
    landmark,
  } = selectedAddress;
  const addressId = selectedAddress.id;

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

  const addressDelete = () => {
    let err = {};
    setErrors(err);

    setLoadingDelete(true);
    deleteShippingAddress(customer, addressId)
      .then(() => {
        dispatch(getCustomerAddress()).then(ack => {
          setCustomer(initialState);
          showMessage({
            message: 'Address deleted successfully.',
            type: 'success',
            floating: true,
          });
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
        setLoadingDelete(false);
      });
  };

  // by default checking the last used address
  useEffect(() => {
    let defaultAddress = customerAddress.find(addr => addr.is_default === 1);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [customerAddress, setSelectedAddress]);

  return customerAddress.map(address => (
    <TouchableOpacity
      style={styles.addressContainer}
      key={address.id}
      onPress={e => {
        setSelectedAddress(address);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{ width: '85%' }}>
          <Text style={{ fontSize: 16, paddingBottom: 3 }}>
            {address.address_name}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>
            {address.contact_person}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>
            {address.full_address}
          </Text>
        </View>
        <Image
          source={selectedAddress?.id === address.id ? radioOn : radioOff}
          style={{ width: 22, height: 22 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        }}>
        <TouchableOpacity style={styles.remove} onPress={addressDelete}>
          <Image source={icons.trash} style={styles.icon} />
          <Text style={{ ...FONTS.body5 }}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={e => {
            setSelectedAddress(address);
            setCurrentComponent('UpdateAddressForm');
          }}
          style={styles.edit}>
          <Image source={icons.write} style={styles.icon} />
          <Text style={{ ...FONTS.body5 }}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  addressContainer: {
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  remove: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 13,
    height: 13,
    marginRight: 4,
  },
});
