/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, icons } from '../../constants';

export default function InnerHeader({ navigation, hideTopIcons }) {
  const onBackPress = () => {
    navigation.goBack();
  };
  const { headerTitle } = useSelector(state => state.nav);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <View style={styles.header}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={onBackPress}>
          <Image style={{ width: 20, height: 20 }} source={icons.back} />
        </TouchableOpacity>
        {!headerTitle || headerTitle.toLowerCase() === 'home' ? (
          <View />
        ) : (
          <Text style={{ ...FONTS.body3, marginLeft: 20 }}>{headerTitle}</Text>
        )}
      </View>
      <View style={styles.icons}>
        {hideTopIcons || (
          <TouchableOpacity onPress={() => navigation.navigate('SearchStack')}>
            <Image source={icons.search} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
        )}
        {hideTopIcons || (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{ position: 'relative' }}>
            <View style={styles.IconBadge}>
              <Text style={{ color: '#fff', fontSize: 10 }}>{cartCount}</Text>
            </View>
            <Image
              source={icons.shoppingCart}
              style={{
                width: 20,
                height: 20,
                marginLeft: 20,
                marginRight: 5,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  inner: {
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row',
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
  image: {
    width: '100%',
    marginTop: 10,
    height: 230,
    borderRadius: 6,
  },
});
