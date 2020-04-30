import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Card, Text, Image, Button, Icon } from 'react-native-elements';
import ViewWithShadow from '../UI/ViewWithShadow';
import StylesConstants from '../../constants/styles';
import normalize from 'react-native-normalize';
const styles = StyleSheet.create({
    Rating: {
        backgroundColor: StylesConstants.MainColor,
        borderRadius: 100,
        height: normalize(15,'height'),
        width: normalize(33),
        borderRadius: 100,

    }
});

export default ({ rate, style }) => {
   return( <View style={[{ ...styles.Rating, ...style }]}>
        <Text style={{ fontSize: 9, alignSelf: 'flex-start',justifyContent:'center', color: '#fff',marginLeft:normalize(7) }}>{rate}</Text>
        <Icon name='star' type='material-community' color='#fff' size={10} containerStyle={{ position: 'absolute', right:2, top: 1 }} />
    </View>);
};