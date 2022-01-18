/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  colors,
  Icon,
  Text,
  Overlay,
  Input,
  Button,
  Avatar,
} from 'react-native-elements';
import Stars from 'react-native-stars';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../actions/products';
import { showMessage } from 'react-native-flash-message';
import { postReview } from '../../api/items';

export default function ProductReview({ product }) {
  const [visible, setVisible] = useState(false);
  const reviewList = useSelector(state => state.products.reviews);

  const authToken = useSelector(state => state.auth.authToken);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product?.id) {
      dispatch(getReviews(product?.id));
    }
  }, [product, dispatch]);

  let total =
    product.total_1_stars +
    product.total_2_stars +
    product.total_3_stars +
    product.total_4_stars +
    product.total_5_stars;

  let s1p = (product.total_1_stars * 100) / total;
  let s2p = (product.total_2_stars * 100) / total;
  let s3p = (product.total_3_stars * 100) / total;
  let s4p = (product.total_4_stars * 100) / total;
  let s5p = (product.total_5_stars * 100) / total;


  const submitReview = useCallback(() => {
    if (!authToken) {
      showMessage({
        message: 'You are not logged in. Please login and try again!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    if (rating === 0) {
      showMessage({
        message: 'Please add a rating!',
        type: 'danger',
        floating: true,
      });
      return;
    }

    postReview({ product_id: product.id, review, rating_value: rating })
      .then(function (response) {
        if (response.status === 'success') {
          showMessage({
            message: 'Your review submitted successfully!',
            type: 'success',
            floating: true,
          });

          // refreshing the reviews list
          if (product?.id) {
            dispatch(getReviews(product?.id));
          }
        } else {
          showMessage({
            message: 'Something went wrong!',
            type: 'danger',
            floating: true,
          });
        }
      })
      .catch(function (_) {
        showMessage({
          message: 'Error while submitted the review. Please try again!',
          type: 'danger',
          floating: true,
        });
      })
      .finally(function () {
        setVisible(false);
      });
  }, [product.id, review, rating, authToken, dispatch]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.ratingSec}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: colors.grey2,
          marginBottom: 5,
        }}>
        Rating & Reviews
      </Text>
      <View style={styles.ratedNum}>
        <Text style={{ fontSize: 40, color: 'black', fontWeight: '600' }}>
          {/* 4.5 */}
          {product.average_stars}
        </Text>
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Stars
            disabled={true}
            default={product.average_stars}
            count={5}
            half={true}
            starSize={25}
            fullStar={<Icon name={'star'} size={15} />}
            emptyStar={<Icon name={'star-outline'} size={15} />}
            halfStar={<Icon name={'star-half'} size={15} />}
          />
          <Text style={{ fontSize: 12 }}>{product.average_stars} out of 5</Text>
        </View>
      </View>
      <View style={styles.ratingBarSec}>
        <View style={styles.ratingBar}>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              alignItems: 'center',
            }}>
            <Text style={styles.Text}> 5 </Text>
            <Icon size={12} name="star" />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#d2d0d0',
              height: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                width: `${s5p}%`,
                backgroundColor: 'green',
                height: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ width: '10%', marginLeft: 5 }}>
            <Text style={styles.Text}>{product.total_5_stars}</Text>
          </View>
        </View>

        <View style={styles.ratingBar}>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              alignItems: 'center',
            }}>
            <Text style={styles.Text}> 4 </Text>
            <Icon size={12} name="star" />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#d2d0d0',
              height: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                width: `${s4p}%`,
                backgroundColor: 'green',
                height: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ width: '10%', marginLeft: 5 }}>
            <Text style={styles.Text}>{product.total_4_stars}</Text>
          </View>
        </View>

        <View style={styles.ratingBar}>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              alignItems: 'center',
            }}>
            <Text style={styles.Text}> 3 </Text>
            <Icon size={12} name="star" />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#d2d0d0',
              height: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                width: `${s3p}%`,
                backgroundColor: '#0ab10a',
                height: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ width: '10%', marginLeft: 5 }}>
            <Text style={styles.Text}>{product.total_3_stars}</Text>
          </View>
        </View>

        <View style={styles.ratingBar}>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              alignItems: 'center',
            }}>
            <Text style={styles.Text}> 2 </Text>
            <Icon size={12} name="star" />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#d2d0d0',
              height: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                width: `${s2p}%`,
                backgroundColor: '#fdcd0a',
                height: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ width: '10%', marginLeft: 5 }}>
            <Text style={styles.Text}>{product.total_2_stars}</Text>
          </View>
        </View>

        <View style={styles.ratingBar}>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              alignItems: 'center',
            }}>
            <Text style={styles.Text}> 1 </Text>
            <Icon size={12} name="star" />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#d2d0d0',
              height: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                width: `${s1p}%`,
                backgroundColor: 'red',
                height: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ width: '10%', marginLeft: 5 }}>
            <Text style={styles.Text}>{product.total_1_stars}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rateBtnSec}>
        <TouchableOpacity
          onPress={toggleOverlay}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
          <Icon name="edit" color="gray" size={13} />
          <Text
            style={{
              textDecorationLine: 'underline',
              marginLeft: 2,
              color: 'gray',
              fontSize: 13,
            }}>
            Add Review
          </Text>
        </TouchableOpacity>

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{ borderRadius: 7 }}>
          <View style={styles.rateUsSec}>
            <Stars
              default={1}
              count={5}
              half={true}
              update={val => {
                setRating(val);
              }}
              starSize={35}
              fullStar={<Icon size={30} name={'star'} />}
              emptyStar={<Icon size={30} name={'star-outline'} />}
              halfStar={<Icon size={30} name={'star-half'} />}
            />
            <Input
              value={review}
              placeholder="Write a Review"
              inputContainerStyle={styles.inputContainer}
              style={{ fontSize: 14 }}
              // onChange={e => setReview(e.target.value)}
              onChangeText={val => setReview(val)}
            />
            <Button title="Submit" onPress={submitReview} />
          </View>
        </Overlay>
      </View>

      <View style={styles.customerReviewSec}>
        {/* TODO: create single component for reviews. SingleReview */}
        {reviewList?.map(singleReview => (
          <View style={styles.customerReviewList}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Avatar
                  size={26}
                  containerStyle={{ backgroundColor: 'green', marginRight: 5 }}
                  rounded
                  title={singleReview.customer?.name}
                />
                <View>
                  <Text>{singleReview.customer?.name}</Text>
                  <Text style={{ fontSize: 11, color: 'gray' }}>
                    {singleReview.created_at}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Stars
                  disabled={true}
                  default={singleReview.rating_value}
                  count={5}
                  half={true}
                  starSize={25}
                  fullStar={<Icon name={'star'} size={13} />}
                  emptyStar={<Icon name={'star-outline'} size={13} />}
                  halfStar={<Icon name={'star-half'} size={13} />}
                />
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'gray', fontSize: 14 }}>
                {singleReview.review}
              </Text>
            </View>
          </View>
        ))}

        {/* TODO: don't implement read all reviews. we will do this in future */}
        {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: 'underline' }}>
              Read all Reviews
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingSec: {
    paddingHorizontal: 10,
    marginTop: 20,
    width: '100%',
  },
  ratedNum: {
    borderColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    flexDirection: 'row',
  },
  ratingBarSec: {
    marginTop: 10,
  },
  ratingBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateBtnSec: {
    marginTop: 20,
    alignItems: 'center',
  },
  customerReviewSec: {
    marginTop: 20,
    marginBottom: 10,
  },
  rateUsSec: {
    paddingVertical: 10,
    width: 300,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#d2d0d0',
    marginTop: 20,
    borderRadius: 5,
    height: 100,
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  customerReviewList: {
    borderBottomColor: '#d2d0d0',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 20,
  },
  Text: {
    fontSize: 13,
    color: 'gray',
  },
});
