import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';


import { withNavigation } from 'react-navigation';
import Address from '../../../common/Components/Address';
import StylesConstant from '../../../constants/styles';
import SectionButton from '../../../common/UI/SectionButton';



let component = ({ navigation, voucher, title }) => (
    <View>
        <Text style={{fontSize:12,marginBottom:10}}>{title}</Text>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                <Icon name="wallet-giftcard" type='material-community' size={15} color={StylesConstant.MainColor} />
                <Text onPress={() => navigation.navigate("voucher")} style={{ color: StylesConstant.MainColor, fontSize: 15, marginLeft: 10 }}>{voucher}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <SectionButton onPress={() => navigation.navigate("voucher")} />
            </View>
        </View>
    </View>);




export default withNavigation(component);
