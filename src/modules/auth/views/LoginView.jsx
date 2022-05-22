import React from 'react';

import { useLogin } from '../hooks/useLogin';

import TailSpinner from '../../../common/components/spinners/TailSpinner';

const LoginView = () => {
    const { handleInputChange, onFormSubmit, formInput, errors, loading } = useLogin();

    return (
        <form className="auth-form login-form" onSubmit={onFormSubmit}>
            <div className="form-wrapper">
                <label className="form-input-label">ელ-ფოსტა</label>
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
                <label className="form-input-label">პაროლი</label>
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
                <p className="form-btn-text login-btn-text">შესვლა</p>
                {loading && <TailSpinner width={10} height={10} />}
            </button>
        </form>
    );
};

export default LoginView;
