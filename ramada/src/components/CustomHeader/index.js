/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import colorPalette from '../../helpers/colorPalette';
import { useDispatch } from 'react-redux';
import { getNotifications } from '../../actions/notifications';
import { COLORS, icons } from '../../constants';

const CustomHeader = ({ showBack, navigation, hideTopIcons }) => {
  const { parentScreen } = useSelector(state => state.nav);

  const cartItems = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const showCart = () => {
    navigation.navigate('Cart');
  };

  const cartCount = cartItems.length;


  const onBackPress = () => {
    navigation.popToTop();
    navigation.navigate(parentScreen);
  };

  return (
    <View style={styles.headerContainer}>
      {showBack ? (
        <Icon
          containerStyle={{ paddingLeft: 10 }}
          color="gray"
          type="ionicon"
          size={30}
          name="md-arrow-back"
          onPress={onBackPress}
        />
      ) : (
        <View style={{ ...styles.logoContainer }}>
          <Text style={styles.logoText}>PillsGo</Text>
        </View>
      )}
      <View style={styles.icons}>
        {/* <TouchableOpacity
          style={{ position: 'relative' }}
          onPress={showNotifications}>
          <View style={styles.IconBadge}>
            <Text style={{ color: '#fff', fontSize: 10 }}>{cartCount}</Text>
          </View>
          <Image
            source={icons.notification}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity> */}

        <TouchableOpacity style={{ position: 'relative' }} onPress={showCart}>
          <View style={styles.IconBadge}>
            <Text style={{ color: '#fff', fontSize: 10 }}>{cartCount}</Text>
          </View>
          <Image
            source={icons.shoppingCart}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
              marginLeft: 15,
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  IconBadge: {
    position: 'absolute',
    top: -8,
    right: -2,
    width: 15,
    height: 15,
    backgroundColor: COLORS.danger,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  logoText: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  headerTitle: {
    color: colorPalette.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
  },
  leftButtons: {
    flexDirection: 'row',
  },
  rightButtons: {
    flexDirection: 'row',
  },
});

export default CustomHeader;
