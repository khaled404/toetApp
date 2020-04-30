import * as Types from '../actions/CheckoutTypes';

const INITIAL_STATE = {
    loading: true,
    addresses: [],
    address_id: "",
    payment_address_id: "",
    shipping_address_id: "",
    payment_methods: [],
    payment_method: "",
    shipping_methods: [],
    shipping_method: "",
    translates: {},
    agree_data:{ text_agree:"",agree_id:0},
    guestData:{}
}


const CheckoutReducer = (state = INITIAL_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Types.START_LOADING:
            newState.loading = true;
            break;
        case Types.END_LOADING:
            newState.loading = false;
            break;
        case Types.LOAD_ADDRESSES_LIST:
            newState.addresses = action.payload;
            break;
        case Types.SET_DEFAULT_ADDRESS_ID:
            newState.address_id = action.payload;
            break;


        case Types.LOAD_SHIPPING_METHODS_LIST:
            newState.shipping_methods = action.payload;
            break;
        case Types.SET_SHIPPING_METHOD:
            newState.shipping_method = action.payload;
            break;
        case Types.SET_SHIPPING_ADDRESS_ID:
            newState.shipping_address_id = action.payload;
            break;

        case Types.LOAD_PAYMENT_METHODS_LIST:
            newState.payment_methods = action.payload;
            break;
        case Types.SET_PAYMENT_METHOD:
            newState.payment_method = action.payload;
            break;
        case Types.SET_PAYMNET_ADDRESS_ID:
            newState.payment_address_id = action.payload;
            break;
        case Types.SET_CHECKOUT_TRANSLATIONS:
            newState.translates = action.payload;
            break;
        case Types.SET_GUEST_CHECKOUT_DATA:
            newState.guestData = action.payload;
            break;
        case Types.SET_AGREE_DATA:
            newState.agree_data = action.payload;
            break;



    }
    return newState;
}

export default CheckoutReducer;