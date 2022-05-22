import React from 'react';
import { useRouter } from 'next/router';

import { clientConfig } from '../../../../client-config';

import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/features/user/userSlice';

import { useMessage } from '../../../common/hooks/useMessage';

import { isEmail, sleep } from '../../../common/utils/helpres';
import { messages } from '../../../common/utils/messages';
import { sendErrorLog } from '../../../common/lib/errorLogger';
import { useLocalStorageWithTTL } from '../../../common/hooks/useLocalStorageWithTTL';

export const useRegister = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { getLocalStorageItemWithTTL } = useLocalStorageWithTTL();

    const initialFormData = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password2: '',
        agreedOnTerms: false,
        type: 'user'
    };

    const initialErrorsState = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password2: '',
        agreedOnTerms: false,
        type: 'user'
    };

    const [formInput, setFormInput] = React.useState(initialFormData);
    const [errors, setErrors] = React.useState(initialErrorsState);

    console.log('🚀 ~ file: useRegister.js ~ line 43 ~ useRegister ~ formInput', formInput);

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
        const { name, value, checked } = e.target;

        // If current input has error , validation it on every change
        if (errors[name]) validateFormLive(name, value);

        value = name !== 'agreedOnTerms' ? value.trim() : checked;

        // Update formInput with new value
        setFormInput((prevInput) => {
            return { ...prevInput, [name]: value };
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
            case 'firstName':
                if (!firstName.length) {
                    validationErrors.firstName = messages.empty_field;
                } else {
                    delete validationErrors.email;
                }
                break;
            case 'lastName':
                if (!lastName.length) {
                    validationErrors.lastName = messages.empty_field;
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
            case 'password2':
                if (!password2.length) {
                    validationErrors.password2 = messages.empty_field;
                } else if (password2 !== password) {
                    validationErrors.password2 = messages.pw_match;
                } else {
                    delete validationErrors.password;
                }
                break;
            case 'agreedOnTerms':
                if (!agreedOnTerms) {
                    validationErrors.agreedOnTerms = messages.terms_not_agreed;
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
        if (loading) return;

        e.preventDefault();

        // Validate formInput values
        const isValid = isInputValid(formInput);

        // If form is not valid stop function
        if (!isValid) {
            await sleep(1000);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // Get email and password from formInput values
            const { email, password } = formInput;

            if (email && password) {
                // Send input values to server
                const res = await fetch(`${clientConfig.serverURL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const { user, msg } = await res.json();

                // Reset states to initial values
                resetForm();

                if (res.status === 200) {
                    // Set user data to local storage
                    localStorage.setItem('user', JSON.stringify(user));

                    // Set user data to store
                    dispatch(setUser(user));

                    setModalMessage(msg, 2000, true);
                    await sleep(2000);

                    // Get next page route
                    const nextPage = getLocalStorageItemWithTTL(clientConfig.NEXT_PAGE_KEY);

                    // Clear local storage nextPage
                    localStorage.removeItem(clientConfig.NEXT_PAGE_KEY);

                    // Redirect to next page
                    router.push(nextPage || clientConfig.HOME_ROUTE);
                } else if (res.status === 401) {
                    setModalMessage(msg, 3000, false);
                } else {
                    setModalMessage(msg || messages.login_unexpected, 3000, false);
                    sendErrorLog(`${msg || messages.login_unexpected}`);
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
            const { email, firstName, lastName, password, password2, agreedOnTerms } = formData;

            if (!email.length) {
                validationErrors.email = messages.empty_field;
            } else if (!isEmail(email)) {
                validationErrors.email = messages.invalid_email;
            }

            if (!firstName.length) {
                validationErrors.firstName = messages.empty_field;
            }

            if (!lastName.length) {
                validationErrors.lastName = messages.empty_field;
            }

            if (!password.length) {
                validationErrors.password = messages.empty_field;
            } else if (password.length < 6) {
                validationErrors.password = messages.pw_length;
            }

            if (!password2.length) {
                validationErrors.password2 = messages.empty_field;
            } else if (password2 !== password) {
                validationErrors.password2 = messages.pw_match;
            }

            if (!agreedOnTerms) {
                validationErrors.agreedOnTerms = messages.terms_not_agreed;
            }

            if (Object.keys(validationErrors).length) {
                setErrors({ ...initialErrorsState, ...validationErrors });
                isValid = false;
            } else {
                setErrors(initialErrorsState);
            }
        } catch (e) {
            sendErrorLog('UseRegister.js, isInputValid: ' + e);
            return false;
        }

        return isValid;
    }

    return { handleInputChange, onFormSubmit, formInput, errors, loading };
};
