import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import ColorPalette from '../../helpers/colorPalette';
import { forgetPassword, signUp, verifyOtp } from '../../actions/customer';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { setNavabarOptions } from '../../actions/nav';
import { colors } from '../../helpers/colorPalette';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisiblility, setPasswordVisibility] = useState('');
  const [confirmPasswordVisibility, setCPVisibility] = useState('');
  const [otpVerify, setOtpVerify] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const profile = useSelector(state => state.auth.profile);
  const profileError = useSelector(state => state.auth.errors);

  useEffect(() => {
    dispatch(
      setNavabarOptions({ headerTitle: 'Register', parentScreen: 'Auth' }),
    );
  }, [dispatch]);

  const signUpPress = () => {
    // const { params } = route;
    if (!otpVerify && !profile.mobile_number) {
      if (phone.length !== 10 || !new RegExp(/^[6-9]\d{9}$/).test(phone)) {
        setErrors({ phone: 'Enter a valid phone number' });
        return;
      }

      if (password.length < 6) {
        setErrors({
          password: 'The password should be atleast of 6 characters!',
        });
        return;
      }

      if (confirmPassword.length < 6 || confirmPassword !== password) {
        setErrors({ confirmPassword: 'Must be same as your password' });
        return;
      }

      setLoading(true);

      dispatch(signUp({ mobile_number: phone, password })).then(ack => {
        setLoading(false);
        if (ack) {
          setOtpVerify(true);
        }
      });
    } else {
      if (otp !== '' && otp.length === 6) {
        setErrors({ ...errors, otp: null });
        setLoading(true);

        return dispatch(
          verifyOtp({ mobile_number: phone, mobile_verification_otp: otp }),
        ).then(ack => {
          setLoading(false);

          if (ack) {
            navigation.navigate('Login');
          } else {
            setErrors({
              ...errors,
              otp: 'Something went wrong! please try again!',
            });
          }
        });
      } else {
        setErrors({ ...errors, otp: 'Please enter the otp correctly' });
      }
    }
  };

  const resendOtp = () => {
    dispatch(forgetPassword({ mobile_number: phone })).then(ack => {
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
          <Text
            style={{ textAlign: 'right', marginTop: 5, marginBottom: 15 }}
            accessibilityRole="link"
            onPress={resendOtp}>
            Resend OTP
          </Text>
          <Button
            title="VERIFY OTP"
            containerStyle={styles.button}
            onPress={signUpPress}
          />
        </>
      ) : (
        <>
          <Input
            label="Mobile Number"
            textContentType="telephoneNumber"
            placeholder="Enter Mobile number"
            inputContainerStyle={styles.inputContainerStyle}
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
          />
          <Input
            label="Password"
            inputContainerStyle={styles.inputContainerStyle}
            textContentType="password"
            placeholder="Enter a new Password"
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: ColorPalette.inactive,
            }}
            secureTextEntry={passwordVisiblility ? false : true}
            value={password}
            labelStyle={{ color: colors.primary, textAlign: 'center' }}
            onChangeText={val => setPassword(val)}
            rightIcon={() => (
              <Icon
                color={ColorPalette.inactive}
                size={25}
                type="font-awesome"
                name={passwordVisiblility ? 'eye' : 'eye-slash'}
                onPress={() => setPasswordVisibility(!passwordVisiblility)}
              />
            )}
            errorMessage={errors.password}
          />

          <Input
            label="Confirm Password"
            textContentType="password"
            placeholder="Confirm Password"
            inputContainerStyle={styles.inputContainerStyle}
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: ColorPalette.inactive,
            }}
            secureTextEntry={confirmPasswordVisibility ? false : true}
            value={confirmPassword}
            labelStyle={{ color: colors.primary, textAlign: 'center' }}
            onChangeText={val => setConfirmPassword(val)}
            rightIcon={() => (
              <Icon
                color={ColorPalette.inactive}
                size={25}
                type="font-awesome"
                name={confirmPasswordVisibility ? 'eye' : 'eye-slash'}
                onPress={() => setCPVisibility(!confirmPasswordVisibility)}
              />
            )}
            errorMessage={errors.confirmPassword}
          />
          <Button
            title="Sign Up"
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
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: ColorPalette.inactive,
    color: ColorPalette.inactive,
  },
  inputContainerStyle: {
    elevation: 1,
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 40,
  },
  underlineStyleHighLighted: {
    borderColor: ColorPalette.primary,
    color: ColorPalette.primary,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: ColorPalette.primary,
  },
});
