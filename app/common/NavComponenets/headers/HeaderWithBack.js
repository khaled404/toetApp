import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerActions,
  withNavigation,
  NavigationActions,
} from 'react-navigation';
import {GetIconDirection, TranslateString} from '../../../util';
import styles from '../../styles';
import StylesConstant from '../../../constants/styles';
class HeaderWithBack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let icon = global.IsRtl ? 'chevron-right' : 'chevron-left';
    let title = this.props.Title;
    if (this.props.TitleKey) title = TranslateString(this.props.TitleKey);
    return (
      <Header
        placement="left"
        containerStyle={{
          backgroundColor: StylesConstant.MainColor,
          marginTop: (StatusBar.currentHeight || 0) * -1,
          paddingHorizontal: 15,
        }}
        // leftComponent={ {  icon: icon, type:"font-awesome", size:17, color: '#fff',onPress:()=> this.props.navigation.goBack(null) }}
        leftComponent={
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon type="font-awesome" name={icon} size={17} color="#fff" />
          </TouchableOpacity>
        }
        // leftComponent={{ icon: 'menu', color: '#fff',onPress:()=> this.props.navigation.toggleDrawer() }}

        centerComponent={
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                {color: '#fff', fontSize: 17, marginLeft: 10},
                styles.FontFamilyBold,
                styles.RegularSize,
              ]}
            >
              {title}
            </Text>
          </View>
        }
        rightComponent={this.props.rightComponent}
      />
    );
  }
}

export default withNavigation(HeaderWithBack);
