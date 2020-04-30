import React from 'react';
import {View} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Image, SocialIcon, Text} from 'react-native-elements';
import {LoginNormal} from '../../../actions/AuthActions';
import SafeView from '../../../common/UI/SafeView';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import CommonStyles from '../../../common/styles';
import ViewStyles from '../styles';
import PriamryButton from '../../../common/UI/PrimaryButton';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import StylesConstant from '../../../constants/styles';
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
import normalize from 'react-native-normalize';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';
import TextInput from '../../../common/Forms/TextInput';
import {TranslateString, ChooseStringByLanguage} from '../../../util';
import SocialLogin from '../SocialLogin';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
class LoginView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'دخول',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      //email: '',
      //password: ''
    };
  }
  componentDidMount() {
    if (this.props.isUserLoggedIn || this.props.skipLogin) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'mainFlow'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  onLoginPress() {
    let body = {...this.state};
    this.props.LoginNormal(body, () => {
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
          scrollEnabled={false}
          padder={true}
        >
          <View
            style={[
              {
                padding: 0,
                marginBottom: normalize(25, 'height'),
                flex: 1,
                flexGrow: 0,
              },
            ]}
          >
            <LoadingIndicator visible={this.props.loading} />
            <Grid>
              <Row>
                <Col>
                  <TextInput
                    IconName="email"
                    IconType="local"
                    Label={TranslateString('entry_email')}
                    Value={this.state.email}
                    onChangeText={t => this.setState({email: t})}
                  />
                </Col>
              </Row>
              <Row>
                <Col size={8}>
                  <TextInput
                    IconName="password"
                    IconType="local"
                    Label={TranslateString('entry_password')}
                    secureTextEntry
                    Value={this.state.password}
                    onChangeText={t => this.setState({password: t})}
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
                      this.props.navigation.navigate('forgetpassword')
                    }
                    style={{
                      color: StylesConstant.MainColor,
                    }}
                  >
                    {ChooseStringByLanguage('Forgot?', 'نسيت ؟')}
                  </Text>
                </Col>
              </Row>
            </Grid>
          </View>

          <PriamryButton
            style={{marginBottom: normalize(25, 'height')}}
            Title={TranslateString('text_login')}
            onPress={() => this.onLoginPress()}
            logIn
          />

          <Text
            style={{alignSelf: 'center', marginBottom: normalize(25, 'height')}}
          >
            ــــــــــــــــــ{' '}
            {ChooseStringByLanguage('or login with', 'أول أدخل عبر')}{' '}
            ــــــــــــــــــ
          </Text>
          <SocialLogin navigation={this.props.navigation} />

          <SkipButton />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isUserLoggedIn: state.auth.isLoggedIn,
  skipLogin: state.auth.skipLogin,
  loading: state.auth.loading,
});
const mapDispatchToProps = dispatch => ({
  LoginNormal: (body, cb) => dispatch(LoginNormal(body, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
