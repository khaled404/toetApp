import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import styles from '../styles';
import StylesConstant from '../../constants/styles';

export default ({Img, Name, onPress, ImgStyle, TextStyle, ContainerStyle}) => {
  //let path = `../../../../assets/img/categories/${Img}.png`;
  //let icon = GetImagePath(Img);

  let defaultImgSource = {};
  if (Img === false)
    defaultImgSource = require('../../../assets/img/defaultCategory.png');
  else defaultImgSource = {uri: Img};
  return (
    <View style={[{flex: 0.5, alignItems: 'center'}]}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: normalize(80),
            height: normalize(80),
            borderRadius: normalize(40),
            backgroundColor: StylesConstant.MainColor,
          },
          styles.LightShadow,
          ContainerStyle,
        ]}
      >
        <TouchableOpacity
          style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}
          onPress={onPress}
        >
          <Image
            source={defaultImgSource}
            style={[
              {
                width: normalize(60),
                height: normalize(60),
                resizeMode: 'contain',
                borderRadius: normalize(40),
              },
              ImgStyle,
            ]}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[
          {textAlign: 'center', color: '#515C6F', width: 100, marginTop: 5},
          styles.RegularSize,
          styles.FontFamilyMedium,
          TextStyle,
        ]}
      >
        {Name}
      </Text>
    </View>
  );
};
