/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';
import { checkout } from '../../actions/orders';
import { getCustomerAddress } from '../../actions/customer';
import AddressList from './AddressList';
import AddAddressForm from './AddAddressForm';
import UpdateAddressForm from './UpdateAddressForm';
import { showMessage } from 'react-native-flash-message';
import InnerHeader from '../InnerHeader';
import { COLORS, FONTS, SIZES } from '../../constants';
import Loading from '../../components/Common/Loading';

export default function Shipping({ navigation }) {
  const cartItems = useSelector(state => state.cart.items);

  // const customerDetails = useSelector(state => state.auth.profile);

  // console.log('customerDetails::', customerDetails);

  const cutomerAddress = useSelector(state => state.auth.address);

  const [currentComponent, setCurrentComponent] = useState('AddressList');
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedTab, setSelectedTab] = useState('Home');
  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // console.log('selectedAddress::', selectedAddress.id);

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Select Address' }));
    }
  }, [dispatch, isFocused]);

  // AddressList
  // AddAddressForm
  // UpdateAddressForm

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getCustomerAddress()).then(ack => setLoading(false));
  // }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getCustomerAddress()).then(ack => setLoading(false));
  }, [dispatch]);

  const handleCheckout = () => {
    setSubmitting(true);

    dispatch(
      checkout({
        customer: {
          name: selectedAddress.contact_person,
          address_id: selectedAddress.id,
        },
        customer_remarks: '',
        attachments: '',
        items: cartItems.map(({ id, quantity }) => ({
          item_id: id,
          quantity,
        })),
        coupon_code: '',
      }),
    )
      .then(response => {
        setSubmitting(false);
        navigation.navigate('Checkout', { order: response });
      })
      .catch(error => {
        setSubmitting(false);
        if (error?.data?.message) {
          showMessage({
            message: error.data.message,
            type: 'danger',
            floating: true,
          });
        } else {
          showMessage({
            message: JSON.stringify(error),
            type: 'danger',
            floating: true,
          });
        }
      });
  };

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <InnerHeader navigation={navigation} hideTopIcons={true} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.scrollView}>
              {currentComponent === 'AddressList' ? (
                <>
                  <TouchableOpacity
                    onPress={() => setCurrentComponent('AddAddressForm')}
                    style={{
                      paddingVertical: 14,
                      width: SIZES.width - 20,
                      // backgroundColor: COLORS.primary,
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 15,
                    }}>
                    <Text style={{ color: COLORS.primary }}>
                      + Add a new Address
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      ...FONTS.body3,
                      paddingLeft: 10,
                      marginBottom: 15,
                      fontWeight: '700',
                      letterSpacing: 0.5,
                    }}>
                    Deliver To
                  </Text>
                  <AddressList
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    setCurrentComponent={setCurrentComponent}
                  />
                </>
              ) : null}
              {currentComponent === 'AddAddressForm' ? (
                <AddAddressForm
                  setCurrentComponent={setCurrentComponent}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              ) : null}
              {currentComponent === 'UpdateAddressForm' ? (
                <UpdateAddressForm
                  selectedAddress={selectedAddress}
                  setCurrentComponent={setCurrentComponent}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              ) : null}

              {cutomerAddress?.length === 0 &&
              currentComponent === 'AddressList' ? (
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 200,
                    paddingHorizontal: 20,
                  }}>
                  You don't have any address here, add a new address to
                  continue.
                </Text>
              ) : null}

              {currentComponent === 'AddressList' ? (
                <View style={{ alignItems: 'center', marginBottom: 0 }}>
                  {cutomerAddress?.length === 0 ? (
                    <TouchableOpacity
                      onPress={() => setCurrentComponent('AddAddressForm')}
                      style={{
                        paddingVertical: 18,
                        width: SIZES.width - 50,
                        backgroundColor: COLORS.primary,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: 20,
                      }}>
                      <Text style={{ color: '#fff' }}>+ Add a new Address</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
            </View>
          </ScrollView>

          {selectedAddress?.id && currentComponent === 'AddressList' ? (
            <View style={styles.bottomButton}>
              {submitting ? (
                <View
                  onPress={handleCheckout}
                  style={{
                    paddingVertical: 18,
                    width: SIZES.width - 30,
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  {/* <Text style={{ color: '#fff' }}>Submitting...</Text> */}
                  <ActivityIndicator color="#ffff" size={22} />
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={handleCheckout}
                    style={{
                      paddingVertical: 18,
                      width: SIZES.width - 30,
                      backgroundColor: COLORS.primary,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={{ color: '#fff' }}>Continue</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: COLORS.lightGray4,
  },
  addressContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    paddingBottom: 15,
    alignItems: 'center',
  },
  editButton: {
    borderRadius: 30,
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
