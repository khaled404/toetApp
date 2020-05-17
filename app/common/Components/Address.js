import React from 'react';
import {View,Text} from 'react-native';
import { AddAddress } from '../../actions/AccountActions';
import normalize from 'react-native-normalize';

export default ({Address,style}) =>{
    console.log('Address',Address);
    
    if(typeof(Address) === "undefined") return null;
    
    if(typeof(Address) === "string"){
        let addr = Address.split('<br />');
        let length = addr.length;
        return (<View style={{...style}}>
            <Text style={{fontFamily:'Tajawal-bold',fontSize:15,alignSelf:'flex-start'}}>{addr[0]}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{addr[1]}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{addr[length-3]}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{addr[length-2]}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{addr[length-1]}</Text>
    </View>);
    }
    
 
    
    return (<View style={{...style}}>
            <Text style={{fontFamily:'Tajawal-bold',fontSize:15,alignSelf:'flex-start'}}>{Address.Name}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{Address.Street}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{Address.City}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{Address.Zone}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-start'}}>{Address.Country}</Text>
    </View>);
}

