import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import AddressShow from '../../../common/Components/Address';
import CommonStyles from '../../../common/styles';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
import {TranslateString} from '../../../util';

let component = ({
  navigation,
  Address,
  IsActive,
  onDeletePress,
  onEditPress,
}) => (
  <ViewWithShadow
    style={{
      alignSelf: 'center',
      backgroundColor: 'white',
      marginBottom: normalize(10, 'height'),
      flexDirection: 'row',
      width: '100%',
      marginTop: 10,
    }}
  >
    <View style={{flex: 3}}>
      <AddressShow Address={Address} />
    </View>
    <View style={{flex: 1, flexDirection: 'column'}}>
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <Icon
          type="font-awesome"
          name="check"
          size={normalize(15)}
          color={IsActive ? StylesConstant.MainColor : '#a1a1a1'}
          containerStyle={{
            borderRadius: normalize(10),
            borderWidth: 1,
            padding: normalize(3),
            borderColor: IsActive ? StylesConstant.MainColor : '#a1a1a1',
          }}
        />
      </View> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={() => onEditPress(Address.address_id)}>
          <Text
            style={[
              {fontSize: normalize(14), color: StylesConstant.ColorScandre},
              CommonStyles.FontFamilyBold,
            ]}
          >
            {TranslateString('text_edit')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: normalize(35)}}
          onPress={() => onDeletePress(Address.address_id, IsActive)}
        >
          <Text
            style={[
              {fontSize: normalize(14), color: '#F35056'},
              CommonStyles.FontFamilyBold,
            ]}
          >
            {TranslateString('text_delete')}
          </Text>
        </TouchableOpacity>
        {/* <Icon type='font-awesome' name='pencil'  size={normalize(15)} color={StylesConstant.MainColor} />
                    <Icon type='font-awesome' name='trash'  size={normalize(15)} color={StylesConstant.MainColor}  containerStyle={{marginLeft:20}} /> */}
      </View>
    </View>
  </ViewWithShadow>
);

export default withNavigation(component);
