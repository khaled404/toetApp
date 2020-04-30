import React from 'react';
import { StyleSheet, Text ,View,FlatList, ScrollView} from 'react-native'
import { Grid, Row, Col } from 'native-base';
import StylesConstant from '../../../../constants/styles'
import Review from './Review';
import normalize from 'react-native-normalize';

export default ({reviews,empty}) => {
    return (<View style={{backgroundColor:StylesConstant.BackgroundColor,flex:1,paddingTop:20}}>
          <FlatList           
            data={reviews}            
            renderItem={(e,s) => <Review  Review={e.item}/>}
            keyExtractor={(e,i)=>i.toString()}
            ListEmptyComponent={<Text style={{fontSize: normalize(12),opacity: .7,alignSelf:'center',marginTop:normalize(25,'height')}}>{empty}</Text>}
             />
    </View>)
};

const styles = StyleSheet.create({
    Cell:{
        flexDirection:"column",
        alignItems:'flex-start',
        marginBottom:normalize(10,'height'),
        paddingHorizontal:normalize(20)
    },
    Title: {
        fontSize: normalize(12),
        opacity: .7,
    },
    Value: {
        fontSize: normalize(16)
    }
});