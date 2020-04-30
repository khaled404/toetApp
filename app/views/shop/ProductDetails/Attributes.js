import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native'
import { Grid, Row, Col, View } from 'native-base';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import SectionDivider from '../../../common/UI/SectionDivider';
import normalize from 'react-native-normalize';
export default ({ attributes }) => {
    let children = [];
    for (let i = 0; i < attributes.length; i++) {
        const group = attributes[i];
        children.push(
            <View>
                <Text style={{fontSize:12,marginTop:10}}>{group.name}</Text>
            </View>
        );
        children.push(<SectionDivider />);
        children.push(
            <FlatList
                data={group.attribute}
                numColumns={2}
                renderItem={({ item }) => (<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center'}}>
                    <Text style={styles.Title}>{item.name} :</Text>
                    <Text style={styles.Value}>{item.text}</Text>
                </View>)}
            />
        );
        
    }


    return (
        <View style={{ backgroundColor: StylesConstant.BackgroundColor }}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    Cell: {
        flexDirection: "column",
        alignItems: 'flex-start',
        marginBottom: normalize(10, 'height'),
        paddingHorizontal: normalize(20)
    },
    Title: {
        fontSize: 15,
        marginRight:5
    },
    Value: StyleSheet.flatten([{
        fontSize: 16,
    },CommonStyles.FontFamilyBold])
});