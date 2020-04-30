import React from 'react';
import {StyleSheet} from 'react-native';
import StylesConstant from '../../constants/styles';
import CommonStyles from '../styles';
import {Button, Text} from 'react-native-elements';
import normalize from 'react-native-normalize';

export default props => {
  const styles = StyleSheet.create({
    LoginButton: {
      backgroundColor: props.Color,
      borderRadius: normalize(100),
      height: normalize(46, 'height'),
      width: '100%',
      alignSelf: 'center',
    },
    LoginButtonIconContainer: {
      backgroundColor: props.IconBackground,
      borderRadius: normalize(29 / 2),
      height: normalize(29),
      width: normalize(29),
      position: 'absolute',
      right: normalize(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    ButtonShadow: {
      shadowColor: props.Color,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <Button
      titleStyle={{
        fontFamily: 'Tajawal-bold',
        color: props.logIn ? '#fff' : props.TitleColor || props.IconBackground,
        alignSelf: 'center',
        marginRight: normalize(15),
        fontSize: normalize(16),
      }}
      iconRight
      iconContainerStyle={[
        styles.LoginButtonIconContainer,
        props.IconContainerStyle,
      ]}
      icon={{
        name: props.IconName,
        type: props.IconType,
        color: props.IconColor,
        size: normalize(16),
        marginLeft: normalize(4.5),
        ...props.IconStyle,
      }}
      title={props.Title}
      containerStyle={{position: 'relative'}}
      buttonStyle={[styles.LoginButton, props.style, styles.ButtonShadow]}
      {...props}
    />
  );
};
