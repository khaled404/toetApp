import React from 'react';
import StylesConstant from '../../constants/styles';
import {View} from 'react-native';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Grid,
  Col,
  Row,
  Icon,
} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import normalize from 'react-native-normalize';

export default props => (
  <View
    style={{
      paddingHorizontal: normalize(10),
      marginBottom: 10,
      paddingTop: 20,
      paddingHorizontal: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 2,
      borderRadius: 15,
      backgroundColor: '#fff',
    }}
  >
    <Dropdown
      fontSize={15}
      style={{fontFamily: StylesConstant.FontFamily}}
      inputContainerStyle={{borderBottomColor: 'transparent'}}
      // baseColor={StylesConstant.MainColor}
      renderAccessory={() => (
        <Icon
          type="FontAwesome"
          name="chevron-down"
          style={{
            fontSize: normalize(15),
            color: StylesConstant.ColorScandre,
            marginBottom: 30,
          }}
        />
      )}
      dropdownOffset={{top: 14}}
      dropdownPosition={0}
      absoluteRTLLayout={true}
      selectedItemColor={StylesConstant.MainColor}
      itemCount={7}
      itemColor={'#515C6F'}
      {...props}
    />
  </View>
);
