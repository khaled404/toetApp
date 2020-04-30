import * as Types from '../actions/SettingsTypes';
const INITIAL_STATE = {
    Loaded: false,
    HomeLayout: {},
    translations: {},
    currency: {},
    currencies: [],
    languages: [],
    language:"",
    countries:[],
    zones:[],
    contact:{}
}

const AppSettingsReducer = (state = INITIAL_STATE, action) => {
    
    const newState = { ...state };
    switch (action.type) {
        case Types.APP_LOADED:
            newState.Loaded = true;
            break;
        case Types.LOAD_HOMELAYOUT:
            newState.HomeLayout = action.payload;
            break;
        case Types.LOAD_TRNASLATION_STRINGS:
            newState.translations = action.payload;
            global.translations = action.payload;
            break;
        case Types.LOAD_APP_SETTINGS:
            newState.currency = action.payload.currency;
            newState.currencies = action.payload.currencies;
            newState.language = action.payload.language;
            newState.languages = action.payload.languages;
            break;
        case Types.LOAD_COUNTRIES:
            newState.countries = action.payload;
            break;
        case Types.LOAD_ZONES:
            newState.zones = action.payload;
            break;
        case Types.SET_CONTACT_INFO:
            newState.contact = action.payload;
            break;
    }
    return newState;
}

export default AppSettingsReducer