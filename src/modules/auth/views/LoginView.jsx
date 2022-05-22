import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useGoBack } from '../../../common/hooks/useGoBack';

import GoogleAuthButton from '../components/GoogleAuthButton';
import { useLogin } from '../hooks/useLogin';

const LoginView = (props) => {
    const { goBack } = useGoBack();
    const { handleInputChange, onFormSubmit, formInput, errors, loading } = useLogin();

    return (
        <React.Fragment>
            {/* Go back icon */}
            <img className="auth-go-back-btn" src="/icons/go-back-left-arrow.svg" alt="go back" onClick={goBack} />
            <div className="auth-form-wrapper login-wrapper">
                <h1 className="auth-form-title login-title">Login</h1>
                {/* <h2 className="auth-form-subTitle login-subTitle">Welcome</h2> */}
                {/* Login form */}
                <form className="auth-form login-form" onSubmit={onFormSubmit}>
                    <div className="form-wrapper">
                        <label className="form-input-label">Email</label>
                        <input
                            className="form-input"
                            type="text"
                            name="email"
                            value={formInput['email']}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div className="form-wrapper">
                        <label className="form-input-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={formInput['password']}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="form-error">{errors.password}</p>}
                    </div>
                    <button className="form-btn login-btn" disabled={loading}>
                        Login {loading && '...'}
                    </button>
                </form>
                {/* Forgot password text */}
                <p className="auth-text-muted auth-form-forgot-password">Forgot password ?</p>
                {/* Span text */}
                <p className="auth-form-bottom-text">or</p>
                {/* Google sign in button */}
                <GoogleAuthButton />
                {/* Sign up link */}
                <p className="auth-does-not-have-account">
                    Does not have account? <span onClick={() => props.setView('register')}>Register now</span>{' '}
                </p>
            </div>
            {/* Auth image */}
            <div className="auth-image-wrapper login-image-wrapper">
                <img className="auth-image login-image" src={'/images/login-image.svg'} alt="login" />
            </div>

            {/* Circle svg */}
            <div className="auth-form-circle" />
        </React.Fragment>
    );
};

export default LoginView;
