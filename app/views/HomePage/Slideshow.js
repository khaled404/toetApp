import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');
import {SliderBox} from 'react-native-image-slider-box';

import StylesConstant from '../../constants/styles';
import normalize from 'react-native-normalize';
import ImageSlider from '../../common/UI/ImageSlider';

export default ({banners, navigation}) => {
  const [bnrs, SetBnrs] = useState(banners);

  let images = banners.map(e => e.image);

  let onCurrentImgPress = index => {
    let choosedBanner = bnrs[index];
    
    
    // if (choosedBanner.app_link_id === '0' ||typeof (choosedBanner.app_link === 'undefined')){
    //   return;
    // }
      

    switch (choosedBanner.app_link) {
    //   case 'category':
    //     navigation.navigate('categorydetails', {
    //       category_id: choosedBanner.app_link_id,
    //     });
    //     break;
    //   case 'manufacturer':
    //     navigation.navigate('branddetails', {
    //       manufacturer_id: choosedBanner.app_link_id,
    //     });
    //     break;
      case 'product':
        navigation.navigate('productdetails', {
          product_id: choosedBanner.app_link_id,
        });
        break;
    }
    console.log('choosedBanner.app_link_id',choosedBanner.app_link_id );
    console.log('choosedBanner.app_link',choosedBanner.app_link );
  };

  return (
    <View style={{marginBottom: normalize(25, 'height')}}>
      <ImageSlider
        dotColor={StylesConstant.MainColor}
        onCurrentImagePressed={onCurrentImgPress}
        sliderBoxHeight={normalize(180, 'height')}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          borderWidth: 1,
          backgroundColor: '#515C6F',
        }}
        images={images}
        circleLoop
      />
    </View>
  );
};
