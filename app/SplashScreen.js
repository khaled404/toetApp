import React from 'react';
import {ImageBackground} from 'react-native';
let image = require('../assets/img/splash/Portrait.png');
export default () => {
  return (
    <ImageBackground
      source={image}
      style={{width: '100%', height: '100%'}}></ImageBackground>
  );
};
