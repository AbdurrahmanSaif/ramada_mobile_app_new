import React from 'react';
import PropTypes from 'prop-types';
import UseResendOtp from './UseResendOtp';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { icons } from '../../constants';

function ResendOTP({ renderTime, renderButton, style, className, ...props }) {
  const { remainingTime, handelResendClick } = UseResendOtp(props);

  return (
    <>
      <View style={styles.resend}>
        {remainingTime === 0 ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginRight: 4, fontSize: 15 }}>
              Didn't recieve the OTP?
            </Text>
            <TouchableOpacity onPress={handelResendClick}>
              <Text style={{ fontSize: 15 }}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.timerSec}>
            <Text style={styles.text}>You can resend the OTP in</Text>
            <Image
              source={icons.stopwatch}
              style={{
                width: 15,
                height: 15,
                marginRight: 3,
                marginLeft: 2,
                tintColor: 'white',
              }}
            />
            <Text style={styles.text}>{remainingTime} secs</Text>
          </View>
        )}
      </View>
    </>
  );
}

ResendOTP.defaultProps = {
  maxTime: 30,
  timeInterval: 1000,
  style: {},
};

ResendOTP.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

const styles = StyleSheet.create({
  resend: {
    marginBottom: 15,
  },
  timerSec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
    color: 'white',
  },
});

export default ResendOTP;
