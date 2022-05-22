import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from '../../../store/features/user/userSlice';
import GoogleAuthButton from '../components/GoogleAuthButton';

const AuthView = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const initialFormData = { email: '', password: '' };
    const initialErrorsState = { email: '', password: '' };

    const [formInput, setFormInput] = React.useState(initialFormData);
    const [errors, setErrors] = React.useState(initialErrorsState);

    const [loading, setLoading] = React.useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormInput((prevInput) => {
            return { ...prevInput, [name]: value.trim() };
        });
    }

    function logOutUser() {
        localStorage.setItem('user', null);
        dispatch(removeUser());
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        setLoading(true);
        // Validate form data
        const isValid = isInputValid(formInput);

        if (!isValid) return;

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

                if (res.status === 200) {
                    const data = await res.json();

                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch(setUser(data.user));

                    router.push('/me');
                } else {
                    console.log(res);
                }
            }
        } catch (e) {
            console.log('🚀 ~ file: AuthView.jsx ~ line 64 ~ onFormSubmit ~ e', e);
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
                validationErrors.email = 'Email field is required .';
            }

            if (!password.length) {
                validationErrors.password = 'Password field is required .';
            }

            if (Object.keys(validationErrors).length) {
                setErrors({ ...initialErrorsState, ...validationErrors });
                isValid = false;
            } else {
                setErrors(initialErrorsState);
            }
        } catch (e) {
            console.log('🚀 ~ file: AuthView.jsx ~ line 42 ~ isInputValid ~ e', e);
            return false;
        }

        return isValid;
    }

    return (
        <>
            <button onClick={logOutUser}>test logout</button>
            <div className="auth_view_wrapper">
                <div className="auth_view-form_box">
                    <h2 className="auth_view-title">შესვლა</h2>
                    <form className="auth_view-form" onSubmit={onFormSubmit}>
                        <input
                            className="auth_view-form_input"
                            type={'text'}
                            name={'email'}
                            placeholder={'email'}
                            value={formInput.email}
                            onChange={handleInputChange}
                        />
                        <p>{errors.email && errors.email}</p>
                        <input
                            className="auth_view-form_input"
                            type={'text'}
                            name={'password'}
                            placeholder={'password'}
                            value={formInput.password}
                            onChange={handleInputChange}
                        />
                        <p>{errors.password && errors.password}</p>

                        {/* <input className="auth_view-form_text-input" type={'checkbox'} /> */}
                        <button className="auth_view-form_btn">შესვლა</button>
                        {loading && <p>loading...</p>}
                        <div style={{ marginBottom: '15px' }} />
                        <GoogleAuthButton />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AuthView;

/* <GoogleLogin
                        clientId="721347850124-ldt7dc7k92s81nogidsbcup9uaioqgda.apps.googleusercontent.com"
                        scope="profile"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        uxMode={'redirect'}
                        redirectUri={'http://localhost:3000/auth'}
                        isSignedIn={true}
                    /> */
/*  */
/* <div
                            id="g_id_onload"
                            data-client_id="721347850124-ldt7dc7k92s81nogidsbcup9uaioqgda.apps.googleusercontent.com"
                            data-ux_mode="redirect"
                            data-login_uri="http://localhost:3000/auth"></div> */

// const [gsiScriptLoaded, setGsiScriptLoaded] = React.useState(false);
// console.log('🚀 ~ file: AuthView.jsx ~ line 7 ~ AuthView ~ gsiScriptLoaded', gsiScriptLoaded);
// const [user, setUser] = React.useState(undefined);

// const handleGoogleSignIn = useCallback((res) => {
//     console.log('🚀 ~ file: AuthView.jsx ~ line 39 ~ handleGoogleSignIn ~ res', res);
// }, []);

// React.useEffect(() => {
//     if (user?._id || gsiScriptLoaded) return;

//     const initializeGsi = () => {
//         if (!window.google || gsiScriptLoaded) return;

//         setGsiScriptLoaded(true);
//         window.google.accounts.id.initialize({
//             client_id: '721347850124-ldt7dc7k92s81nogidsbcup9uaioqgda.apps.googleusercontent.com',
//             // callback: handleGoogleSignIn
//             ux_mode: 'redirect',
//             login_uri: 'http://localhost:3000/api/auth/google'
//         });
//     };

//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.onload = initializeGsi;
//     script.async = true;
//     script.id = 'google-client-script';
//     document.querySelector('body')?.appendChild(script);

//     return () => {
//         // Cleanup function that runs when component unmounts
//         window.google?.accounts.id.cancel();
//         document.getElementById('google-client-script')?.remove();
//     };
// }, [handleGoogleSignIn, user?._id, gsiScriptLoaded]);

// const handleGoogleSignIn = async (gToken) => {
//     const res = await fetch('http://localhost:5000/api/v1/auth/googleAuth', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ token: gToken })
//     });
//     const data = await res.json();
//     console.log('🚀 ~ file: AuthView.jsx ~ line 30 ~ handleGoogleSignIn ~ data', data);
// };
