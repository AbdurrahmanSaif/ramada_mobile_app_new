/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import ColorPalette from '../../helpers/colorPalette';
import { forgetPassword, signUp } from '../../actions/customer';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { forgetPasswordOtpCheck } from '../../api/customer';

import { colors } from '../../helpers/colorPalette';

import { setNavabarOptions } from '../../actions/nav';

import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ForgetPassword({ navigation }) {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [otpVerify, setOtpVerify] = useState(false);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(
      setNavabarOptions({
        headerTitle: 'Forgot Password?',
        parentScreen: 'Auth',
      }),
    );
  }, [dispatch]);

  const signUpPress = () => {
    setLoading(true);

    if (!otpVerify) {
      if (phone.length !== 10 || !new RegExp(/^[6-9]\d{9}$/).test(phone)) {
        setErrors({ phone: 'Enter a valid phone number' });
        return;
      }

      dispatch(forgetPassword({ mobile_number: `${phone}` })).then(ack => {
        setLoading(false);
        if (ack) {
          setOtpVerify(true);
        }
      });
    } else {
      forgetPasswordOtpCheck({
        mobile_number: `${phone}`,
        mobile_verification_otp: otp,
      })
        .then(json => {
          setLoading(false);

          showMessage({
            message: `New Password has been sent to your mobile number ${phone}`,
            type: 'success',
            floating: true,
          });

          navigation.navigate('Login');
        })
        .catch(error => {
          setLoading(false);

          if (error.message.indexOf('400') !== -1) {
            showMessage({
              message:
                'OTP is invalid or the mobile number is not registered !',
              type: 'danger',
              floating: true,
            });
          } else {
            showMessage({
              message: 'Something went wrong! Please try again!',
              type: 'danger',
              floating: true,
            });
          }
        });
    }
  };

  const resendOtp = () => {
    dispatch(forgetPassword({ mobile_number: `${phone}` })).then(ack => {
      setLoading(false);
      if (ack) {
        setOtpVerify(true);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Image
        source={require('../../assets/images/logo-main.png')}
        resizeMode="contain"
        style={styles.logo}
      />

      {otpVerify ? (
        <>
          <Text style={styles.headerText}>OTP Verification</Text>
          <OTPInputView
            style={{
              marginHorizontal: 30,
              marginLeft: 40,
              height: 100,
            }}
            pinCount={6}
            code={otp}
            autoFocusOnLoad
            onCodeChanged={code => {
              setOtp(code);
            }}
            editable
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            keyboardType="number-pad"
          />
          <TouchableOpacity>
            <Text
              style={{ textAlign: 'right', marginTop: 5, marginBottom: 15 }}
              accessibilityRole="link"
              onPress={resendOtp}>
              Resend OTP
            </Text>
          </TouchableOpacity>
          <Button
            title="VERIFY OTP"
            style={styles.button}
            onPress={signUpPress}
            loading={loading}
          />
        </>
      ) : (
        <>
          <Input
            label="Mobile Number"
            textContentType="telephoneNumber"
            placeholder="Enter Mobile number"
            value={phone}
            keyboardType="numeric"
            leftIcon={{
              type: 'font-awesome',
              name: 'mobile',
              color: ColorPalette.inactive,
            }}
            onChangeText={value =>
              (value === '' || (value.length <= 10 && /^\d+$/.test(value))) &&
              setPhone(value)
            }
            errorStyle={{ color: 'red' }}
            errorMessage={errors.phone}
            labelStyle={{ color: colors.primary, textAlign: 'center' }}
            inputContainerStyle={styles.inputContainerStyle}
          />
          <Button
            title="Send OTP"
            containerStyle={styles.button}
            onPress={signUpPress}
            loading={loading}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 220,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  button: {
    width: 120,
  },
  inputContainerStyle: {
    elevation: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: 'gray',
    color: 'gray',
  },

  underlineStyleHighLighted: {
    borderColor: ColorPalette.primary,
    color: ColorPalette.primary,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: ColorPalette.primary,
    marginBottom: 20,
  },
});
