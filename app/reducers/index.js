import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ShopReducer from './ShopReducer';
import SettingsReducer from './SettingsReducer';
import AccountReducer from './AccountReducer';
import ProductReducer from './ProductReducer';
import SearchReducer from './SearchReducer';
import CheckoutReducer from './CheckoutReducer';
const RootReducer = combineReducers({
    auth:AuthReducer,
    shop:ShopReducer,
    settings:SettingsReducer,
    account:AccountReducer,
    product:ProductReducer,
    search:SearchReducer,
    checkout:CheckoutReducer
});


export default RootReducer;