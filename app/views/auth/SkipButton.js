import React from 'react';
import { View, Text } from 'react-native';
import CommonStyles from '../../common/styles';
import { withNavigation } from 'react-navigation'
import normalize from 'react-native-normalize';
import { SetSkipLogin, ChooseStringByLanguage } from '../../util';


export default withNavigation(({ navigation }) => {
    function onSkipPress() {
        SetSkipLogin(true);
        navigation.navigate("mainFlow");
    }
    return (
        <View style={{ height: normalize(30, 'height'), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[CommonStyles.MainColor,CommonStyles.FontFamilyBold]} onPress={onSkipPress}>{ChooseStringByLanguage("Skip?","تخطي؟")}</Text>
        </View>);
})