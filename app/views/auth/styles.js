import {
    StyleSheet
} from 'react-native';
import StylesConstant from '../../constants/styles';
import normalize from 'react-native-normalize';

module.exports = StyleSheet.create({
    FormContainer: {
        paddingVertical: normalize(10,'height'),
        marginBottom: normalize(10,'height'),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    LoginButton: {
        backgroundColor: StylesConstant.MainColor,
        borderRadius: 100,
        height: normalize(46,'height'),
        width:'100%',
        alignSelf:'center'
    },
    LoginButtonIconContainer: {
        backgroundColor: 'white',
        borderRadius: 29 / 2,
        height: 29,
        width: 29,
        position: 'absolute',
        right: 1
    },
    SocialContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'       ,
        marginBottom:normalize(25, 'height')
    },
    Input:{
        fontFamily:StylesConstant.FontFamily,
        // textAlign:'right',
        // backgroundColor:'yellow',
        width:'100%'
        // marginRight:normalize(10)
    }
})