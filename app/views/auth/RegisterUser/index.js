import React from 'react';
import {View, Picker} from 'react-native';
import {SocialIcon, Text} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import ViewStyles from '../styles';
import PriamryButton from '../../../common/UI/PrimaryButton';
import {
  Container,
  Content,
  Item,
  Icon,
  Label,
  Grid,
  Row,
  Col,
  Input,
  Form,
} from 'native-base';
import SkipButton from '../SkipButton';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
import {connect} from 'react-redux';
import {Register} from '../../../actions/AuthActions';
import TextInput from '../../../common/Forms/TextInput';
import {TranslateString, ChooseStringByLanguage} from '../../../util';
import SocialLogin from '../SocialLogin';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import CommonStyles from '../../../common/styles';

class RegistrationView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'دخول جديد',
  };
  constructor(props) {
    super(props);
    // let R = Math.random() * 100;
    //R = parseInt(R) + "r@r.com";
    this.state = {
      passwordVisible: false,
      firstname: '',
      lastname: '',
      email: '',
      telephone: '',
      password: '',
      confirm: '',
      agree: 1,
    };
  }
  renderCountries() {
    if (this.props.countries)
      return this.props.countries.map(i => (
        <Picker.Item label={i.name} value={i.country_id} />
      ));
    else return [];
  }
  onRegisterPress() {
    let body = {...this.state};
    this.props.Register(body, () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'mainFlow'})],
      });
      this.props.navigation.dispatch(resetAction);
    });
  }
  render() {
    return (
      <Container>
        <Content
          style={{backgroundColor: StylesConstant.BackgroundColor}}
          scrollEnabled={true}
          padder={true}
        >
          <View style={{padding: 0, marginBottom: normalize(25, 'height')}}>
            <LoadingIndicator visible={this.props.loading} />
            <Form>
              <Grid>
                <Row>
                  <Col size={5}>
                    <TextInput
                      IconName="name"
                      IconType="local"
                      Label={TranslateString('entry_firstname')}
                      Value={this.state.firstname}
                      ErrorMessage={this.props.pageData.error_firstname}
                      onChangeText={firstname => this.setState({firstname})}
                    />
                  </Col>
                  <Col
                    size={0.1}
                    style={{backgroundColor: StylesConstant.BackgroundColor}}
                  ></Col>
                  <Col size={5}>
                    <TextInput
                      Label={TranslateString('entry_lastname')}
                      Value={this.state.lastname}
                      ErrorMessage={this.props.pageData.error_lastname}
                      onChangeText={lastname => this.setState({lastname})}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput
                      IconName="email"
                      IconType="local"
                      Label={TranslateString('entry_email')}
                      Value={this.state.email}
                      ErrorMessage={this.props.pageData.error_email}
                      onChangeText={email => this.setState({email})}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput
                      IconName="phone"
                      IconType="local"
                      Label={TranslateString('entry_telephone')}
                      Value={this.state.telephone}
                      ErrorMessage={this.props.pageData.error_telephone}
                      onChangeText={telephone => this.setState({telephone})}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col size={7}>
                    <TextInput
                      IconName="password"
                      IconType="local"
                      Label={TranslateString('entry_password')}
                      secureTextEntry={!this.state.passwordVisible}
                      Value={this.state.password}
                      ErrorMessage={this.props.pageData.error_password}
                      onChangeText={t =>
                        this.setState({password: t, confirm: t})
                      }
                      pass
                    />
                  </Col>
                  <Col
                    size={2}
                    style={[
                      {
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                      },
                      CommonStyles.LightShadow,
                    ]}
                  >
                    <Text
                      onPress={() =>
                        this.setState(p => ({
                          passwordVisible: !p.passwordVisible,
                        }))
                      }
                      style={{
                        color: StylesConstant.MainColor,
                        marginTop: normalize(10, 'height'),
                      }}
                    >
                      {this.state.passwordVisible
                        ? ChooseStringByLanguage('hide', 'إخفاء')
                        : ChooseStringByLanguage('show', 'إظهار')}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </Form>
          </View>

          <PriamryButton
            style={{
              marginBottom: normalize(25, 'height'),
              backgroundColor: StylesConstant.MainColor,
            }}
            Title={TranslateString('text_register')}
            onPress={() => this.onRegisterPress()}
            Rig
          />

          <Text
            style={{
              fontFamily: StylesConstant.FontFamily,
              marginBottom: normalize(25, 'height'),
              alignSelf: 'center',
            }}
          >
            ــــــــــــــــــ{' '}
            {ChooseStringByLanguage('or login with', 'أول أدخل عبر')}{' '}
            ــــــــــــــــــ
          </Text>
          <SocialLogin navigation={this.props.navigation} />
          <SkipButton />
          <View style={{height: 20, width: '100%'}}></View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.settings.countries,
  translations: state.settings.translations,
  pageData: state.auth.registerForm,
  loading: state.auth.loading,
});
const mapDispatchToProps = dispatch => ({
  Register: (body, cb) => dispatch(Register(body, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationView);
