/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';
import { COLORS, FONTS, icons } from '../../constants';
import { logout } from '../../actions/customer';
import { showMessage } from 'react-native-flash-message';

export default function Account({ navigation }) {
  const customerDetails = useSelector(state => state.auth.profile);
  const authToken = useSelector(state => state.auth.authToken);

  console.log('customerDetails::', customerDetails);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'NO',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          dispatch(logout());
          showMessage({
            message: 'Logged out successfully!',
            type: 'success',
            floating: true,
          });
        },
      },
    ]);
  };
  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'My Profile' }));
    }
  }, [dispatch, isFocused]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <View>
          <Text style={{ ...FONTS.body2 }}>
            Hi, {customerDetails.name ? customerDetails.name : 'there'}
          </Text>
          {customerDetails?.email ? (
            <Text>{customerDetails?.email}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('ProfileForm')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.user}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text>My Profile</Text>
          </View>
          <Image source={icons.next} style={{ width: 16, height: 15 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('Orders')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.clipboard}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text>My Orders</Text>
          </View>
          <Image source={icons.next} style={{ width: 16, height: 15 }} />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.list}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.placeholder}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text>My Addresses</Text>
          </View>
          <Image source={icons.next} style={{ width: 16, height: 15 }} />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('PoliciesPage')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.policy}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text>Polices</Text>
          </View>
          <Image source={icons.next} style={{ width: 16, height: 15 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('AboutUsPage')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.info}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text>About us</Text>
          </View>
          <Image source={icons.next} style={{ width: 16, height: 15 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('ContactUs')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.contactMail}
              style={{
                width: 21,
                height: 21,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text>Contact Us</Text>
          </View>
          <Image source={icons.next} style={{ width: 16, height: 15 }} />
        </TouchableOpacity>

        {authToken ? (
          <TouchableOpacity style={styles.list} onPress={onLogout}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.logout}
                style={{
                  width: 17,
                  height: 17,
                  tintColor: COLORS.primary,
                  marginRight: 8,
                  marginLeft: 3,
                }}
              />
              <Text>Log out</Text>
            </View>
            <Image source={icons.next} style={{ width: 16, height: 15 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate('Login')}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.logout}
                style={{
                  width: 17,
                  height: 17,
                  tintColor: COLORS.primary,
                  marginRight: 8,
                  marginLeft: 3,
                }}
              />
              <Text>Login</Text>
            </View>
            <Image source={icons.next} style={{ width: 16, height: 15 }} />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.lightGray4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  body: {
    backgroundColor: COLORS.lightGray4,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  list: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 18,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
});
