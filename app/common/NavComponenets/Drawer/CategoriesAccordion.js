import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {Grid, Row, Icon, CheckBox} from 'native-base';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {TranslateString} from '../../../util';
import CommonStyles from '../../../common/styles';
import normalize from 'react-native-normalize';

import LocalIcon from '../../../common/Icons/LocalIcon';
import StylesConstant from '../../../constants/styles';

class CategoriesAccordion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
    };
  }

  _renderHeader = (section, i, active) => {
    return (
      <View
        style={{
          zIndex: 999,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: normalize(15, 'height'),
          justifyContent: 'space-between',
        }}
      >
        {/* <Text style={[{ color: '#515C6F' }, CommonStyles.FontFamilyMedium]}>{TranslateString("menu_categories")}</Text> */}
        <View style={{flexDirection: 'row'}}>
          <LocalIcon name="nav_categories" size={18} />
          <Text
            style={{
              fontSize: normalize(17),
              marginLeft: normalize(17),
              color: '#727C8E',
            }}
          >
            {TranslateString('menu_categories')}
          </Text>
        </View>

        {active ? (
          <Icon
            style={[
              {
                fontSize: 12,
                marginRight: 11,
                color: StylesConstant.ColorScandre,
              },
            ]}
            name="chevron-up"
            type="FontAwesome"
          />
        ) : (
          <Icon
            style={[
              {
                fontSize: 12,
                marginRight: 11,
                color: StylesConstant.ColorScandre,
              },
            ]}
            name="chevron-down"
            type="FontAwesome"
          />
        )}
      </View>
    );
  };
  _renderContent = section => {
    return section.content.map(({name, category_id}) => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text
          onPress={() =>
            this.props.navigation.navigate('categorydetails', {
              category_id: category_id,
            })
          }
          style={{color: '#515C6F', fontSize: 13}}
        >
          - {name}
        </Text>
      </View>
    ));
  };
  getSections() {
    return [
      {
        title: 'a',
        content: this.props.categories.map(item => ({
          name: item.name,
          category_id: item.category_id,
        })),
      },
    ];
  }
  _updateSections = activeSections => {
    this.setState({activeSections});
  };
  render() {
    return (
      <Accordion
        underlayColor="#fff"
        sections={this.getSections()}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const mapStateToProps = state => ({
  categories: state.shop.categoriesPage.categories,
});

export default connect(mapStateToProps)(CategoriesAccordion);
