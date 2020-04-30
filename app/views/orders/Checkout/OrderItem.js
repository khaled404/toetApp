import React from 'react';
import {View,Image,Text} from 'react-native';
import {Grid, Col, Row} from 'native-base';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
import CommonStyles from '../../../common/styles'

export default ({Product}) =>(
    <Row>
        <Col size={1}><Image source={{uri:Product.thumb}} style={{height:normalize(50),width:normalize(50),borderRadius:normalize(25)}} /></Col>
        <Col size={4}>
            <Text style={[{alignSelf:'flex-start',fontSize:15},CommonStyles.FontFamilyBold]}>{Product.name}</Text>
            <Text style={[{alignSelf:'flex-start',color:StylesConstant.MainColor,fontSize:normalize(16)},CommonStyles.FontFamilyMedium]}>{Product.price}</Text>
        </Col>
        <Col size={1}>
            <Text style={[{alignSelf:'flex-end',fontSize:15}]}>x {Product.quantity}</Text>
        </Col>
    </Row>
) 