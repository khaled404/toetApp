import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import DocumentPicker from 'react-native-document-picker';
import FormData from 'form-data';
class FileUpload extends React.Component {
    constructor(props){
        super(props);
        this.state=  {
            buttonText : props.name
        };
    }
    onUploadPress() {
        DocumentPicker.pick().then(e => {
            this.setState({buttonText:e.name});

            let data = new FormData();
            data.append('file', {
                name: e.name,
                type:e.type,
                uri: e.uri,
            });
            this.props.UploadFile(this.props.product_option_id,data);
            
        })
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.onUploadPress()} style={[styles.button]}>
                    <Text> {this.state.buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: normalize(40, 'height'), width: normalize(170),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderWidth: 1,
        borderColor: '#a6a6a6',
        borderRadius: normalize(10),
        backgroundColor: '#fff'
    }
});
export default FileUpload;