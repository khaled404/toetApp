import React from 'react';
import {View} from 'react-native';
export default ({style,margin,marginTop,marginBottom}) =>
(<View style={[{height:1,backgroundColor:'rgba(175, 175, 175,0.3)',marginTop:margin||marginTop||10,marginBottom:margin||marginBottom||10},style]} />)