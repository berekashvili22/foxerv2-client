import React from 'react';
import { useRouter } from 'next/router';

import { clientConfig } from '../../../../client-config';

import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/features/user/userSlice';

import { useMessage } from '../../../common/hooks/useMessage';

import { isEmail, sleep } from '../../../common/utils/helpers';
import { messages } from '../../../common/utils/messages';
import { sendErrorLog } from '../../../common/lib/errorLogger';
import { useLocalStorageWithTTL } from '../../../common/hooks/useLocalStorageWithTTL';
import { loginUser } from '../../utils/functions';

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { getLocalStorageItemWithTTL } = useLocalStorageWithTTL();

    const initialFormData = { email: '', password: '' };
    const initialErrorsState = { email: '', password: '' };

    const [formInput, setFormInput] = React.useState(initialFormData);
    const [errors, setErrors] = React.useState(initialErrorsState);

    const [loading, setLoading] = React.useState(false);

    const { setModalMessage } = useMessage();

    /**
     * Reset component states to initial values
     */
    function resetForm() {
        setFormInput(initialFormData);
        setErrors(initialErrorsState);
    }

    /**
     * Update formInput
     * @param {Object} e
     */
    function handleInputChange(e) {
        // Get field name and value
        const { name, value } = e.target;

        // If current input has error , validation it on every change
        if (errors[name]) validateFormLive(name, value);

        // Update formInput with new value
        setFormInput((prevInput) => {
            return { ...prevInput, [name]: value.trim() };
        });
    }

    /**
     * Validate input value while user is writing
     * @param {string} name
     * @param {string} value
     */
    function validateFormLive(name, value) {
        const validationErrors = { ...errors };

        switch (name) {
            case 'email':
                if (!value.length) {
                    validationErrors.email = messages.empty_field;
                } else if (!isEmail(value)) {
                    validationErrors.email = messages.invalid_email;
                } else {
                    delete validationErrors.email;
                }
                break;
            case 'password':
                if (!value.length) {
                    validationErrors.password = messages.empty_field;
                } else {
                    delete validationErrors.password;
                }
                break;
            default:
                break;
        }

        setErrors(validationErrors);
    }

    /**
     *
     * @param {Object} e
     * @return {void}
     */
    async function onFormSubmit(e) {
        // Prevent default form action
        e.preventDefault();

        // Validate formInput values
        const isValid = isInputValid(formInput);

        // If form is not valid stop function
        if (!isValid) {
            await sleep(1000);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            // Get email and password from formInput values
            const { email, password } = formInput;

            // If we have email and password
            if (email && password) {
                // Reset states to initial values
                resetForm();

                // Send login request
                const { user, msg, success } = await loginUser(email, password);

                // If login was successful
                if (success) {
                    // todo : create set user function
                    // Set user data to local storage
                    localStorage.setItem('user', JSON.stringify(user));

                    // Set user data to store
                    dispatch(setUser(user));

                    // Set modal messages
                    setModalMessage(msg, 3000, true);

                    // // ! temp
                    // await sleep(3000);

                    // todo : create hook for next page

                    // Get next page route
                    const nextPage = getLocalStorageItemWithTTL(clientConfig.NEXT_PAGE_KEY);

                    // Remove nextPage from local storage
                    localStorage.removeItem(clientConfig.NEXT_PAGE_KEY);

                    // Redirect to next page
                    router.push(nextPage || clientConfig.HOME_ROUTE);
                } else {
                    setModalMessage(msg || messages.unexpected, 3000, false);
                }
            }
        } catch (e) {
            sendErrorLog('LoginView.jsx, onFormSubmit: ' + e);
            setModalMessage(messages.login_unexpected, 3000, false);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Returns true or false based on validation result
     * @param {Object} formData
     * @return {boolean}
     */
    function isInputValid(formData) {
        let isValid = true;
        let validationErrors = {};

        try {
            const { email, password } = formData;

            if (!email.length) {
                validationErrors.email = messages.empty_field;
            } else if (!isEmail(email)) {
                validationErrors.email = messages.invalid_email;
            }

            if (!password.length) {
                validationErrors.password = messages.empty_field;
            }

            if (Object.keys(validationErrors).length) {
                setErrors({ ...initialErrorsState, ...validationErrors });
                isValid = false;
            } else {
                setErrors(initialErrorsState);
            }
        } catch (e) {
            sendErrorLog('LoginView.jsx, isInputValid: ' + e);
            return false;
        }

        return isValid;
    }

    return { handleInputChange, onFormSubmit, formInput, errors, loading };
};
