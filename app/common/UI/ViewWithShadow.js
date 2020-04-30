import React from 'react';
import {View} from 'react-native';
export default props => (
  <View
    style={{
      padding: 10,
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
      ...props.style,
    }}
  >
    {props.children}
  </View>
);
