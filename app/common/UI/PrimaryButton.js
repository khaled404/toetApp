import React from 'react';
import {StyleSheet} from 'react-native';
import StylesConstant from '../../constants/styles';

import {Button, Text} from 'react-native-elements';

import IconButton from './IconButton';
export default props => {
  let icon = global.IsRtl ? 'chevron-left' : 'chevron-right';

  return (
    <IconButton
      IconName={icon}
      IconType="font-awesome"
      IconColor={
        props.logIn || props.Rig
          ? StylesConstant.MainColor
          : StylesConstant.ColorScandre
      }
      IconBackground={props.logIn ? StylesConstant.MainColor : '#fff'}
      Color={
        props.logIn ? StylesConstant.MainColor : StylesConstant.ColorScandre
      }
      {...props}
    />
  );
};
// export default (props) => <Button
//                             {...props}
//                             titleStyle={{fontFamily:'Tajawal'}}
//                             iconRight
//                             iconContainerStyle={styles.LoginButtonIconContainer}
//                             icon={ {name: 'arrow-left', type: 'font-awesome', color:StylesConstant.MainColor, size:20,marginTop:3}}
//                             title={props.Title}
//                             containerStyle={{position: 'relative'}}
//                             buttonStyle={{...styles.LoginButton, ...props.style}}/>

// const styles = StyleSheet.create({
//     LoginButton: {
//         backgroundColor: StylesConstant.MainColor,
//         borderRadius: 100,
//         height:46,
//         width:'100%',
//         alignSelf:'center'
//     },
//     LoginButtonIconContainer: {
//         backgroundColor: 'white',
//         borderRadius: 29 / 2,
//         height: 29,
//         width: 29,
//         position: 'absolute',
//         right: 1
//     }
// })
