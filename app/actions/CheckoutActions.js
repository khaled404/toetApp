import Axios from 'axios';
import * as Types from './CheckoutTypes';
import { BASEURI } from '../constants/AppInfo';
import Toast from 'react-native-root-toast';
export const StartLoading = () => ({ type: Types.START_LOADING });
export const EndLoading = () => ({ type: Types.END_LOADING });

export const InitCheckout = () => {

    return async dispatch => {
        dispatch(StartLoading());

        let listAddressResponse = await Axios.get(`${BASEURI}checkout/shipping_address`);
        const { addresses, address_id } = listAddressResponse.data;
        const { error_address, error_shipping, error_payment, error_agree, text_payment_method, text_shipping_method, button_confirm } = listAddressResponse.data;
        dispatch({ type: Types.LOAD_ADDRESSES_LIST, payload: addresses });

        dispatch({ type: Types.SET_DEFAULT_ADDRESS_ID, payload: address_id });
        dispatch({ type: Types.SET_SHIPPING_ADDRESS_ID, payload: address_id });
        dispatch({ type: Types.SET_PAYMNET_ADDRESS_ID, payload: address_id });

        //Validate with default address

        Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/shipping_address_validate`, {
            shipping_address: "existing",
            shipping_address_id: address_id
        });

        Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/payment_address_validate`, {
            payment_address: "existing",
            payment_address_id: address_id
        });

        let paymentMethodsPromise = Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/payment_method`);
        let shippingMethodPromise = Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/shipping_method`);

        const { shipping_methods, text_checkout_shipping_method, shipping_method_code } = (await shippingMethodPromise).data;
        const { text_checkout_payment_method, payment_methods, payment_method_code, agree_id, text_agree } = (await paymentMethodsPromise).data;

        dispatch({ type: Types.LOAD_PAYMENT_METHODS_LIST, payload: payment_methods });
        dispatch({ type: Types.SET_PAYMENT_METHOD, payload: payment_method_code });
        dispatch({ type: Types.LOAD_SHIPPING_METHODS_LIST, payload: shipping_methods });
        dispatch({ type: Types.SET_SHIPPING_METHOD, payload: shipping_method_code });
        dispatch({ type: Types.SET_AGREE_DATA, payload: { agree_id, text_agree } });
        let translates = {
            error_address,
            error_shipping,
            error_payment,
            error_agree,
            text_payment_method,
            text_shipping_method,
            text_checkout_shipping_method,
            text_checkout_payment_method,
            button_confirm
        };
        dispatch({ type: Types.SET_CHECKOUT_TRANSLATIONS, payload: translates });
        dispatch(EndLoading());

    }
}
export const InitGuestCheckout = (guestData) => {
    return async dispatch => {
        dispatch(StartLoading());
        let AddressList = {};
        let fakeAddressId = "1";
        let fakeAddress = {
            "address_id": fakeAddressId,
            "firstname": guestData.firstname,
            "lastname": guestData.lastname,
            "address_1": guestData.address_1,
            "city": guestData.city,
            "zone_id": guestData.zone_id,
            "zone": guestData.zone,
            "country_id": guestData.country_id,
            "country": guestData.country,
        };
        AddressList[fakeAddressId] = fakeAddress;


        let listAddressResponse = await Axios.get(`${BASEURI}checkout/shipping_address`);
        const { error_address, error_shipping, error_payment, error_agree, text_payment_method, text_shipping_method, button_confirm } = listAddressResponse.data;

        dispatch({ type: Types.LOAD_ADDRESSES_LIST, payload: AddressList });
        dispatch({ type: Types.SET_DEFAULT_ADDRESS_ID, payload: fakeAddressId });
        dispatch({ type: Types.SET_SHIPPING_ADDRESS_ID, payload: fakeAddressId });
        dispatch({ type: Types.SET_PAYMNET_ADDRESS_ID, payload: fakeAddressId });

        let methodPayload = { country_id: guestData.country_id, zone_id: guestData.zone_id };
        let paymentMethodsPromise = Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/payment_method`, methodPayload);
        let shippingMethodPromise = Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/shipping_method`, methodPayload);
        const { shipping_methods, text_checkout_shipping_method, shipping_method_code } = (await shippingMethodPromise).data;
        const { text_checkout_payment_method, payment_methods, payment_method_code, agree_id, text_agree } = (await paymentMethodsPromise).data;

        dispatch({ type: Types.LOAD_PAYMENT_METHODS_LIST, payload: payment_methods });
        dispatch({ type: Types.SET_PAYMENT_METHOD, payload: payment_method_code });
        dispatch({ type: Types.LOAD_SHIPPING_METHODS_LIST, payload: shipping_methods });
        dispatch({ type: Types.SET_SHIPPING_METHOD, payload: shipping_method_code });
        dispatch({ type: Types.SET_AGREE_DATA, payload: { agree_id, text_agree } });
        let translates = {
            error_address,
            error_shipping,
            error_payment,
            error_agree,
            text_payment_method,
            text_shipping_method,
            text_checkout_shipping_method,
            text_checkout_payment_method,
            button_confirm
        };

        dispatch({ type: Types.SET_CHECKOUT_TRANSLATIONS, payload: translates });
        dispatch(EndLoading());
    }
}


