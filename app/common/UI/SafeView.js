import React from 'react';

import {SafeAreaView} from 'react-native';
import StylesConstants from '../../constants/styles';
export default (props) => <SafeAreaView style={{flex:1,padding:20,backgroundColor:StylesConstants.BackgroundColor,...props.style}} >{props.children}</SafeAreaView>