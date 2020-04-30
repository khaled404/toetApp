import React from 'react';
import {View, Text, Image, TouchableOpacity, PixelRatio} from 'react-native';
import normalize from 'react-native-normalize';
import CommonStyles from '../../../common/styles';
import {RemoveHTMLFromString} from '../../../util';
import StylesConstant from '../../../constants/styles';

export default ({Img, Name, onPress}) => {
  //let path = `../../../assets/img/categories/${Img}.png`;
  let defaultImgSource = {};
  if (Img === false)
    defaultImgSource = require('../../../../assets/img/logo.png');
  else defaultImgSource = {uri: Img};

  return (
    <View
      style={{
        flex: 0.5,
        alignItems: 'center',
        marginHorizontal: 5,
      }}
    >
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center'}}
        onPress={onPress}
      >
        <View
          style={[
            {
              backgroundColor: '#fff',
              borderRadius: normalize(16),
              padding: 5,
            },
            CommonStyles.MediumShadow,
          ]}
        >
          <Image
            source={defaultImgSource}
            style={{
              width: normalize(90),
              height: normalize(90),
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 10,
            color: '#515C6F',
            fontFamily: StylesConstant.FontFamily,
            fontSize: 14,
          }}
        >
          {RemoveHTMLFromString(Name)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
