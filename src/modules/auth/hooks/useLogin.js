import React from 'react';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { isEmail, sleep } from '../../../common/utils/helpres';
import { useMessage } from '../../../common/hooks/useMessage';
import { setUser } from '../../../store/features/user/userSlice';

export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const initialFormData = { email: '', password: '' };
    const initialErrorsState = { email: '', password: '' };

    const [formInput, setFormInput] = React.useState(initialFormData);
    const [errors, setErrors] = React.useState(initialErrorsState);

    const [loading, setLoading] = React.useState(false);

    const { setModalMessage } = useMessage();

    function resetForm() {
        setFormInput(initialFormData);
        setErrors(initialErrorsState);
        setLoading(false);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;

        if (errors[name]) validateFormLive(name, value);

        setFormInput((prevInput) => {
            return { ...prevInput, [name]: value.trim() };
        });
    }

    function validateFormLive(name, value) {
        const validationErrors = { ...errors };

        switch (name) {
            case 'email':
                if (!value.length) {
                    validationErrors.email = 'Email field is required *';
                } else if (!isEmail(value)) {
                    validationErrors.email = 'Please enter valid email *';
                } else {
                    delete validationErrors.email;
                }
                break;
            case 'password':
                if (!value.length) {
                    validationErrors.password = 'Password field is required *';
                } else {
                    delete validationErrors.password;
                }
                break;
            default:
                break;
        }

        setErrors(validationErrors);
    }

    async function onFormSubmit(e) {
        if (loading) return;

        e.preventDefault();
        setLoading(true);
        // Validate form data
        const isValid = isInputValid(formInput);

        if (!isValid) {
            await sleep(1000);
            setLoading(false);
            return;
        }

        // Login user

        try {
            const { email, password } = formInput;

            if (email && password) {
                const res = await fetch('http://localhost:5000/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const { user, msg } = await res.json();

                if (res.status === 200) {
                    resetForm();

                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(setUser(user));

                    setModalMessage(msg);
                    await sleep(1000);

                    router.push('/me');
                } else if (res.status === 401) {
                    resetForm();
                    setModalMessage(msg, 3000, false);
                }
            }
        } catch (e) {
            console.log('🚀 ~ file: LoginView.jsx ~ line 64 ~ onFormSubmit ~ e', e);
        } finally {
            setLoading(false);
        }
    }

    function isInputValid(formData) {
        let isValid = true;
        let validationErrors = {};
        try {
            const { email, password } = formData;

            if (!email.length) {
                validationErrors.email = 'Email field is required *';
            } else if (!isEmail(email)) {
                validationErrors.email = 'Please enter valid email *';
            }

            if (!password.length) {
                validationErrors.password = 'Password field is required *';
            }

            if (Object.keys(validationErrors).length) {
                setErrors({ ...initialErrorsState, ...validationErrors });
                isValid = false;
            } else {
                setErrors(initialErrorsState);
            }
        } catch (e) {
            console.log('🚀 ~ file: LoginView.jsx ~ line 42 ~ isInputValid ~ e', e);
            return false;
        }

        return isValid;
    }

    return { handleInputChange, onFormSubmit, formInput, errors, loading };
};
