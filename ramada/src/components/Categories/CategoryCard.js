import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS, SIZES, icons } from '../../constants';
import colors from '../../helpers/colorPalette';
import { imageUrl } from '../../helpers/common';

const CategoryCard = ({ category: { id, name, image }, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(id, name)}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl(image, 'categories', '292x237-') }}
            style={styles.theImage}
            // resizeMode="contain"
          />
        </View>
        <View style={styles.arrowBtn}>
          <View style={styles.innerArrowBtn}>
            <Image
              source={icons.next}
              style={{ width: 18, height: 18, tintColor: COLORS.white }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SIZES.width / 2.2,
    height: SIZES.height / 4.2,
    backgroundColor: COLORS.white,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 8,
    position: 'relative',
  },
  cardTitle: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  imageWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: SIZES.width / 2.4,
    height: SIZES.height / 5.6,
  },
  theImage: {
    width: SIZES.width / 2.4,
    height: SIZES.height / 5.5,
    borderRadius: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0006',
  },
  arrowBtn: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  innerArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CategoryCard;
