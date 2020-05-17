import AsyncStorage from '@react-native-community/async-storage';

import store from '../reducers';
export async function GetCookie() {
    return await AsyncStorage.getItem(COOKIE_KEY);
    //return await Promise.resolve(null);
    //return await Promise.resolve("23edd3e55d05286418effbb0ba");

}
export async function SetCookie(cookie) {
    await AsyncStorage.setItem(COOKIE_KEY, cookie);
}

export async function GetLanguage() {
    let lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (lang === null)
        return "ar";

    return lang;
    //return await Promise.resolve("ar");
}
export async function SetLanguage(lang) {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);

}
export async function GetCurrency() {
    let curr = await AsyncStorage.getItem(CURRENCY_KEY);

    if (curr === null)
        return "SAR";

    return curr;
    //return await Promise.resolve("SAR");
}
export async function SetCurrency(currency) {
    await AsyncStorage.setItem(CURRENCY_KEY, currency);
}

export async function GetSkipLogin() {
    let skipped = await AsyncStorage.getItem(SKIPPED_KEY);
    if (skipped === null)
        return false;
    return Boolean(skipped);

}
export async function SetSkipLogin(skip) {
    await AsyncStorage.setItem(SKIPPED_KEY, skip.toString());
}
export function ParseDate(date) {
    return "2019/10/11";
}
export function Translate(key) {
    return key;
}
export async function Clear() {
    await AsyncStorage.clear();
}
export function TranslateString(key) {
    if (global.translations) {
        return global.translations[key];
    }
    return "UNTRANSLATION_ERROR";

}
export function ChooseStringByLanguage(english, arabic) {
    return global.IsRtl ? arabic : english;
}
export function RemoveHTMLFromString(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp": " ",
        "amp": "&",
        "quot": "\"",
        "lt": "<",
        "gt": ">"
    };
    return encodedString.replace(translate_re, function (match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}
export async function GetNotificationStatus() {
    let notification = await AsyncStorage.getItem(NOTIFICATION_KEY);
    if (notification === null)
        return false;
    return notification;

}
export async function SetNotificationStatus(value) {
    await AsyncStorage.setItem(NOTIFICATION_KEY, value);
}
const COOKIE_KEY = "COOKIE";
const CURRENCY_KEY = "CURRENCY";
const LANGUAGE_KEY = "LANGUAGE";
const SKIPPED_KEY = "USER_SKIPPED";
const NOTIFICATION_KEY = "NOTIFICATION";
