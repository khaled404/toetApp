import React from 'react';
import {View, Text} from 'react-native';
import SafeView from '../../common/UI/SafeView';
import StylesConstant from '../../constants/styles';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Grid,
  Col,
  Row,
  Icon,
} from 'native-base';
import ViewWithShadow from '../../common/UI/ViewWithShadow';
import PrimaryButton from '../../common/UI/PrimaryButton';
import HeaderWithBack from '../../common/NavComponenets/headers/HeaderWithBack';
import normalize from 'react-native-normalize';
import {TranslateString} from '../../util';
import CommonStyles from '../../common/styles';
export default class extends React.Component {
  static navigationOptions = {
    header: <HeaderWithBack TitleKey="menu_account" />,
  };
  constructor(props) {
    super(props);
    this.state = {
      Items: [
        {
          Text: TranslateString('text_account_account_edit'),
          NavigateTo: 'accountinfo',
        },
        {
          Text: TranslateString('text_account_account_password'),
          NavigateTo: 'passwordchange',
        },
        {
          Text: TranslateString('text_account_account_downloads'),
          NavigateTo: 'digitalfiles',
        },
        {
          Text: TranslateString('menu_reward'),
          NavigateTo: 'rewards',
        },
        {
          Text: TranslateString('returns_heading_title'),
          NavigateTo: 'refunds',
        },
        {
          Text: TranslateString('text_account_account_transaction'),
          NavigateTo: 'mybalance',
        },
        {
          Text: TranslateString('text_account_account_newsletter'),
          NavigateTo: 'newsletter',
        },
      ],
    };
  }
  _renderItem(item) {
    let icon = global.IsRtl ? 'chevron-left' : 'chevron-right';

    return (
      <Row onTouchEnd={() => this.props.navigation.navigate(item.NavigateTo)}>
        <Col>
          <View
            style={{
              //   height: normalize(44, 'height'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 2,
              borderRadius: 5,
              backgroundColor: '#fff',
              marginBottom: 10,
              paddingHorizontal: 10,
              paddingVertical: 16,
            }}
          >
            <Text
              style={[CommonStyles.FontFamilyMedium, CommonStyles.RegularSize]}
            >
              {item.Text}
            </Text>
            <View
              style={{
                backgroundColor: '#efefef',
                width: normalize(20),
                height: normalize(20),
                borderRadius: normalize(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                onPress={() => this.props.navigation.navigate(item.NavigateTo)}
                name={icon}
                type="FontAwesome"
                style={{
                  fontSize: normalize(10),
                  marginLeft: normalize(4),
                  color: '#727C8E',
                }}
              />
            </View>
          </View>
        </Col>
      </Row>
    );
  }
  render() {
    return (
      <SafeView>
        <Content style={{backgroundColor: StylesConstant.BackgroundColor}}>
          <Form>
            <Grid>{this.state.Items.map(e => this._renderItem(e))}</Grid>
          </Form>
        </Content>
      </SafeView>
    );
  }
}
