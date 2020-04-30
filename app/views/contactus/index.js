import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Keyboard,
} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import StylesConstant from '../../constants/styles';
import HeaderWithBack from '../../common/NavComponenets/headers/HeaderWithBack';
import {
  Container,
  Content,
  Grid,
  Row,
  Col,
  Form,
  Item,
  Input,
  Label,
  Textarea,
} from 'native-base';
import normalize from 'react-native-normalize';
import {BASEURI} from '../../constants/AppInfo';
import Axios from 'axios';
import ViewWithShadow from '../../common/UI/ViewWithShadow';
import PrimaryButton from '../../common/UI/PrimaryButton';
import CommonStyles from '../../common/styles';
import Toast from 'react-native-root-toast';
import {TranslateString} from '../../util';
import TextInput from '../../common/Forms/TextInput';
class contactUsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let title = navigation.getParam('heading_title');
    return {header: <HeaderWithBack Title={title} />};
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error_name: '',
      error_email: '',
      error_enquiry: '',
      entry_name: '',
      entry_email: '',
      entry_enquiry: '',
      store: '',
      address: '',
      telephone: '',
      email: '',
      button_submit: '',
      inputEmail: '',
      inputName: '',
      inputEqnuiry: '',
      text_success: '',
      contact: {
        phone: '',
        email: '',
        snapchat: '',
        twitter: '',
        instagram: '',
        maroof: '',
        facebook: '',
        address: '',
        opening: '',
      },
    };
  }
  componentDidMount() {
    Axios.get(`${BASEURI}information/contact`).then(({data}) => {
      const {
        error_name,
        error_email,
        error_enquiry,
        entry_name,
        entry_email,
        entry_enquiry,
        store,
        address,
        button_submit,
        telephone,
        text_success,
        email,
        heading_title,
      } = data;
      this.props.navigation.setParams({heading_title: heading_title});

      this.setState({
        error_name,
        error_email,
        error_enquiry,
        entry_name,
        entry_email,
        entry_enquiry,
        store,
        address,
        telephone,
        text_success,
        email,
        button_submit,
        loading: false,
      });
    });
    Axios.get(`${BASEURI}ocapi/me`).then(({data}) => {
      const {contact} = data;
      this.setState({
        contact,
      });
    });
  }
  onSendPress() {
    Keyboard.dismiss();
    let body = {
      email: this.state.inputEmail,
      name: this.state.inputName,
      enquiry: this.state.inputEqnuiry,
    };
    Axios.post(`${BASEURI}information/contact`, body).then(({data}) => {
      if (data.hasOwnProperty('continue')) {
        this.setState({
          inputEmail: '',
          inputName: '',
          inputEqnuiry: '',
          error_name: '',
          error_email: '',
          error_enquiry: '',
        });
        this.nameRef.Clear();
        this.emailRef.Clear();
        this.inquiryRef.Clear();
        Toast.show(this.state.text_success);
      } else {
        const {error_name, error_email, error_enquiry} = data;
        this.setState({
          error_name,
          error_email,
          error_enquiry,
        });
      }
    });
  }
  _renderSocialIcons() {
    return (
      <Row>
        {this._renderIcon('snapchat')}
        {this._renderIcon('twitter')}
        {this._renderIcon('instagram')}
        {this._renderIcon('facebook')}
      </Row>
    );
  }
  _renderIcon(type) {
    if (this.state.contact[type] === '' || this.state.contact[type] === null)
      return null;
    return (
      <SocialIcon
        style={{
          width: 30,
          height: 30,
          backgroundColor: 'rgba(0,0,0,0)',
          margin: 0,
        }}
        light
        raised={false}
        onPress={() => Linking.openURL(this.state.contact[type])}
        type={type}
      />
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.Center, {flex: 1}]}>
          <ActivityIndicator />
        </View>
      );
    }
    let Logo = require('../../../assets/img/logo-lg.png');
    return (
      <Container>
        <Content
          style={{backgroundColor: StylesConstant.BackgroundColor}}
          padder
        >
          <Grid>
            <Row style={{marginTop: 20}}>
              <Text style={styles.SecionTitle}>
                {TranslateString('information_contact_details')}{' '}
              </Text>
            </Row>
            <Row
              style={{
                height: normalize(130, 'height'),
              }}
            >
              <View style={{alignItems: 'center', marginHorizontal: 10}}>
                <Image
                  source={Logo}
                  style={{width: 120, height: 120}}
                  resizeMode="contain"
                />
              </View>
              <Col style={[styles.Center, {alignItems: 'flex-start'}]}>
                <Text
                  style={[
                    CommonStyles.FontFamilyBold,
                    CommonStyles.RegularSize,
                  ]}
                >
                  {this.state.store}
                </Text>
                <Text style={[{fontSize: 12}, CommonStyles.FontFamilyMedium]}>
                  {this.state.contact.address}
                </Text>
                <Text style={[{fontSize: 12}, CommonStyles.FontFamilyMedium]}>
                  {this.state.contact.opening}
                </Text>
                <Text style={[{fontSize: 12}, CommonStyles.FontFamilyMedium]}>
                  {this.state.contact.phone}
                </Text>
                <Text style={[{fontSize: 12}, CommonStyles.FontFamilyMedium]}>
                  {this.state.contact.email}
                </Text>
                {this._renderSocialIcons()}
              </Col>
            </Row>
            <Row style={{marginBottom: 10}}>
              <Text style={styles.SecionTitle}>
                {TranslateString('information_contact_send_enquiry')}{' '}
              </Text>
            </Row>

            <Row>
              <Col>
                <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
                  <Row>
                    <Col>
                      <TextInput
                        ref={r => (this.nameRef = r)}
                        Label={this.state.entry_name}
                        Value={this.state.inputName}
                        ErrorMessage={this.state.error_name}
                        onChangeText={inputName => this.setState({inputName})}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextInput
                        ref={r => (this.emailRef = r)}
                        Label={this.state.entry_email}
                        Value={this.state.inputEmail}
                        ErrorMessage={this.state.error_email}
                        onChangeText={inputEmail => this.setState({inputEmail})}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextInput
                        ref={r => (this.inquiryRef = r)}
                        Label={this.state.entry_enquiry}
                        Value={this.state.inputEqnuiry}
                        ErrorMessage={this.state.error_enquiry}
                        onChangeText={inputEqnuiry =>
                          this.setState({inputEqnuiry})
                        }
                      />
                    </Col>
                  </Row>
                </View>
              </Col>
            </Row>
            <Row
              style={[
                styles.Center,
                {height: normalize(70, 'height'), alignItems: 'flex-end'},
              ]}
            >
              <PrimaryButton
                onPress={() => this.onSendPress()}
                Title={this.state.button_submit}
              />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecionTitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  Input: {
    width: '100%',
    fontFamily: StylesConstant.FontFamily,
  },
});
export default contactUsScreen;
