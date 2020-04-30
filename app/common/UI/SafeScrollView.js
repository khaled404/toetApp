import React from 'react';
import {Container,Content} from 'native-base';
import {SafeAreaView,ScrollView} from 'react-native';
import StylesConstants from '../../constants/styles';
import normalize from 'react-native-normalize';
export default (props) => 
<Container>
    <Content showsVerticalScrollIndicator={false} scrollEnabled={true} style={[{backgroundColor:StylesConstants.BackgroundColor},props.style]} padder={true}>
    {props.children}

    </Content>
</Container>
{/* <SafeAreaView style={{flex:1,backgroundColor:StylesConstants.BackgroundColor}}>
    <ScrollView style={{flex:1,paddingVertical:normalize(20,'height'),paddingHorizontal:normalize(20),backgroundColor:StylesConstants.BackgroundColor,...props.style}} >
    </ScrollView>
</SafeAreaView> */}