import { clientConfig } from '../../../client-config';

import { sendErrorLog } from '../../common/lib/errorLogger';
import { messages } from '../../common/utils/messages';

/**
 * Login user
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
    const url = `${clientConfig.serverURL}/auth/login`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const { user, msg } = await res.json();

        switch (res.status) {
            case 200:
                return { user: user, msg: msg, success: true };
            default:
                return { user: null, msg: msg, success: false };
        }
    } catch (e) {
        sendErrorLog(e);
        return { user: null, msg: messages.unexpected, success: false };
    }
}

/**
 * Register user
 * @param {Object} data
 */
export async function registerUser(data) {
    const url = `${clientConfig.serverURL}/auth/register`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const { user, msg, errors } = await res.json();

        switch (res.status) {
            case 200:
                return { user: user, msg: msg, errors: errors, success: true };
            default:
                return { user: null, msg: msg, errors: errors, success: false };
        }
    } catch (e) {
        sendErrorLog(e);
        return { user: null, msg: messages.unexpected, errors: null, success: false };
    }
}
