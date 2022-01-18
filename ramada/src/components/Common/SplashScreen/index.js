/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import Animated, { Easing, Value } from 'react-native-reanimated';

const SplashScreen = () => {
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
    }, 5000);

    return () => {
      clearInterval(intervalRef);
    };
  });

  return (
    <>
      <Animated.View style={{ opacity: fadeVal }}>
        <ImageBackground
          source={require('../../../assets/images/splash-screen.jpeg')}
          style={styles.categoryWrapper}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  categoryWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SplashScreen;
