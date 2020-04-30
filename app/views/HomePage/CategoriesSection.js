import React from 'react';
import {FlatList,View,Text} from 'react-native'
import Category from '../../common/Components/Category';
import StylesConstants from '../../constants/styles';
import {withNavigation} from 'react-navigation';
import { TranslateString } from '../../util';
import styles from '../../common/styles';
import normalize from 'react-native-normalize';
let component =  ({categories,navigation}) =>(
    <View style={{marginBottom:normalize(25,'height')}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginBottom:normalize(15,'height')}}>
            <Text style={[{alignSelf:'flex-start',marginLeft:5},styles.RegularSize]}>{TranslateString("menu_categories")}</Text>
            <Text 
              style={[{alignSelf:'flex-end',color:StylesConstants.MainColor,fontSize:12},styles.FontFamilyBold]}
                onPress={()=>navigation.navigate("categories")}>
                {TranslateString("text_view_all")}
                </Text>    
        </View>        
        <FlatList 
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({item}) => <Category TextStyle={{marginHorizontal:9}}   onPress={() => navigation.navigate("categorydetails",{category_id:item.category_id})} Img={item.thumb} Name={item.name} />}          
            keyExtractor={(i,index) => `${i.name}${index}`}       
            horizontal
        />
    </View>
);

export default withNavigation(component);