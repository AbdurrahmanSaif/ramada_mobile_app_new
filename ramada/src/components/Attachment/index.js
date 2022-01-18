/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';
import { COLORS, FONTS, SIZES } from '../../constants';
import { prescriptionRequired } from '../../helpers/common';
import InnerHeader from '../InnerHeader';
import DocumentPicker from 'react-native-document-picker';
import { attachment, uploadOrdersAttachment } from '../../api/orders';
import RNFetchBlob from 'rn-fetch-blob';

export default function Attachment({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [prescriptionRequiredList, setPrescriptionRequiredList] = useState([]);
  const [image, setImage] = useState({});
  const authToken = useSelector(state => state.auth.authToken);
  const [imageUri, setImageUri] = useState();

  // console.log('token::', authToken);

  // console.log('image', imageUri);
  useEffect(() => {
    let presList = [];

    // console.log('presList::', presList);

    if (cartItems && cartItems) {
      cartItems.forEach(cartItem => {
        let required = prescriptionRequired(cartItem);
        if (required) {
          presList.push(cartItem);
        }
      });
    }

    setPrescriptionRequiredList(presList);
  }, [cartItems]);

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Upload Prescription' }));
    }
  }, [dispatch, isFocused]);

  // const openGallery = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('response::', response);
  //     if (response.didCancel) {
  //       console.log('user cancel');
  //     } else if (response.error) {
  //       console.log('error::', response.error);
  //     } else if (response.customButton) {
  //       console.log('button clicked::', response.customButton);
  //     } else {
  //       const source = {
  //         uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
  //       };
  //       setImageUri(source);
  //       console.log('source::', source);
  //       console.log('response::', response.assets[0].base64);
  //     }
  //   });
  // };

  async function chooseFile() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size,
        'resssss:::::',
        res,
      );
      debugger;
      const fileName = res[0].uri.replace('content://', '');
      console.log('fileName::', fileName);
      // const path = await normalizePath(res[0].uri);
      // console.log('path::', path);
      const result = await RNFetchBlob.fs.readFile(fileName, 'base64');
      console.log('result::', result);
      const formData = new FormData();
      formData.append('attachment', result);
      attachment(formData)
        .then(function (value) {
          console.log(value); // "Success!"
        })
        .catch(function (e) {
          console.log(e);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('errr', err);
      } else {
        throw err;
      }
    }
  }

  // async function normalizePath(path) {
  //   if (Platform.OS === 'ios' || Platform.OS === 'android') {
  //     const filePrefix = 'content://';
  //     if (path.startsWith(filePrefix)) {
  //       path = path.substring(filePrefix.length);
  //       try {
  //         path = decodeURI(path);
  //       } catch (e) {}
  //     }
  //   }
  //   return path;
  // }

  return (
    <>
      <InnerHeader navigation={navigation} />
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={{ ...FONTS.body3 }}>
            {prescriptionRequiredList.length} item in cart require Prescription
          </Text>
          {prescriptionRequiredList.map(list => (
            <Text key={list.id} style={{ ...FONTS.body5 }}>
              *{list.name}
            </Text>
          ))}
        </View>
        <Image
          source={imageUri}
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: 'black',
            alignSelf: 'center',
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            width: 100,
            height: 30,
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
          }}
          onPress={() => chooseFile()}>
          <Text>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.lightGray4,
    height: SIZES.height,
  },
  card: {
    backgroundColor: COLORS.white,
    elevation: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
});
