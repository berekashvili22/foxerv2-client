import React from 'react';
import { useRouter } from 'next/router';

import { clientConfig } from '../../../../client-config';

import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/features/user/userSlice';

import { useModal } from '../../../common/hooks/useModal';
import { useMessage } from '../../../common/hooks/useMessage';

import { isEmail, sleep } from '../../../common/utils/helpers';
import { messages } from '../../../common/utils/messages';
import { sendErrorLog } from '../../../common/lib/errorLogger';
import { useLocalStorageWithTTL } from '../../../common/hooks/useLocalStorageWithTTL';
import { registerUser } from '../../utils/functions';

export const useRegister = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { toggleModalState } = useModal();

    const { getLocalStorageItemWithTTL } = useLocalStorageWithTTL();

    const initialFormData = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password2: '',
        agreedOnTerms: false
    };

    const initialErrorsState = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password2: '',
        agreedOnTerms: false
    };

    const [formInput, setFormInput] = React.useState(initialFormData);
    const [errors, setErrors] = React.useState(initialErrorsState);

    const [loading, setLoading] = React.useState(false);

    const { setModalMessage } = useMessage();

    // React.useEffect(() => {
    //     if (formInput.email && isEmail(formInput.email)) {
    //         checkIfEmailIsAvailable(formInput.email);
    //     }
    // }, [formInput.email]);

    /**
     * Checks if user with requested email exits
     * @param {string} email
     */
    async function isEmailAvailable(email) {
        try {
            const res = await fetch(`${clientConfig.serverURL}/auth/checkIfEmailIsAvailable`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (res.status === 200) {
                const { emailIsAvailable } = await res.json();
                return emailIsAvailable;
            } else {
                // todo : figure out logic in case res.status !== 200
                return false;
            }
        } catch (e) {
            sendErrorLog('useRegister.js, checkIfEmailIsAvailable : ', e);
            return false;
        }
    }

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
                if (!value.length) {
                    validationErrors.firstName = messages.empty_field;
                } else {
                    delete validationErrors.firstName;
                }
                break;
            case 'lastName':
                if (!value.length) {
                    validationErrors.lastName = messages.empty_field;
                } else {
                    delete validationErrors.lastName;
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
                if (!value.length) {
                    validationErrors.password2 = messages.empty_field;
                } else if (value !== formInput.password) {
                    validationErrors.password2 = messages.pw_match;
                } else {
                    delete validationErrors.password2;
                }
                break;
            case 'agreedOnTerms':
                if (!value) {
                    validationErrors.agreedOnTerms = messages.terms_not_agreed;
                } else {
                    delete validationErrors.agreedOnTerms;
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

        // Validate form values
        const { validationErrors, isValid } = await validateFormData(formInput);

        // Update errors state
        setErrors((prevErrors) => {
            return { ...prevErrors, ...validationErrors };
        });

        // If form is not valid stop function
        if (!isValid) return;

        // Set loading to true
        setLoading(true);

        try {
            // Send register request
            const {
                user,
                msg,
                errors: serverValidationErrors,
                success
            } = await registerUser(formInput);

            // todo : change logic after register success
            // If register was successful
            if (success) {
                // Reset form state to initial values
                resetForm();
                // Set modal message
                setModalMessage(msg, 3000, true);

                localStorage.setItem('user', JSON.stringify(user));

                // Set user data to store
                dispatch(setUser(user));

                // Get next page route
                const nextPage = getLocalStorageItemWithTTL(clientConfig.NEXT_PAGE_KEY);

                // Clear local storage nextPage
                localStorage.removeItem(clientConfig.NEXT_PAGE_KEY);

                // Redirect to next page
                router.push(nextPage || clientConfig.HOME_ROUTE);
                toggleModalState('authModalIsOpen', false);
            } else if (Object.keys(serverValidationErrors || {}).length) {
                // If validation errors

                setModalMessage(msg, 3000, false);
                // Set errors messages from server
                setErrors((prevErrors) => {
                    return { ...prevErrors, serverValidationErrors };
                });
            } else {
                setModalMessage(messages.unexpected, 3000, false);
            }
        } catch (e) {
            sendErrorLog('LoginView.jsx, onFormSubmit: ' + e);
            setModalMessage(messages.unexpected, 3000, false);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Returns true or false based on validation result
     * @param {Object} formData
     * @return {boolean}
     */
    async function validateFormData(formData) {
        // Create empty object for errors
        const validationErrors = {};

        // Get values from form data
        const { email, firstName, lastName, password, password2, agreedOnTerms } = formData;

        // If email field is empty
        if (!email.length) validationErrors.email = messages.empty_field;
        // If email is not in valid format
        else if (!isEmail(email)) validationErrors.email = messages.invalid_email;
        // If email is already used
        else {
            const available = await isEmailAvailable(email);
            if (!available) validationErrors.email = messages.already_used_email;
        }

        // If first name is empty
        if (!firstName.length) validationErrors.firstName = messages.empty_field;

        // If last name is empty
        if (!lastName.length) validationErrors.lastName = messages.empty_field;

        // If password is empty
        if (!password.length) validationErrors.password = messages.empty_field;
        // If password length is less than 6
        else if (password.length < 6) validationErrors.password = messages.pw_length;

        // If password2 is empty
        if (!password2.length) validationErrors.password2 = messages.empty_field;
        // If password2 does not match password
        else if (password2 !== password) validationErrors.password2 = messages.pw_match;

        // If agreed on terms is not checked
        if (!agreedOnTerms) validationErrors.agreedOnTerms = messages.terms_not_agreed;

        return { validationErrors, isValid: Object.keys(validationErrors).length === 0 };
    }

    return { handleInputChange, onFormSubmit, formInput, errors, loading };
};
