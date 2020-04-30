import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => (
    <Button
        {...props}
        buttonStyle={{width:20,height:20,borderRadius:10,backgroundColor:'#dbdee2'}}
        icon={
            <Icon
            name="arrow-left"
            size={7}
            color="#727C8E"
            />
        }
        />
)