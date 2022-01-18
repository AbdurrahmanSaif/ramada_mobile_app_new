/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import colors from '../../helpers/colorPalette';
import Swiper from 'react-native-swiper';

import { imageUrl } from '../../helpers/common';
import { getBanners } from '../../actions/banners';
import { COLORS } from '../../constants';

const Banner = ({ navigation }) => {

    const dispatch = useDispatch();
    const banners = useSelector(state => state.banners.data);
    var result = Object.values(banners);

    const onCategoryPress = (categoryId, categoryName) => {
        navigation.navigate('Products', { categoryId, categoryName });
    };

    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch]);


    return <View style={{ backgroundColor: COLORS.divider }}>

        <View style={{position: 'relative', backgroundColor: COLORS.lightGray4, paddingVertical: 10, paddingBottom: 30, marginBottom: 10}}>
            <Swiper
                loadMinimal
                loadMinimalSize={3}
                style={{ height: 170, borderRadius: 5 }}
                autoplay
                autoplayTimeout={5}
                loadMinimalLoader={
                    <ActivityIndicator size="large" color={COLORS.primary} />
                }
                activeDotStyle={{ width: 20, backgroundColor: COLORS.primary, marginBottom: -75 }}
                dotStyle={{ backgroundColor: COLORS.divider, marginBottom: -75 }}
                buttonWrapperStyle={{ color: colors.primary, position: 'absolute', left: -50 }}>
                {result.map(item => (
                    <TouchableOpacity
                        key={item.id.toString()}
                        onPress={e => onCategoryPress(item.url, item.name)}
                        style={{
                            backgroundColor: 'white',
                            marginHorizontal: 2,
                            borderRadius: 5,
                        }}>
                        <ImageBackground
                            style={styles.carouselBackground}
                            source={{ uri: imageUrl(item.image, 'banners', '450x150-') }}
                             />
                    </TouchableOpacity>
                ))}
            </Swiper>
        </View>
    </View>;
};


const styles = StyleSheet.create({
    heading: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 10,
        color: '#555',
    },
    theImage: {
        width: 80,
        height: 80,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    listEndItem: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    carouselBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
    itemTitle: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 20,
    },
});

export default Banner;

