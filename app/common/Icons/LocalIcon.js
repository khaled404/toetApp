import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../assets/font_selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

export default ({ name, color, size, onPress, style }) => {
    let items = {
        'brands': require('../../../assets/icons/brands.png'),
        'cart': require('../../../assets/icons/cart.png'),
        'city': require('../../../assets/icons/city.png'),
        'close': require('../../../assets/icons/close.png'),
        'compare': require('../../../assets/icons/compare.png'),
        'discount': require('../../../assets/icons/discount.png'),
        'done': require('../../../assets/icons/done.png'),
        'drop_down_arrow': require('../../../assets/icons/drop_down_arrow.png'),
        'email': require('../../../assets/icons/email.png'),
        'faq': require('../../../assets/icons/faq.png'),
        'favourites': require('../../../assets/icons/favourites.png'),
        'favourites_active': require('../../../assets/icons/favourites_active.png'),
        'filter': require('../../../assets/icons/filter.png'),
        'home': require('../../../assets/icons/nav_home_active.png'),
        'menu': require('../../../assets/icons/menu.png'),
        'mic': require('../../../assets/icons/mic.png'),
        'mic_active': require('../../../assets/icons/mic_active.png'),
        'name': require('../../../assets/icons/name.png'),
        'nav_cart': require('../../../assets/icons/nav_cart.png'),
        'nav_categories': require('../../../assets/icons/nav_categories.png'),
        'nav_search': require('../../../assets/icons/nav_search.png'),
        'password': require('../../../assets/icons/password.png'),
        'phone': require('../../../assets/icons/phone.png'),

        'search': require('../../../assets/icons/search.png'),
        'shipments': require('../../../assets/icons/shipments.png'),
        'settings': require('../../../assets/icons/settings.png'),
        'share': require('../../../assets/icons/share.png'),
        'support': require('../../../assets/icons/support.png'),

    };
    let source = items[name];
    let pressFn = undefined;
    if (typeof (onPress) === 'function') {
        return (
            <TouchableOpacity onPress={onPress}>
                <Image source={source} style={[{ width: size || 20, height: size || 20 }, style]} resizeMode="contain" tintColor={color || "#727c8e"} />
            </TouchableOpacity>

        );
    }
    else {
        return (<Image source={source} style={[{ width: size || 20, height: size || 20 }, style]} resizeMode="contain" tintColor={color || "#727c8e"} />);
    }
}