export const SetShippingAddressId = (shipping_address_id) => {
    return async dispatch => {
        dispatch({ type: Types.SET_SHIPPING_ADDRESS_ID, payload: shipping_address_id });
        await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/shipping_address_validate`, {
            shipping_address: "existing",
            shipping_address_id: shipping_address_id
        });
        let shippingMethodPromise = Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/shipping_method`);
        let shippingMethods = (await shippingMethodPromise).data;
        dispatch({ type: Types.LOAD_SHIPPING_METHODS_LIST, payload: shippingMethods.shipping_methods });
        dispatch({ type: Types.SET_SHIPPING_METHOD, payload: shippingMethods.shipping_method_code });
    }
}

export const SetPaymentAddressId = (payment_address_id) => {
    return async dispatch => {
        dispatch({ type: Types.SET_PAYMNET_ADDRESS_ID, payload: payment_address_id });
        await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/payment_address_validate`, {
            payment_address: "existing",
            payment_address_id: payment_address_id
        });
        let paymentMethodsPromise = Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/payment_method`);
        let paymentMethods = (await paymentMethodsPromise).data;
        dispatch({ type: Types.LOAD_PAYMENT_METHODS_LIST, payload: paymentMethods.payment_methods });
        dispatch({ type: Types.SET_PAYMENT_METHOD, payload: paymentMethods.payment_method_code });
        let { agree_id, text_agree } = paymentMethods;
        dispatch({ type: Types.SET_AGREE_DATA, payload: { agree_id, text_agree } });

    }
}


export const SetPaymentMethod = (payment_address_id, payment_method, cb) => {
    return async dispatch => {
        let respnose = await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/payment_method_validate`, { payment_address_id, payment_method });
        dispatch({ type: Types.SET_PAYMENT_METHOD, payload: payment_method });

        cb();
    }
}

export const SetShippingtMethod = (shipping_address_id, shipping_method, cb) => {
    return async dispatch => {
        let respnose = await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/shipping_method_validate`, { shipping_address_id, shipping_method });
        dispatch({ type: Types.SET_SHIPPING_METHOD, payload: shipping_method });

        cb();
    }
}
export const Checkout = (payment_address_id, comment, cbWebView, cb) => {
    return async dispatch => {
        let validation = await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/validate`)
        if (validation.status != 200) {
            Toast.show("حدث خطأ ما، يرجى المحاولة لاحقا أو الإتصال بنا");
            return;
        }

        let confirmCheckout = await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/confirm`)
        if (confirmCheckout.status != 200) {
            Toast.show("حدث خطأ ما، يرجى المحاولة لاحقا أو الإتصال بنا");
            return;
        }
        let quickConfirmCheckout = await Axios.post(`${BASEURI}ocapi/checkout/quickconfirm`, { payment_address_id });
        if (quickConfirmCheckout.data.hasOwnProperty("message") && quickConfirmCheckout.data.message == false) {
            //Go to webview
            cbWebView(`${BASEURI}ocapi/checkout/confirm_order`);

        }
        else {
            cb();
        }



    }
}


export const ValidateGuest = (body, cb) => {
    return async dispatch => {
        try {
            let validation = await Axios.post(`${BASEURI}ocapi/checkout/checkoutmap/guest_validate`, body);
            dispatch({ type: Types.SET_GUEST_CHECKOUT_DATA, payload: body });
            cb();

        } catch (error) {
            Toast.show("حدث خطأ ما");
        }
    }
}