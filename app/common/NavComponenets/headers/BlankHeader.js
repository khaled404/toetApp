import React from 'react';
import { Header, Icon } from 'react-native-elements'
import { View, StyleSheet, SafeAreaView, StatusBar, Image, Text } from 'react-native';
import StylesConstant from '../../../constants/styles';
import { withNavigation } from 'react-navigation';
import { TranslateString } from '../../../util';
import normalize from 'react-native-normalize';
import styles from '../../styles';
let componenet = ({ Title, navigation, TitleKey,ContainerStyle }) => {
    let txt = Title;
    if(typeof(TitleKey) !== "undefined")
    txt = TranslateString(TitleKey);

    return (<Header
        placement='left'
        containerStyle={{ backgroundColor: StylesConstant.BackgroundColor, marginTop: ((StatusBar.currentHeight || 0) * -1), paddingTop: normalize(75,'height'), paddingHorizontal: normalize(20),...ContainerStyle }}
        leftComponent={{ text: txt, style: [{ fontSize:22 },styles.FontFamilyBold] }}

        rightComponent={
            <View style={{ flexDirection: 'row' }}>
                <Icon size={normalize(35)} onPress={() => navigation.goBack(null)} name='close' type='material-community' color={StylesConstant.MainColor} />
            </View>
        }
    />);
};


export default withNavigation(componenet);