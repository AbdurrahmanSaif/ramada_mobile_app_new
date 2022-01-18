import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItemToCart } from '../../actions/cart';
import { updateProfile } from '../../actions/customer';
import colorPalette from '../../helpers/colorPalette';

export default function Updatecartmodal({ isVisible, cartItem, setVisible }) {
  const cartItems = useSelector(state => state.cart.items);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem]);

  const updateCart = () => {
    const newItems = cartItems.map(item =>
      cartItem.id === item.id ? { ...cartItem, quantity } : cartItem,
    );
    dispatch(updateProfile({ cart_data: JSON.stringify(newItems) }));
    dispatch(updateItemToCart({ item: { ...cartItem, quantity } }));
    setVisible(false);
  };

  const onRemoveItem = () => {
    const newItems = cartItems.filter(item => cartItem.id !== item.id);
    dispatch(updateProfile({ cart_data: JSON.stringify(newItems) }));
    dispatch(removeItem({ item: { ...cartItem, quantity } }));
    setVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: '#00000066' }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text h4 h4Style={{ color: colorPalette.primary }}>
              {cartItem.name}
            </Text>
            <Icon
              type="ionicon"
              name="close-outline"
              onPress={() => setVisible(false)}
            />
          </View>
          <View
            style={{ marginTop: 5, marginBottom: 10, alignItems: 'center' }}>
            <Text style={{ marginBottom: 5, color: '#666' }}>No of items</Text>
            {quantity && (
              <NumericInput
                value={quantity}
                onChange={v => setQuantity(v)}
                rounded
              />
            )}
          </View>

          <View
            style={{ marginTop: 5, marginBottom: 10, alignItems: 'center' }}>
            <Text style={{ marginBottom: 5, color: colorPalette.primary }}>
              {`Price : ${parseFloat(cartItem.selling_price * quantity).toFixed(
                2,
              )}`}
            </Text>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Button title="Update Cart" onPress={updateCart} />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Button
              title="Remove from cart"
              type="clear"
              onPress={onRemoveItem}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    height: 300,
    elevation: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  updateButton: { margin: 8, backgroundColor: colorPalette.primary },
});
