/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';

import { contactUs } from '../../api/contacts';
import colors from '../../helpers/colorPalette';

import { showMessage } from 'react-native-flash-message';
import InnerHeader from '../InnerHeader';
import { COLORS, FONTS, SIZES } from '../../constants';

export default function ContactUs({ navigation }) {
  const { name, email } = useSelector(state => state.auth.profile);

  const initialState = {
    name: name || '',
    email: email || '',
    subject: '',
    message: '',
    captcha_value: 'N/A',
  };

  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(
        setNavabarOptions({ headerTitle: 'Contact Us', foodTab: false }),
      );
    }
  }, [dispatch, isFocused]);

  function validateEmail(emailAddress) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  }

  const submitForm = () => {
    let err = {};

    setErrors(err);

    if (!formData.name) {
      err.name = 'Please enter your name';
    }
    if (!formData.email) {
      err.email = 'Please enter your email address';
    }
    if (!validateEmail(formData.email)) {
      err.email = 'Please enter valid email address';
    }
    if (!formData.subject) {
      err.subject = 'Please enter your subject';
    }
    if (!formData.message) {
      err.message = 'Please enter your message';
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      setLoading(false);
      showMessage({
        message: 'Please check the errors.',
        type: 'danger',
        floating: true,
      });
      return;
    }

    setLoading(true);

    contactUs(formData)
      .then(() => {
        setFormData(initialState);
        showMessage({
          message: 'Message sent successfully.',
          type: 'success',
          floating: true,
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
    setErrors({ ...errors, [field]: null });
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <InnerHeader navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.overlay}>
          <Input
            label="Your Name*"
            textContentType="name"
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={value => onChangeValue('name', value)}
            errorStyle={styles.inlineError}
            errorMessage={errors.name}
            labelStyle={{
              marginLeft: 3,
              ...FONTS.body4,
              color: COLORS.primary,
            }}
            inputContainerStyle={styles.inputContainerStyle}
            style={styles.inputBox}
          />

          <Input
            label="Your Email*"
            textContentType="emailAddress"
            placeholder="Enter your email"
            value={formData.email}
            keyboardType="email-address"
            onChangeText={value => onChangeValue('email', value)}
            errorStyle={styles.inlineError}
            errorMessage={errors.email}
            labelStyle={{
              marginLeft: 3,
              ...FONTS.body4,
              color: COLORS.primary,
            }}
            inputContainerStyle={styles.inputContainerStyle}
            style={styles.inputBox}
          />

          <Input
            label="Subject*"
            textContentType="none"
            placeholder="Enter the subject"
            value={formData.subject}
            onChangeText={value => onChangeValue('subject', value)}
            errorStyle={styles.inlineError}
            errorMessage={errors.subject}
            labelStyle={{
              marginLeft: 3,
              ...FONTS.body4,
              color: COLORS.primary,
            }}
            inputContainerStyle={styles.inputContainerStyle}
            style={styles.inputBox}
          />

          <Input
            label="Your Message*"
            textContentType="none"
            placeholder="Enter your message"
            value={formData.message}
            onChangeText={value => onChangeValue('message', value)}
            numberOfLines={2}
            multiline={true}
            errorStyle={styles.inlineError}
            errorMessage={errors.message}
            labelStyle={{
              marginLeft: 3,
              ...FONTS.body4,
              color: COLORS.primary,
            }}
            inputContainerStyle={styles.inputContainerStyle}
            style={styles.inputBox}
          />

          {/* <Button
            title="Submit"
            loading={loading}
            containerStyle={{ width: 200, alignSelf: 'center' }}
            onPress={submitForm}
          /> */}
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
      <View style={styles.bottomButton}>
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
            <Text style={{ color: '#fff' }}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 50,
    paddingTop: 20,
    backgroundColor: COLORS.lightGray4,
  },
  // overlay: {
  //   backgroundColor: 'rgba(255,255,255,0.7)',
  // },
  inlineError: {
    color: 'red',
    marginBottom: 10,
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
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
  },
});
