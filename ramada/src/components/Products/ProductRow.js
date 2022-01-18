/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import colors from '../../helpers/colorPalette';
import { backendUrl } from '../../helpers/common';

const ProductRow = ({
    cartItem,
    product: { id, name, selling_price, reviews, main_image },
    onPress,
}) => {

    return (
        <TouchableOpacity
            style={{ margin: 15, marginBottom: 30 }}
            onPress={onPress}>
            <View containerStyle={styles.imageWrapper}>
                <View style={styles.imageHolder}>
                    <Image
                        style={styles.theImage}
                        source={{
                            uri: `${backendUrl}/data/products/${id}/120x120-${main_image}`,
                        }}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{ ...styles.cardTitle, fontWeight: '700' }}>
                        {name}
                    </Text>
                    <Text style={styles.price}>{`Rs. ${selling_price}`}</Text>

                    {/* <View style={styles.ratingContainer}>
            <Icon color={colors.primary} size={16} type="ionicon" name="star" />
            <Text style={{ ...styles.cardTitle, fontSize: 16 }}>{`${reviews ? reviews : 0
              } reviews`}</Text>
          </View> */}

                    {cartItem ? (
                        <View style={styles.alreadyAdded}>
                            <Icon
                                color={colors.green}
                                size={22}
                                name="check-circle"
                                style={{ marginRight: 5 }}
                            />
                            <Text style={{ marginRight: 5 }}>
                                Added (Qty: {cartItem.quantity})
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardTitle: {
        color: colors.primary,
        fontSize: 14,
        width: 170,
    },
    imageHolder: {
        borderRadius: 10,
        overflow: 'hidden',
        width: 90,
        height: 90,
        elevation: 10,
        left: 20,
    },
    imageWrapper: {
        margin: 20,
        position: 'relative',
    },
    theImage: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
    },
    price: {
        color: colors.secondary,
        fontSize: 18,
        marginTop: 5,
    },
    overlay: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#0006',
    },
    textContainer: {
        position: 'absolute',
        padding: 20,
        paddingLeft: 140,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 6,
        borderRadius: 10,
        bottom: -15,
    },
    alreadyAdded: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
});

export default ProductRow;
