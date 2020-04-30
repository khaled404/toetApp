import React from 'react';
import {View, Text} from 'react-native';
import {TranslateString} from '../../../util';
import StylesConstant from '../../../constants/styles';
import {Grid, Row, Icon, CheckBox} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';

import CommonStyles from '../../../common/styles';
import PrimaryButton from '../../../common/UI/PrimaryButton';
const SECTIONS = [
  {
    title: 'First',
    content: ['Lorem ipsum...', 'ipsum...'],
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];
class SearchDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      filter_category: props.filter_category || [],
    };
  }
  createDataArray() {
    if (typeof this.props.filter_groups === 'undefined') return [];

    let dataArray = [];
    for (let i = 0; i < this.props.filter_groups.length; i++) {
      const group = this.props.filter_groups[i];
      let title = group.name;
      let content = [];
      for (let j = 0; j < group.filter.length; j++) {
        const filter = group.filter[j];
        content.push({name: filter.name, filter_id: filter.filter_id});
      }
      dataArray.push({title, content});
    }
    return dataArray;
  }
  clearChoices = () => {
    this.setState({
      filter_category: [],
    });
  };
  onCheckboxPress(filter_id) {
    let newFilter = [...this.state.filter_category];

    if (newFilter.indexOf(filter_id) === -1) newFilter.push(filter_id);
    else newFilter = newFilter.filter(e => e !== filter_id);

    this.setState({
      filter_category: newFilter,
    });
  }

  _renderHeader = (section, i, active) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 35,
        }}
      >
        <Text style={[{color: '#515C6F'}, CommonStyles.FontFamilyMedium]}>
          {section.title}
        </Text>
        {active ? (
          <Icon
            style={[{fontSize: 18}, CommonStyles.MainColor]}
            name="remove"
          />
        ) : (
          <Icon style={[{fontSize: 18}, CommonStyles.MainColor]} name="add" />
        )}
      </View>
    );
  };

  _renderContent = section => {
    return section.content.map(({name, filter_id}) => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{color: '#515C6F'}}>{name}</Text>
        <CheckBox
          color={StylesConstant.MainColor}
          checked={this.state.filter_category.indexOf(filter_id) != -1}
          onPress={() => this.onCheckboxPress(filter_id)}
        />
      </View>
    ));
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };
  render() {
    return (
      <View
        style={[
          {flex: 1, backgroundColor: '#fff', marginTop: 54, padding: 10},
          CommonStyles.MediumShadow,
        ]}
      >
        <Grid>
          <Row style={{justifyContent: 'space-between', height: 55}}>
            <Text
              style={[
                {fontSize: 12, color: '#515C6F'},
                CommonStyles.FontFamilyMedium,
              ]}
            >
              {TranslateString('text_filter_products')}
            </Text>
            <Text
              onPress={() => this.clearChoices()}
              style={[
                {fontSize: 12},
                CommonStyles.FontFamilyMedium,
                CommonStyles.MainColor,
              ]}
            >
              {TranslateString('button_cancel')}
            </Text>
          </Row>
          <Row>
            <Accordion
              containerStyle={[{flex: 1}]}
              underlayColor="#fff"
              sections={this.createDataArray()}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              expandMultiple
            />
          </Row>
        </Grid>
        <PrimaryButton
          onPress={() => this.props.onFilterChange(this.state.filter_category)}
          Title={TranslateString('text_filter_products')}
        />
      </View>
    );
  }
}
export default SearchDrawer;
