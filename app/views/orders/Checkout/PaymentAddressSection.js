import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { withNavigation, ScrollView } from 'react-navigation';
import Address from '../../../common/Components/Address';
import styles from './styles';

import SectionButton from '../../../common/UI/SectionButton';
import CommonStyles from '../../../common/styles';

import { TranslateString } from '../../../util';
import { connect } from 'react-redux';
import { SetPaymentAddressId } from '../../../actions/CheckoutActions';
import normalize from 'react-native-normalize';
import PrimaryButton from '../../../common/UI/PrimaryButton';


class PaymentAddressSection extends React.Component {
    constructor(props) {
        super(props);
        this.onEditPress = this.onEditPress.bind(this);
        this.state = {
            address: {},
            payment_address_id: 0,
            isVisible: false
        }

    }
    componentDidUpdate(prevProps) {
        if (this.state.payment_address_id != this.props.payment_address_id) {
            let choosedAddress = this.props.addresses[this.props.payment_address_id];
            if (typeof (choosedAddress) !== "undefined")
                this.setState({
                    address: {
                        Name: `${choosedAddress.firstname} ${choosedAddress.lastname}`,
                        Street: `${choosedAddress.address_1}`,
                        City: `${choosedAddress.city}`,
                        Zone: `${choosedAddress.zone}`,
                        Country: `${choosedAddress.country}`
                    },
                    payment_address_id: this.props.payment_address_id
                });

        }
    }
    onEditPress() {
        let isVisible = !this.state.isVisible;
        this.setState({
            isVisible
        })
    }
    renderAddress(a) {
        let address = {
            Name: `${a.firstname} ${a.lastname}`,
            Street: `${a.address_1}`,
            City: `${a.city}`,
            Zone: `${a.zone}`,
            Country: `${a.country}`
        }
        return (
            <TouchableOpacity onPress={() => this.onAddressPress(a.address_id)} style={{ width: normalize(270), borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1, marginLeft: normalize(-4), paddingHorizontal: normalize(10), paddingVertical: normalize(10) }}>
                <Address Address={address} />
            </TouchableOpacity>);
    }
    onAddressPress(id) {
        this.setState({
            isVisible: false
        });
        this.props.SetPaymentAddressId(id);
    }
    render() {
        let content = null;
        if (this.props.addresses.length === 0) {
            content = <Text onPress={() => this.props.navigation.navigate("addressbook")} style={[CommonStyles.RegularSize, CommonStyles.FontFamilyBold, CommonStyles.MainColor]}>{TranslateString("text_address_add_new")}</Text>
        }
        else if (this.props.payment_address_id == "0") {
            content = <Text style={[CommonStyles.RegularSize, CommonStyles.FontFamilyBold]}>{TranslateString("text_checkout_select_address")}</Text>

        }
        else {
            content = (<Address Address={this.state.address} />);
        }
        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={this.onEditPress} style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={styles.SectionTitle}>{TranslateString("text_checkout_2_title")}</Text>
                    {content}
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <SectionButton onPress={this.onEditPress} />
                </View>
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="white"
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    width={normalize(280)}
                    height={normalize(400, 'height')}>
                    <Text>{TranslateString("text_checkout_select_address")}</Text>               
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <View style={{ justifyContent: 'flex-start' }}>
                        {Object.keys(this.props.addresses).map(e => this.renderAddress(this.props.addresses[e]))}
                        </View>
                        <View>
                            <PrimaryButton
                                onPress={() => { this.setState({ isVisible: false }); this.props.navigation.navigate("addressbook"); }}
                                Title={TranslateString("text_address_add_new")} />
                        </View>
                    </ScrollView>
                </Overlay>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    payment_address_id: state.checkout.payment_address_id,
    addresses: state.checkout.addresses
})
const mapDispatchToProps = dispatch => ({
    SetPaymentAddressId: (id) => dispatch(SetPaymentAddressId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAddressSection);
