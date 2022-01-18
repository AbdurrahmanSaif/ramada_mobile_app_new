/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
} from 'react-native';
import colors from '../../helpers/colorPalette';
import { Text } from 'react-native-elements';
import { imageUrl, truncate } from '../../helpers/common';
import Heading from './Heading';
import { getProductsByLabel } from '../../actions/products';
import AddToCartButton from '../AddToCartButton';

const Exclusive = ({ navigation }) => {

    let label = 'Hot';
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const products = useSelector(state => state.products[label] || []);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        dispatch(getProductsByLabel(label));
    }, [dispatch, label]);

    const openProduct = product => {
        navigation.navigate('ProductDetails', { product });
    };

    return (<View style={{ marginTop: 20 }}>

        <Heading>Hot Products</Heading>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 5, paddingRight: 15 }}
        >
            {products.map(item => (
                <TouchableOpacity key={item.id} onPress={() => openProduct(item)}>
                    <View style={{ width: 270, height: 250, borderRadius: 10, borderWidth: 1, borderColor: '#e7e6e6', overflow: 'visible', marginLeft: 15 }} >
                        <View style={{ flex: 2 }}>
                            <Image
                                style={styles.carouselImage}
                                source={{ uri: imageUrl(item.main_image, `products/${item.id}`, '300x300-') }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.content}>
                                <View style={styles.colBoxLeft}>
                                    <Text
                                        style={styles.itemTitle}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.nameTxt}>
                                        {truncate(item.description.replace(/(<([^>]+)>)/gi, ""), 85)}
                                    </Text>
                                </View>
                                <View style={styles.colBoxRight}>
                                    <Text
                                        style={styles.price}>
                                        Rs.{item.selling_price}
                                    </Text>
                                    <View style={{ alignItems: 'flex-end', marginTop: 9 }}>
                                        <AddToCartButton
                                            type="extraSmall"
                                            cartData={cartItems}
                                            product={item}
                                            quantity={quantity}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>

    </View>);

};


const styles = StyleSheet.create({
    theImage: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    listEndItem: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        width: 150,
        height: 150,
    },
    carouselImage: {
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    nameTxt: {
        fontWeight: '600',
        color: 'gray',
        fontSize: 12,
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
        marginTop: -17,
    },
    colBoxLeft: {
        width: '62%',
    },
    colBoxRight: {
        width: '38%',
        alignItems: 'flex-end',
    },
    price: {
        color: 'red',
    },
    itemTitle: {
        color: 'black',
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 2,
    },
    buttonText: {
        color: colors.white,
        fontSize: 60,
        margin: 10,
        marginBottom: 50,
    },
});

export default Exclusive;

