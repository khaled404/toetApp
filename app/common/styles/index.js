import { StyleSheet } from 'react-native';
import StylesConstant from '../../constants/styles';
export default StyleSheet.create({
    Input: {
        fontFamily: StylesConstant.FontFamily,
        marginHorizontal: 10
    },
  
    LightShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    MediumShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    FontFamilyBold: {
        fontFamily: StylesConstant.FontFamilyBold
    },
    FontFamilyMedium: {
        fontFamily: "Tajawal-medium"
    },
    RegularSize: {
        fontSize: 15
    },
    MainColor: {
        color: StylesConstant.MainColor
    }
});