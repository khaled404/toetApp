import React from 'react';
import {View,Text,Image, TouchableOpacity} from 'react-native';

import { withNavigation } from 'react-navigation';
import styles from './styles';

import SectionButton from '../../../common/UI/SectionButton';
import { TranslateString } from '../../../util';
import CommonStyles from '../../../common/styles'


let aramex = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCX5OExXV4DDw0eYlNodvdlj09SLWCuCsmmJwLclv8g6nU-DU5";

let component = ({navigation,shipping,title}) => (
    <View style={{flexDirection:'row'}}>
            <View style={{flex:3,justifyContent:'center',alignItems:'flex-start'}}>
                <Text style={styles.SectionTitle}>{title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("shippingways")} style={{flexDirection:'row'}}>
                    <Text style={[CommonStyles.RegularSize,CommonStyles.FontFamilyBold]}>{shipping}</Text>

                </TouchableOpacity>
                {/* <Text style={{alignSelf:'auto',marginTop:-4,marginLeft:10,opacity:.5}}> يضاف 10$ للشحن</Text> */}

            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                
                <SectionButton onPress={() => navigation.navigate("shippingways")} />

            </View>

    </View>);




export default withNavigation(component);
