/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Input } from 'react-native-elements';
import { images, COLORS, FONTS, SIZES, icons } from '../../constants';
import { useCallback } from 'react';
import { sendLoginOtp } from '../../actions/customer';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerifyOtp from './VerifyOtp';

export default function Login({ navigation, route }) {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const history = route.params;
  console.log('history::::', history);
  
  useEffect(() => {
    // loading last used phone number
    AsyncStorage.getItem('last_mobile_number').then(value => setPhone(value));
  }, []);

  const handleSendOtp = useCallback(
    async e => {
      e.preventDefault();
      if (phone.length < 10) {
        setErrors('Invalid Mobile Number');
        return false;
      }
      AsyncStorage.setItem('last_mobile_number', phone);

      setErrors('');
      setLoading(true);
      try {
        // sending an otp to the given mobile.
        let response = await sendLoginOtp(phone);
        console.log(response);
        showMessage({
          message: 'An OTP sent to your mobile number',
          type: 'success',
          floating: true,
        });

        setLoading(false);

        setOtpVerify(true);
      } catch (err) {
        setLoading(false);
        showMessage({
          message: err,
          type: 'danger',
          floating: true,
        });
      }
    },
    [phone],
  );
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={images.login_bg}
        resizeMode="cover"
        style={styles.background}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 0, position: 'absolute', top: 50, left: 15 }}>
          <Image source={icons.back} style={styles.back} />
        </TouchableOpacity>
        {otpVerify ? (
          <VerifyOtp navigation={navigation} history={history} phone={phone} />
        ) : (
          <View style={styles.body}>
            <Text style={styles.heading}>Welcome To PillsGo</Text>
            <View style={{ alignItems: 'center' }}>
              <Input
                textContentType="telephoneNumber"
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Mobile number"
                value={phone}
                style={{ color: COLORS.white }}
                keyboardType="numeric"
                placeholderTextColor={COLORS.white}
                onChangeText={value =>
                  (value === '' ||
                    (value.length <= 10 && /^\d+$/.test(value))) &&
                  setPhone(value)
                }
              />
              {errors ? <Text style={styles.error}>{errors}</Text> : null}
              <TouchableOpacity onPress={handleSendOtp} style={styles.btn}>
                {loading ? (
                  <View style={styles.loader}>
                    <Image
                      source={images.loader}
                      style={{ width: 25, height: 25 }}
                    />
                  </View>
                ) : (
                  <Text style={{ color: COLORS.darkgray, ...FONTS.body2 }}>
                    GET OTP
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  background: {
    height: '100%',
    width: '100%',
  },
  back: {
    width: 22,
    height: 22,
    tintColor: COLORS.white,
  },
  body: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.height / 3,
  },
  heading: {
    ...FONTS.body1,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 20,
  },
  inputContainerStyle: {
    marginTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#32aeb0',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: SIZES.width - 40,
  },
  error: {
    color: COLORS.danger,
    marginTop: -10,
    marginBottom: 20,
  },
  btn: {
    width: SIZES.width - 40,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
    position: 'relative',
    minHeight: 50,
  },
  loader: {
    position: 'absolute',
  },
});
