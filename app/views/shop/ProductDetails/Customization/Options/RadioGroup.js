import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import StylesConstant from '../../../../../constants/styles';
import { connect } from 'react-redux';
import normalize from 'react-native-normalize';

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product_option_id: props.product_option_id,
            selectedValue: "",
            options: props.options
        }
    }
    onRadioButtonPress(option) {
        let selectedValue = option.option_value_id;
        this.setState({
            selectedValue: selectedValue
        });
        this.props.SetProductOption(this.state.product_option_id, selectedValue);

    }
    renderOption(option) {
        let isActive = option.option_value_id == this.state.selectedValue;
        let textColor = isActive ? "#fff" : "#000";
        let backgroundColor = isActive ? { backgroundColor: StylesConstant.MainColor , borderColor:'#fff' } : undefined;

        return (
            <TouchableOpacity style={[styles.button,backgroundColor]} onPress={() => this.onRadioButtonPress(option)}>
                <Text style={{ color: textColor }}>{option.name}</Text>
            </TouchableOpacity>
        );
    }
    render() {

        return (
            <View style={{flex:1,alignItems:'flex-start'}}>
                <FlatList
                    data={this.state.options}
                    renderItem={({ item }) => this.renderOption(item)}
                    keyExtractor={o => o.product_option_value_id}
                    horizontal
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: normalize(40,'height'), width: normalize(70),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: normalize(10),
        backgroundColor: '#fff'
    }
});

export default RadioGroup;