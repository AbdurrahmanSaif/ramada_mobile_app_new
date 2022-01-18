/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { useSelector } from 'react-redux';

import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';

import colors from '../../helpers/colorPalette';

import { Text } from 'react-native-elements';

import { imageUrl } from '../../helpers/common';
import Heading from './Heading';
import { COLORS, FONTS, SIZES } from '../../constants';

const maxWidth = Dimensions.get('window').width;

// this is used to get the percentage width
const percentageWidth = (mWidth, percentage) => (mWidth * percentage) / 100;

const PopularCategories = ({ navigation }) => {

    let categories = useSelector(state => state.categories.mainCategories);

    const onCategoryPress = (categoryId, categoryName) => {
        navigation.navigate('Products', { categoryId, categoryName });
    };

    categories = categories.filter(cat => cat.parent_id !== 0).slice(0, 12);

    return (
    <View style={{backgroundColor: COLORS.divider}}>
        <View style={{ paddingTop: 20, paddingBottom: 10, backgroundColor: COLORS.lightGray4, marginBottom: 10}}>
            <Heading viewAllRoute="Categories" navigation={navigation} >Popular Categories</Heading>

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: 8,
            }} >
                {categories.map(item => (<View key={item.id.toString()} style={[styles.imageBox, styles.shadow]}><TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={e => onCategoryPress(item.id, item.name)}>
                        <Image
                            source={{ uri: imageUrl(item.image, 'categories') }}
                            style={styles.theImage}
                        />
                    <Text style={styles.catItemText}>{item.name}</Text>
                </TouchableOpacity></View>))}
            </View>

        </View>
    </View >);

};

const styles = StyleSheet.create({
    imageBox: {
        marginBottom: percentageWidth(maxWidth, 4),
        marginHorizontal: percentageWidth(maxWidth, 1),
        // borderWidth: 1,
        paddingVertical: 10,
        borderRadius: SIZES.radius / 2,
        backgroundColor: '#ffff',
    },
    theImage: {
        width: percentageWidth(maxWidth, 15),
        height: percentageWidth(maxWidth, 15),
        borderRadius: 8,
        borderWidth: 1,
    },
    catItemText: {
        marginTop: 5,
        width: 80,
        textAlign: 'center',
        color: colors.secondary,
        ...FONTS.body5,
        paddingHorizontal: 4,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
      },
});

export default PopularCategories;

