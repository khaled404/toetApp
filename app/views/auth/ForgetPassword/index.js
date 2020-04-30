import React from 'react';
import {View, Text} from 'react-native';
import StylesConstant from '../../../constants/styles';
import {BASEURI} from '../../../constants/AppInfo';
import ViewStyles from '../styles';
import PriamryButton from '../../../common/UI/PrimaryButton';
import CommonStyles from '../../../common/styles';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  Label,
  Form,
  Grid,
  Row,
  Col,
} from 'native-base';
import {connect} from 'react-redux';
import TextInput from '../../../common/Forms/TextInput';
import {
  TranslateString,
  GetCookie,
  ChooseStringByLanguage,
} from '../../../util';
import Axios from 'axios';

class ForgetPasswordView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'نسيت كلمة المرور',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error_email: undefined,
      success: false,
      buttonText: '',
    };
  }
  async onPress() {
    try {
      let cookie = await GetCookie();
      let body = {email: this.state.email};

      let response = await Axios.post(
        `${BASEURI}ocapi/account/forgotten&cookie=${cookie}`,
        body,
      );
      let data = response.data;
      if (data.hasOwnProperty('success')) {
        if (data.success) {
          this.setState({
            success: true,
            buttonText: data.success,
            error_email: undefined,
          });
        }
      } else {
        if (data.error_warning !== '') {
          this.setState({error_email: data.error_warning});
        }
      }
    } catch (error) {
      connect.log(error);
    }
  }
  render() {
    return (
      <Container>
        <Content
          style={{backgroundColor: StylesConstant.BackgroundColor}}
          scrollEnabled={false}
          padder={true}
        >
          <Text style={{fontFamily: StylesConstant.FontFamily}}>
            {ChooseStringByLanguage(
              'Enter your email to reset your password',
              'ادخل بريدك المُسجّل لإستعادة كلمة المرور',
            )}
          </Text>
          <View style={{marginVertical: 20, padding: 0, paddingHorizontal: 10}}>
            <Form>
              <Grid>
                <Row>
                  <Col size={9}>
                    <Col>
                      <TextInput
                        IconName="email"
                        IconType="local"
                        Label={TranslateString('entry_email')}
                        Value={this.state.email}
                        ErrorMessage={this.state.error_email}
                        onChangeText={email => this.setState({email})}
                      />
                    </Col>
                  </Col>
                </Row>
              </Grid>
            </Form>
          </View>
          <PriamryButton
            disabled={this.state.success}
            onPress={() => this.onPress()}
            Title={TranslateString('text_forgot_button')}
            logIn
          />
          {this.state.success ? (
            <Text
              style={[
                {color: 'darkgreen', alignSelf: 'center', marginTop: 15},
                CommonStyles.RegularSize,
                CommonStyles.FontFamilyBold,
              ]}
            >
              {this.state.buttonText}
            </Text>
          ) : null}
        </Content>
      </Container>
    );
  }
}
export default connect()(ForgetPasswordView);
