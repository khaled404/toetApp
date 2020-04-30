/*
 * this will a global filter componenet for manfucture/category details screens.
 * we are going to use redux to point the props to the right page.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import StylesConstant from '../../constants/styles';
import CommonStyles from '../styles';
import normalize from 'react-native-normalize';
import {RemoveHTMLFromString, ChooseStringByLanguage} from '../../util';
class ProductFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }
  handleSortClick(item) {
    this.setState({
      isVisible: false,
    });
    this.props.filterProducts(this.props.id, item.value);
  }
  renderSort(item) {
    let currentSort = `${this.props.sort}-${this.props.order}` === item.value;
    return (
      <TouchableOpacity
        onPress={() => this.handleSortClick(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 5,
          marginVertical: 0,
          justifyContent: 'space-between',
        }}
      >
        <Icon
          type="material-community"
          name={currentSort ? 'check-circle' : 'circle-outline'}
          size={20}
          color={currentSort ? StylesConstant.ColorScandre : '#515C6F'}
        />

        <Text
          style={[
            {alignSelf: 'flex-start', width: '88%'},
            CommonStyles.RegularSize,
          ]}
        >
          {RemoveHTMLFromString(item.text)}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({isVisible: true})}>
          <Icon
            type="material-community"
            name="sort-variant"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .4)"
          overlayBackgroundColor="white"
          overlayStyle={{borderRadius: 10}}
          onBackdropPress={() => this.setState({isVisible: false})}
          width={350}
          height={400}
        >
          <Text
            style={[
              {alignSelf: 'flex-start', marginBottom: normalize(15, 'height')},
              CommonStyles.RegularSize,
            ]}
          >
            {ChooseStringByLanguage('Order by ...', 'رتب حسب...')}
          </Text>
          {this.props.sorts?.map(e => this.renderSort(e))}
        </Overlay>
      </View>
    );
  }
}

export default withNavigation(ProductFilter);
