/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { colors } from '../../helpers/colorPalette';
import { login, sendLoginOtp } from '../../actions/customer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ColorPalette from '../../helpers/colorPalette';
import { setNavabarOptions } from '../../actions/nav';
import { showMessage } from 'react-native-flash-message';
import ResendOtp from '../ResendOtp';
import { useIsFocused } from '@react-navigation/native';

export default function LoginOld({ navigation }) {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [otp, setOtp] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setOtpVerify(false);
      dispatch(
        setNavabarOptions({
          headerTitle: 'Login/Sign Up',
          parentScreen: 'Auth',
        }),
      );
    }
  }, [dispatch, isFocused]);

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

  const handleOTPSubmit = useCallback(
    async e => {
      e.preventDefault();

      if (otp.length === 0) {
        showMessage({
          message: 'Pls enter OTP!',
          type: 'danger',
          floating: true,
        });
      }

      setLoading(true);

      if (otp.length < 6) {
        showMessage({
          message: 'Invalid OTP!',
          type: 'danger',
          floating: true,
        });
      }

      dispatch(login({ mobile_number: `${phone}`, otp }))
        .then(async json => {
          setLoading(false);

          if (json?.customer?.id) {
            navigation.navigate('Home');
            showMessage({
              message: 'Login Successful',
              type: 'success',
              floating: true,
            });
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    },
    [dispatch, otp, phone, navigation],
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Image
        source={require('../../assets/images/logo-main.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      {otpVerify ? (
        <>
          <Text style={styles.headerText}>OTP Verification</Text>
          <Text style={{ fontSize: 12, fontWeight: 'normal' }}>
            Enter the OTP sent on{' '}
            <Text style={{ fontWeight: 'bold' }}>{phone}</Text>
          </Text>
          <OTPInputView
            style={{
              marginHorizontal: 30,
              marginLeft: 40,
              height: 100,
            }}
            pinCount={6}
            code={otp}
            autoFocusOnLoad={false}
            onCodeChanged={code => {
              setOtp(code);
            }}
            editable={true}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // keyboardType="number-pad"
          />
          {resendLoading ? (
            <ActivityIndicator color={ColorPalette.primary} />
          ) : (
            <ResendOtp
              maxTime={5}
              phone={phone}
              resendLoading={resendLoading}
              setResendLoading={setResendLoading}
            />
          )}

          {otp.length > 5 ? (
            <Button
              title="VERIFY OTP"
              style={styles.button}
              containerStyle={{
                ...styles.button,
                width: 150,
                marginTop: 10,
                marginBottom: 5,
              }}
              onPress={handleOTPSubmit}
              loading={loading}
            />
          ) : null}
          <Pressable onPress={() => setOtpVerify(false)}>
            <Text style={{ marginTop: 10, fontSize: 13 }}>Login/Sign up</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={{ paddingHorizontal: 40, width: '100%' }}>
            <Input
              label="Mobile Number"
              textContentType="telephoneNumber"
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="Enter Mobile number"
              value={phone}
              keyboardType="numeric"
              leftIcon={{
                type: 'font-awesome',
                name: 'mobile',
                color: colors.primary,
              }}
              onChangeText={value =>
                (value === '' || (value.length <= 10 && /^\d+$/.test(value))) &&
                setPhone(value)
              }
              errorStyle={{ color: 'red' }}
              errorMessage={errors.phone}
              labelStyle={{ color: colors.primary, textAlign: 'center' }}
            />

            <Button
              title="Send OTP"
              containerStyle={{
                ...styles.button,
                width: 150,
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={handleSendOtp}
              loading={loading}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  button: {
    borderRadius: 30,
    width: 120,
    alignSelf: 'center',
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
