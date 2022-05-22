/**
 *
 * @param {number} price
 * @param {number} specialPrice
 * @return {string}
 */
export function getDiscountPercentage(price, specialPrice) {
    if (typeof price === 'number' && typeof specialPrice === 'number') {
        try {
            const discount = ((price - specialPrice) / price) * 100;
            return `-${Math.round(discount)}%`;
        } catch (error) {
            console.log('🚀 ~ file: helpers.js ~ line 33 ~ getDiscountPercentage ~ error', error);
            return '';
        }
    } else return '';
}

export function getDiscountPrice(price, discountAmount) {
    if (typeof price === 'number' && typeof discountAmount === 'number') {
        try {
            return roundNum(price - (price * discountAmount) / 100);
        } catch (error) {
            console.log('🚀 ~ file: helpers.js ~ line 128 ~ getDiscountPrice ~ error', error);
            return '';
        }
    } else return '';
}

/**
 *
 * @param {number} price
 * @param {number} specialPrice
 * @return {boolean}
 */
export function hasProductDiscount(price, specialPrice) {
    if (typeof price === 'number' && typeof specialPrice === 'number') return specialPrice < price;
    else return false;
}

/**
 * https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
 * @param {number} milliseconds
 * @return {Promise}
 */
export const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * Returns rounded number
 * @param {number|*} n
 * @return {number|*}
 */
export function roundNum(n) {
    if (typeof n === 'number') {
        return Math.round(n * 1e12) / 1e12;
    } else return n;
}

/**
 * Slices string if string length is more than given length
 * @param {string} string
 * @param {number} len
 * @return {string}
 */
export function restrictCharacterLength(string, len) {
    if (typeof string === 'string' && typeof len === 'number') {
        if (string.length <= len) return string;
        else return `${string.slice(0, len)}...`;
    } else return '';
}

/**
 * Returns random number from given interval
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param {string} url
 * @param {string} queryKey
 * @param {string} queryValue
 * @return {string}
 */
export function addQueryToNextPageUrl(url, queryKey, queryValue) {
    if (urlHasQueryString(url)) {
        return `${url}&${queryKey}=${queryValue}`;
    } else return `${url}?${queryKey}=${queryValue}`;
}

/**
 * https://bytenota.com/javascript-check-if-url-contains-query-string/
 * @param {string} url
 * @return {boolean}
 */
export function urlHasQueryString(url) {
    // regex pattern for detecting querystring
    if (typeof url === 'string') {
        const pattern = new RegExp(/\?.+=.*/g);
        return pattern.test(url);
    } else return false;
}

/**
 * Crops query parameters from url
 * @param {string} url
 * @return {string|*}
 */
export function getUrlWithoutQueryString(url) {
    if (typeof url === 'string') return url.split('?')[0];
    else return url;
}

/**
 * Determines if value is object or not
 * @param {any} value
 * @return {boolean}
 */
export const isObject = (value) => value && typeof value === 'object' && value?.constructor === Object;

/**
 * Checks if string contains html tags
 * @param {string} str
 * @return {boolean}
 */
export const containsHTML = (str) => /<[a-z][\s\S]*>/i.test(str);

/**
 * Wraps string with div tag
 * @param {string} str
 * @return {string} - string wrapped with div tag
 */
export function wrapStringWithDiv(str) {
    const prefix = '<div>';
    const suffix = '</div>';
    return `${prefix}${str}${suffix}`;
}

/**
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param {string} string
 * @return {boolean}
 */
export function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
}

/**
 * Encodes HTML characters e.g: '&' to '&amp'
 * @param {string} string
 * @return {string}
 */
export function encodeHTML(string) {
    try {
        return string
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    } catch (error) {
        return string;
    }
}

/**
 * Checks if input is valid email
 * @param {string} input
 * @return {boolean}
 */
export function isEmail(input) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(input || '');
    return isValidEmail;
}

/**
 * Checks if password is valid
 * @param {string} password
 * @return {boolean}
 */
export function isValidPassword(password) {
    if (password.length < 7) return false;
    else return true;
}

/**
 * Removes fields with empty value from object
 * @param {object} obj
 * @return {object} cleanedObj
 */
export function clearEmptyObject(obj) {
    const cleanedObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (obj[key] !== '') cleanedObj[key] = value;
    }
    return cleanedObj;
}

/**
 * Validates phone input
 * @param {string} input
 * @return {boolean}
 */
export function validateMobileNumber(input) {
    const regex = /5\d\d-\d\d-\d\d-\d\d/i;
    return regex.test(input);
}

// /**
//  * Validates checkout input form
//  * @param {object} data
//  * @param {string} locale
//  * @return {object}
//  */
// export function validateOrderDetailsForm(data, locale) {
//     const errors = {};
//     try {
//         if (data.firstName.trim().length === 0) errors.firstName = messages[locale].empty_field;
//         else if (data.firstName.trim().length > 50) errors.firstName = messages[locale].length_limit_50;

//         if (data.lastName.trim().length === 0) errors.lastName = messages[locale].empty_field;
//         else if (data.lastName.trim().length > 50) errors.lastName = messages[locale].length_limit_50;

//         if (!!data.personalId?.length && data.personalId?.length < 11)
//             errors.personalId = messages[locale].invalid_format;
//         else if (!!!data.personalId) errors.personalId = messages[locale].empty_field;

//         if (data.phone.trim().length === 0) errors.phone = messages[locale].empty_field;
//         else if (data.phone.length !== 9) errors.phone = messages[locale].invalid_format;

//         if (Object.keys(data.city).length < 3) errors.city = messages[locale].empty_field;

//         if (data.address.trim().length === 0) errors.address = messages[locale].empty_field;
//         else if (data.address.length > 1000) errors.address = messages[locale].length_limit_50;

//         if (data.additionalDetails.length > 1000) errors.additionalDetails = messages[locale].length_limit_200;
//         return { validationErrors: errors, validationCompleted: true, message: '' };
//     } catch (error) {
//         console.log('🚀 ~ file: validations.js ~ line 74 ~ validateOrderDetailsForm ~ error', error);
//         return { validationErrors: {}, validationCompleted: false, message: messages[locale].unexcpected };
//     }
// }
