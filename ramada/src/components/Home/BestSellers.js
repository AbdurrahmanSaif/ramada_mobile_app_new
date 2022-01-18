/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    View,
} from 'react-native';
import {COLORS} from '../../constants/theme';
import Heading from './Heading';
import ProductRowBox from '../Products/ProductRowBox';

import { getProductsByLabel } from '../../actions/products';

const BestSellers = ({ navigation }) => {

    let label = 'Featured';

    const dispatch = useDispatch();

    const products = useSelector(state => state.products[label] || []);

    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        dispatch(getProductsByLabel(label));
    }, [dispatch, label]);

    const openProduct = product => {
        navigation.navigate('ProductDetails', { product });
    };

    return (<View style={{backgroundColor: COLORS.divider }}>
        <View style={{paddingVertical: 20, paddingBottom: 80, backgroundColor: COLORS.lightGray}}>
            <Heading>Best Sellers</Heading>

            {products?.map(product => (
                <ProductRowBox key={`hot-product-${product.id}`} cartItems={cartItems} product={product} onPress={openProduct} />
            ))}
        </View>
    </View>);

};

export default BestSellers;

