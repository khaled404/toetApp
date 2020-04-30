import React from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {Grid, Row, Col} from 'native-base';
import StylesConstant from '../../../../constants/styles';
import Review from './Review';
import normalize from 'react-native-normalize';
import ViewWithShadow from '../../../../common/UI/ViewWithShadow';
import CommonStyles from '../../../../common/styles';
import PrimaryButton from '../../../../common/UI/PrimaryButton';
import TextInput from '../../../../common/Forms/TextInput';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import Axios from 'axios';
import {BASEURI} from '../../../../constants/AppInfo';
import Toast from 'react-native-root-toast';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_name: ' ',
      rating: undefined,
      entry_review: '',

      name_required: false,
      review_required: false,
      rating_required: false,
    };
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.nameRef.SetValue(`${this.props.firstname} ${this.props.lastname}`);
      this.setState({
        entry_name: `${this.props.firstname} ${this.props.lastname}`,
      });
    }
  }
  validate() {
    let name_required = true;
    let review_required = true;
    let rating_required = true;

    if (this.state.entry_name) name_required = false;

    if (this.state.entry_review) review_required = false;

    if (typeof this.state.rating !== 'undefined') rating_required = false;

    this.setState({
      name_required,
      review_required,
      rating_required,
    });

    return !name_required && !review_required && !rating_required;
  }
  submitReview() {
    if (this.validate()) {
      Axios.post(
        `${BASEURI}ocapi/product/product/write&product_id=${
          this.props.product_id
        }`,
        {
          name: this.state.entry_name,
          text: this.state.entry_review,
          rating: this.state.rating,
        },
      ).then(({data}) => {
        if (data.hasOwnProperty('error')) {
          Toast.show(data.error);
        } else {
          Toast.show(this.props.pageData.text_success);
          this.setState({
            entry_name: '',
            rating: undefined,
            entry_review: '',

            name_required: false,
            review_required: false,
            rating_required: false,
          });
          this.nameRef.Clear();
          this.reviewRef.Clear();
        }
      });
    }
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={[{fontSize: 12, marginBottom: 10}]}>
          {this.props.pageData.entry_review}
        </Text>
        <View style={{marginBottom: 10}}>
          <Grid>
            <Row>
              <Col>
                <TextInput
                  ref={r => (this.nameRef = r)}
                  ErrorMessage={this.state.name_required ? ' ' : undefined}
                  Label={this.props.pageData.entry_name}
                  Value={this.state.entry_name}
                  onChangeText={t => this.setState({entry_name: t})}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Row style={{marginVertical: 10, justifyContent: 'center'}}>
                  <StarRating
                    maxStars={5}
                    fullStarColor={StylesConstant.MainColor}
                    emptyStarColor="rgba(114, 124, 142, 1)"
                    starSize={15}
                    reversed={global.isRtl}
                    rating={this.state.rating}
                    selectedStar={rating =>
                      this.setState({
                        rating,
                      })
                    }
                  />
                </Row>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'red',
                    width: '100%',
                    marginTop: 5,
                    display: this.state.rating_required ? 'flex' : 'none',
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextInput
                  ref={r => (this.reviewRef = r)}
                  ErrorMessage={this.state.review_required ? ' ' : undefined}
                  Label={this.props.pageData.entry_review}
                  Value={this.state.entry_review}
                  isTextArea={true}
                  onChangeText={t => this.setState({entry_review: t})}
                />
              </Col>
            </Row>
          </Grid>
        </View>
        <PrimaryButton
          onPress={() => this.submitReview()}
          Title={this.props.pageData.entry_review}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.product.reviews,
  isLoggedIn: state.auth.isLoggedIn,
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
});
export default connect(mapStateToProps)(AddReview);
