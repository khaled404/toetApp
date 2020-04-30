import * as Types from '../actions/AccountTypes';
const INITIAL_STATE = {
    loading: true,
    loadingStatus: 'pending',
    addressesPage: {
        addresses: []
    },
    activeAddress: "",
    addressEditor: {
        finished: false,
        "text_address_add": "",
        "text_address_edit": "",
        "error_firstname": "",
        "error_lastname": "",
        "error_address_1": "",
        "error_city": "",
        "error_country": "",
        "error_zone": "",
        "entry_firstname": "",
        "entry_lastname": "",
        "entry_company": "",
        "entry_address_1": "",
        "entry_address_2": "",
        "entry_postcode": "",
        "entry_city": "",
        "entry_country": "",
        "entry_zone": ""
    },
    ordersPage: { orders: [] },
    orderDetails: { products: [], totals: [], histories: [] },
    downloadsPage: { downloads: [] },
    rewardsPage: { rewards: [] },
    transactionsPage: { transactions: [] },
    returnsPage: { returns: [] },
    returnDetailsPage: {},
    addReturnPage: {},
    accountEditPage: {
        "heading_title": "",
        "error_firstname": "",
        "error_lastname": "",
        "error_email": "",
        "error_telephone": "",
    },
    passwordChangePage: {
        "error_password": "",
        "error_confirm": ""
    }
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Types.LOADING_STARTED:

            newState.loading = true;
            newState.loadingStatus = "started";
            break;

        case Types.LOADING_FAILED:
            newState.loading = false;
            newState.loadingStatus = "failed";
            break;



        case Types.LOAD_REWARDS:
            newState.rewardsPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;
        case Types.LOAD_TRANSACTIONS:
            newState.transactionsPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;

        case Types.LOAD_DOWNLOADS:
            newState.downloadsPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;



        case Types.LOAD_RETURNS:
            newState.returnsPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;
        case Types.LOAD_RETURNS_NEXT_PAGE:
            if (Array.isArray(action.payload.returns) && action.payload.returns.length > 0)
                action.payload.returns.forEach(e => {
                    newState.returnsPage.returns.push(e);
                });
            newState.returnsPage.pagination =  action.payload.pagination;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;
        case Types.LOAD_RETURNED_ORDER_DETAILS:
            newState.returnDetailsPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;

        case Types.LOAD_ADD_RETURN_PAGE:
            newState.addReturnPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;
        case Types.LOAD_ADD_RETURN_ERRORS:

            const { error_order_id,
                error_firstname,
                error_lastname,
                error_email,
                error_telephone,
                error_product,
                error_model,
                error_reason } = action.payload;


            newState.addReturnPage = {
                ...newState.addReturnPage,
                error_order_id,
                error_firstname,
                error_lastname,
                error_email,
                error_telephone,
                error_product,
                error_model,
                error_reason
            };

            newState.loadingStatus = "done";
            newState.loading = false;
            break;

        case Types.LOAD_ORDERS:
            newState.ordersPage = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;
        case Types.LOAD_SINGLE_ORDER:
            newState.orderDetails = action.payload;
            newState.loadingStatus = "done";
            newState.loading = false;
            break;


        case Types.LOAD_ADDRESSES:
            newState.loadingStatus = "done";
            newState.loading = false;
            newState.addressesPage = action.payload;
            break;
        case Types.SET_ADDRESS_ACTIVE:
            newState.loadingStatus = "done";
            newState.loading = false;
            let new_addresses = [...newState.addressesPage.addresses];
            new_addresses.forEach((a, index, arr) => {
                if (a.address_id == action.payload) {
                    arr[index].default = true;
                }
                else
                    arr[index].default = false;
            });
            let new_page = { ...newState.addressesPage, addresses: new_addresses };
            newState.addressesPage = new_page;
            break;
        case Types.DELETE_ADDRESS:
            let addressesPage = { ...state.addressesPage };
            addressesPage.addresses = addressesPage.addresses.filter(e => e.address_id != action.payload);
            newState.addressesPage = addressesPage;
            break;
        case Types.INIT_ADDRESS_EDITOR:
            let page = { ...state.addressesPage };
            const { text_address_add, text_address_edit, entry_firstname, entry_lastname, entry_company, entry_address_1,
                entry_address_2, entry_postcode, entry_city, entry_country, entry_zone } = page;

            let payload = {
                ...state.addressEditor,
                text_address_add,
                text_address_edit, entry_firstname, entry_lastname, entry_company, entry_address_1, entry_address_2,
                entry_postcode, entry_city, entry_country, entry_zone
            };
            payload.finished = false;
            newState.addressEditor = payload;
            break;
        case Types.SET_EDITOR_ERRORS:
            let editor = { ...state.addressEditor, ...action.payload };
            newState.addressEditor = editor;
            break;
        case Types.LOAD_ACCOUNT_EDIT_PAGE:
            newState.accountEditPage = action.payload;
            break;
        case Types.LOAD_CHANGE_PASSWORD_PAGE:
            newState.passwordChangePage = action.payload;
            break;

    }

    return newState;
}

export default AuthReducer;