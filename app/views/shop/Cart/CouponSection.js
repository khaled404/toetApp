import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';


import { withNavigation } from 'react-navigation';
import Address from '../../../common/Components/Address';
import StylesConstant from '../../../constants/styles';
import SectionButton from '../../../common/UI/SectionButton';



let component = ({ navigation, coupon, title }) => (
    <View style={{marginBottom:15}}>
        <Text style={{fontSize:12,marginBottom:10}}>{title}</Text>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                <Icon name="price-tag" type='entypo' size={15} color={StylesConstant.MainColor} />
                <Text onPress={() => navigation.navigate("coupon")} style={{ color: StylesConstant.MainColor, fontSize: 15, marginLeft: 10 }}>{coupon}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <SectionButton onPress={() => navigation.navigate("coupon")} />
            </View>
        </View>
    </View>);




export default withNavigation(component);
