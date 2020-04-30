import React from 'react';
import {View, Text} from 'react-native';
import SafeView from '../../../common/UI/SafeView';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Form,
  CheckBox,
  Body,
  List,
  Footer,
} from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import {ToggleNewLetter} from '../../../actions/AuthActions';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import {TranslateString} from '../../../util';

class NewsletterScreen extends React.Component {
  static navigationOptions = {
    header: <HeaderWithBack TitleKey="text_account_account_newsletter" />,
  };
  constructor(props) {
    super(props);
    console.log(props.subscriped);
    this.state = {
      subscriped: props.subscriped,
    };
  }
  ToggleSubscrption(subscription) {
    //this.props.toggleNewLetter(subscription);
    this.setState({
      subscriped: subscription,
    });
  }

  render() {
    return (
      <Container>
        <Content
          padder
          style={{backgroundColor: StylesConstant.BackgroundColor}}
        >
          <Text style={[{lineHeight: 22}, CommonStyles.FontFamilyBold]}>
            {TranslateString('text_newsletter')}
          </Text>
          <ListItem>
            <Body>
              <Text>{TranslateString('entry_newsletter')}</Text>
            </Body>
            <Radio
              onPress={() => this.ToggleSubscrption('1')}
              selected={this.state.subscriped === '1'}
              selectedColor={StylesConstant.ColorScandre}
            />
          </ListItem>
          <ListItem style={{borderBottomWidth: 0}}>
            <Body>
              <Text>{global.IsRtl ? ' لا أريد الإشتراك ' : 'Unsubscripe'}</Text>
            </Body>
            <Radio
              onPress={() => this.ToggleSubscrption('0')}
              selected={this.state.subscriped === '0'}
              selectedColor={StylesConstant.ColorScandre}
            />
          </ListItem>
        </Content>
        <Footer style={{backgroundColor: StylesConstant.BackgroundColor}}>
          <Content>
            <PrimaryButton
              onPress={() => this.props.toggleNewLetter(this.state.subscriped)}
              Title={TranslateString('text_edit')}
              style={{marginBottom: normalize(10, 'height'), width: '60%'}}
            />
          </Content>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({subscriped: state.auth.newsLetter || '0'});
const mapDispatchToProps = dispatch => ({
  toggleNewLetter: s => dispatch(ToggleNewLetter(s)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsletterScreen);
