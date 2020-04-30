import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Image, SocialIcon, Input, Button, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fumi } from 'react-native-textinput-effects';
import SafeView from '../../../common/UI/SafeView';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import ViewStyles from '../styles';
import PriamryButton from '../../../common/UI/PrimaryButton';
import BlankHeader from '../../../common/NavComponenets/headers/BlankHeader';
import CodeInput from 'react-native-confirmation-code-input';


export default class extends React.Component {
    static navigationOptions = {
        header: (<BlankHeader Title="كود التفعيل" />)
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeView>
                <Text style={{ 'fontFamily': StylesConstant.FontFamily, marginTop: 20 }}> تم ارسال الكود في رسالة نصية قصيرة، يرجى إدخاله لتأكيد رقم جوالك</Text>
                <View style={[ViewStyles.FormContainer, { height: 130 }]}>

                    <CodeInput
                        ref="codeInputRef1"
                        codeLength={4}
                        className={'border-box'}
                        space={10}
                        size={70}
                        activeColor='#000'
                        containerStyle={{ borderColor: 'red' }}
                        inputPosition='center'
                        codeInputStyle={{ borderWidth: 0, backgroundColor: '#fff', fontSize: 40, borderRadius: 10 }}

                        onFulfill={() => { }}
                    />

                </View>
                <PriamryButton Title="تأكيد" onPress={() => this.props.navigation.navigate("mainFlow")} />

                <Text style={[{ alignSelf: 'center', marginTop: 20 }, CommonStyles.MainColor, CommonStyles.FontFamilyBold]}>إعادة ارسال الكود</Text>

            </SafeView>
        );
    }
}
