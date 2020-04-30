import React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import {TextField} from 'react-native-material-textfield';
import normalize from 'react-native-normalize';
import StylesConstant from '../../constants/styles';
import LocalIcon from '../Icons/LocalIcon';
import CommonStyles from '../../common/styles/index';

export default class extends React.Component {
  Clear() {
    this._ref.clear();
  }
  SetValue(val) {
    this._ref.setValue(val);
    //this._ref.current.setValue(val);
  }
  render() {
    const {
      IconType,
      IconName,
      Value,
      Label,
      ErrorMessage,
      onChangeText,
      secureTextEntry,
      isTextArea,
      ref,
      keyboardType,
    } = this.props;
    let leftIcon = IconName ? (
      <Icon
        style={{
          fontSize: 22,
          marginRight: normalize(20),
          marginLeft: normalize(10),
          color: '#727C8E',
        }}
        name={IconName}
        type={IconType}
      />
    ) : null;
    if (leftIcon !== null && IconType.toLowerCase() === 'local')
      leftIcon = (
        <LocalIcon
          size={22}
          color="#727C8E"
          style={{marginRight: normalize(20), marginLeft: normalize(10)}}
          name={IconName}
        />
      );
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: normalize(10),
            backgroundColor: '#fff',
            marginTop: 10,
          },
          CommonStyles.LightShadow,
          this.props.pass
            ? {
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
              }
            : {borderRadius: 15},
        ]}
      >
        <TextField
          ref={r => (this._ref = r)}
          containerStyle={{width: '100%'}}
          renderLeftAccessory={() => leftIcon}
          error={ErrorMessage}
          lineWidth={0}
          labelTextStyle={{color: '#515C6F'}}
          activeLineWidth={ErrorMessage ? 1 : 0}
          fontSize={15}
          secureTextEntry={secureTextEntry}
          style={{fontFamily: StylesConstant.FontFamily, color: '#515C6F'}}
          tintColor={StylesConstant.MainColor}
          onChangeText={onChangeText}
          value={Value}
          keyboardType={keyboardType || 'default'}
          multiline={isTextArea || false}
          numberOfLines={isTextArea ? 3 : undefined}
          label={Label}
        />
      </View>
    );
  }
}
// export default ({ IconType, IconName, Value, Label, ErrorMessage, onChangeText, secureTextEntry, isTextArea, ref }) => {
//     let leftIcon = IconName ? <Icon style={{ fontSize: 22, marginRight: normalize(20), marginLeft: normalize(10), color: '#727C8E' }} name={IconName} type={IconType} /> : null;
//     if (leftIcon !== null && IconType.toLowerCase() === "local")
//         leftIcon = (<LocalIcon size={22} color="#727C8E" style={{ marginRight: normalize(20), marginLeft: normalize(10) }} name={IconName} />);
//     return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: normalize(10) }}>
//         <TextField
//             ref={ref}
//             containerStyle={{ width: '100%' }}
//             renderLeftAccessory={() => leftIcon}
//             error={ErrorMessage}
//             lineWidth={0}
//             labelTextStyle={{ color: '#515C6F' }}
//             activeLineWidth={ErrorMessage ? 1 : 0}
//             fontSize={15}
//             secureTextEntry={secureTextEntry}
//             style={{ fontFamily: StylesConstant.FontFamily, color: '#515C6F' }}
//             tintColor={StylesConstant.MainColor}
//             onChangeText={onChangeText}
//             value={Value}
//             multiline={isTextArea || false}
//             numberOfLines={isTextArea ? 3 : undefined}
//             label={Label} />
//     </View>)
// }
