import React from 'react';
import {View,Text,Image, TouchableOpacity} from 'react-native';

import { withNavigation } from 'react-navigation';
import styles from './styles';

import SectionButton from '../../../common/UI/SectionButton';
import CommonStyles from '../../../common/styles'



let component = ({navigation,payment,title}) => (
    <View style={{flexDirection:'row'}}>
            <View style={{flex:3,justifyContent:'center',alignItems:'flex-start'}}>
                <Text style={styles.SectionTitle}>{title}</Text>
                <TouchableOpacity  onPress={() => navigation.navigate("PaymentWays")} style={{flexDirection:'row'}}>
                    <Text style={[CommonStyles.RegularSize,CommonStyles.FontFamilyBold]}>{payment}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                
                <SectionButton onPress={() => navigation.navigate("PaymentWays")} />

            </View>

    </View>);




export default component;
