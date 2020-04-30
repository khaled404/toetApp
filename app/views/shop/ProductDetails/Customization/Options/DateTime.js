import React from 'react';
import {View,Button,StyleSheet,TouchableOpacity,Text} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import normalize from 'react-native-normalize';
export default class DateTimePickerView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDateTimePickerVisible: false,
        Text:props.name
      };
    }
   
    showDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: true });
    };
   
    hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
    };
   
    handleDatePicked = date => {
      this.props.SetProductOption(this.props.product_option_id,date);
      let text = "";
      switch (this.props.type) {
        case "date":
          text = date.toLocaleDateString();
          break;
        case "datetime":
          text = date.toLocaleString();
          break;
        case "time":
          text = date.toLocaleTimeString();
          break;
      }
      this.setState({
        Text:text
      });
      this.hideDateTimePicker();
    };
   
    render() {
      return (
        <>
           <TouchableOpacity style={[styles.button]} onPress={this.showDateTimePicker}>
                <Text>{this.state.Text}</Text>
            </TouchableOpacity>
          <DateTimePicker    
            mode={this.props.type}        
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </>
      );
    }
  }
  
  const styles = StyleSheet.create({
    button: {
      height: normalize(40,'height'), width: normalize(170),
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
      borderWidth: 1,
      borderColor: '#a6a6a6',
      borderRadius: normalize(10),
      backgroundColor: '#fff'
  }
});