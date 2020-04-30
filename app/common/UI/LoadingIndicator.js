import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { Content } from 'native-base';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
import AnimatedLoader from 'react-native-animated-loader';
import StylesConstant from '../../constants/styles';

export default ({ visible }) => {
   let showLoader = true;
   if (typeof visible !== 'undefined') showLoader = false;

   if (!visible) return null;
   return (
      <View
         style={{
            zIndex: 9999,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
         }}>
         {/*  <ActivityIndicator
            size="large"
            color={StylesConstant.MainColor}
            style={{ width: 100, height: 100 }}
         /> */}

         <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0.9)"
            source={require('../../../assets/normalLoader.json')}
            animationStyle={{ width: 100, height: 100 }}
            speed={1}
         />
      </View>
   );
};
