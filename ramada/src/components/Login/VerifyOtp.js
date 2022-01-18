/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ResendOtp from '../ResendOtp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { COLORS, FONTS, images, SIZES } from '../../constants';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/customer';

export default function VerifyOtp({ navigation, phone, history }) {
  const [resendLoading, setResendLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

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
            if (history === 'navigation') {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
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
    <View style={styles.body}>
      <Text style={styles.heading}>OTP Verification</Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'normal',
          color: COLORS.white,
          marginTop: 10,
        }}>
        Enter the OTP sent to{' '}
        <Text style={{ fontWeight: 'bold', color: COLORS.lightGray }}>
          {phone}
        </Text>
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

      <TouchableOpacity onPress={handleOTPSubmit} style={styles.btn}>
        {loading ? (
          <View style={styles.loader}>
            <Image source={images.loader} style={{ width: 25, height: 25 }} />
          </View>
        ) : (
          <Text style={{ color: COLORS.darkgray, ...FONTS.body2 }}>
            VERIFY OTP
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        {resendLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <ResendOtp
            maxTime={60}
            phone={phone}
            resendLoading={resendLoading}
            setResendLoading={setResendLoading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.height / 2.2,
  },
  heading: {
    ...FONTS.body1,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 20,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: COLORS.white,
    color: COLORS.white,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.white,
    color: COLORS.white,
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
});
