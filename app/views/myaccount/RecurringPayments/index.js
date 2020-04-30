import React from 'react';
import { View, Text } from 'react-native';
import SafeView from '../../../common/UI/SafeView';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import { Item, Input, Label, Grid, Col, Row, Icon } from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
export default class extends React.Component {
    static navigationOptions = {
        header: (<HeaderWithBack Title="الدفعات المتكررة" />)
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeView style={{justifyContent:'center',alignItems:'center'}}>
                <Text>عفواً لا يتوفر بيانات حالياً بهذه الصفحة</Text>
            </SafeView>
        );
    }
}
