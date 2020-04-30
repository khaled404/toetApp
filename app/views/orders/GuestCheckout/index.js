import React from 'react';
import { View, Text, Picker } from 'react-native';
import { GetCookie, TranslateString } from '../../../util';
import { BASEURI } from '../../../constants/AppInfo';
import axios from 'axios';
import StylesConstant from '../../../constants/styles';
import { ValidateGuest } from '../../../actions/CheckoutActions';
import { Container, Header, Button, Title, Content, Form, Item, Input, Label, Grid, Col, Row, Icon } from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import { connect } from 'react-redux';
import normalize from 'react-native-normalize';
import { object } from 'prop-types';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import DropdownList from '../../../common/Forms/DropdownList';
import TextInput from '../../../common/Forms/TextInput';

class AddressEditor extends React.Component {
    static navigationOptions = {
        header: (<HeaderWithBack TitleKey="text_checkout_visitor" />)
    }
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            address_1: "",
            email: "",
            telephone: "",
            country_id: "",
            country: "",
            zone_id: "",
            zone: "",
            zones: [],
            city: "",
            showErrors: false,
        }
    }
    onSavePress() {

        if (this.validateState()) {
            const body = { ...this.state };
            delete body.zones;
            this.props.ValidateGuest(body, () => {
                this.props.navigation.navigate("checkout");
            });
        }

    }
    validateState() {
        this.setState({ showErrors: true })
        let valid = true;
        let keys = Object.keys(this.state);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (this.state[key] === "" || this.state[key] === "default") {
                valid = false;
            }

        }
        return valid;
    }

    renderCountries() {
        let countries = this.props.countries ?.map(i => ({ label: i.name, value: i.country_id }));
        countries.unshift({ value: "default", label: TranslateString("entry_country") });
        return countries;
    }
    renderZones() {

        if (this.state.zones.length === 0)
            return [{ label: TranslateString("entry_zone"), value: "default" }];
        return this.state.zones.map(i => ({ label: i.name, value: i.zone_id }));
    }
    async onCountryChange(val, i) {
        let cookie = await GetCookie();
        let response = await axios.get(`${BASEURI}ocapi/localisation/zones&country_id=${val}&cookie=${cookie}`);
        let countryName = this.props.countries[i].name;
        this.setState({ country_id: val, zones: response.data.zone, zone_id: response.data.zone[0].zone_id, country: countryName })
    }
    render() {
        return (
            <Content padder style={{ backgroundColor: StylesConstant.BackgroundColor, paddingHorizontal: 10 }}>
                <ViewWithShadow style={{ marginTop: normalize(20, 'height'), paddingVertical: 10 }}>
                    <Grid>
                        <Row>
                            <Col>
                                <TextInput
                                    ErrorMessage={this.state.firstname === "" && this.state.showErrors}
                                    Label={TranslateString("entry_firstname")}
                                    Value={this.state.firstname}
                                    onChangeText={(t) => this.setState({ firstname: t })}
                                />
                            </Col>
                            <Col>
                                <TextInput
                                    ErrorMessage={this.state.lastname === "" && this.state.showErrors}
                                    Label={TranslateString("entry_lastname")}
                                    Value={this.state.lastname}
                                    onChangeText={(t) => this.setState({ lastname: t })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput
                                    ErrorMessage={this.state.email === "" && this.state.showErrors}
                                    Label={TranslateString("entry_email")}
                                    Value={this.state.email}
                                    onChangeText={(t) => this.setState({ email: t })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput
                                    ErrorMessage={this.state.telephone === "" && this.state.showErrors}
                                    Label={TranslateString("entry_telephone")}
                                    Value={this.state.telephone}
                                    onChangeText={(t) => this.setState({ telephone: t })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput
                                    ErrorMessage={this.state.address_1 === "" && this.state.showErrors}
                                    Label={TranslateString("entry_address_1")}
                                    Value={this.state.address_1}
                                    onChangeText={(t) => this.setState({ address_1: t })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DropdownList
                                    data={this.renderCountries()}
                                    onChangeText={(val, i) => this.onCountryChange(val, i)}
                                    label={TranslateString("entry_country")}
                                    error={this.state.country_id !== "default" && this.state.showErrors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DropdownList
                                    data={this.renderZones()}
                                    onChangeText={(zone_id, i) => this.setState({ zone_id, zone: this.state.zones[i].name })}
                                    label={TranslateString("entry_zone")}
                                    error={this.state.zone_id !== "default" && this.state.showErrors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput
                                    ErrorMessage={this.state.city === "" && this.state.showErrors}
                                    Label={TranslateString("entry_city")}
                                    Value={this.state.city}
                                    onChangeText={(t) => this.setState({ city: t })}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </ViewWithShadow>
                <View style={{ height: normalize(30, 'height') }}></View>
                <PrimaryButton onPress={() => this.onSavePress()} Title={TranslateString("text_continue")} />
            </Content>


        );
    }
}

const mapStateToProps = state => ({
    countries: state.settings.countries,
    loading: state.checkout.loading
});
const mapDispatchToProps = dispatch => ({
    ValidateGuest: (body, cb) => dispatch(ValidateGuest(body, cb))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddressEditor);