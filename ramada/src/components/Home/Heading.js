/* eslint-disable prettier/prettier */

import React from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

const Heading = ({ children, navigation, viewAllRoute }) => {

    if (viewAllRoute) {
        return (<View style={styles.headingItems}>
            <View style={styles.headingItem}><Text style={styles.headingTxt}>{children}</Text></View>
            <View style={styles.headingItem}><TouchableOpacity onPress={e => navigation.navigate(viewAllRoute)} ><Text style={styles.viewMore}>View All &#x21fe;</Text></TouchableOpacity></View>
        </View >);
    } else {
        return (<View style={styles.headingItems}>
            <View style={styles.headingItem}><Text style={styles.headingTxt}>{children}</Text></View>
        </View >);
    }
}


const styles = StyleSheet.create({
    headingItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headingItem: {
    },
    headingTxt: {
        fontWeight: '700',
        fontSize: 14,
        marginBottom: 15,
        color: '#555',
        paddingHorizontal: 15,
    },
    viewMore: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: 12,
    },
});

export default Heading;

