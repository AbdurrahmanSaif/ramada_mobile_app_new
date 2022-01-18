/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Animated, { Easing, Value } from 'react-native-reanimated';
import { COLORS, images } from '../../../constants';

const LoadingScreen = () => {
  const [fadeVal] = useState(new Value(1));

  const fading = () => {
    Animated.timing(fadeVal, {
      toValue: 0.1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => {
      Animated.timing(fadeVal, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }).start();
    });
  };

  useEffect(() => {
    const intervalRef = setInterval(() => {
      fading();
    }, 2400);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
      }}>
      <Image style={{ width: 35, height: 35 }} source={images.loader} />
    </View>
  );
};

export default LoadingScreen;
