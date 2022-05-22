import React from 'react';

import { useRegister } from '../hooks/useRegister';

import TailSpinner from '../../../common/components/spinners/TailSpinner';

const RegisterView = () => {
    const { handleInputChange, onFormSubmit, formInput, errors, loading } = useRegister();

    return (
        <form
            className="auth-form login-form"
            onSubmit={onFormSubmit}
            autoComplete="off"
            autofill="off">
            <div className="form-wrapper">
                <label className="form-input-label">ელ-ფოსტა *</label>
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
                <label className="form-input-label">სახელი *</label>
                <input
                    className="form-input"
                    type="text"
                    name="firstName"
                    value={formInput['firstName']}
                    onChange={handleInputChange}
                />
                {errors.firstName && <p className="form-error">{errors.firstName}</p>}
            </div>
            <div className="form-wrapper">
                <label className="form-input-label">გვარი *</label>
                <input
                    className="form-input"
                    type="text"
                    name="lastName"
                    value={formInput['lastName']}
                    onChange={handleInputChange}
                />
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
            </div>
            <div className="form-wrapper">
                <label className="form-input-label">პაროლი *</label>
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    value={formInput['password']}
                    onChange={handleInputChange}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}
            </div>
            <div className="form-wrapper">
                <label className="form-input-label">გაიმეორეთ პაროლი *</label>
                <input
                    className="form-input"
                    type="password2"
                    name="password2"
                    value={formInput['password2']}
                    onChange={handleInputChange}
                />
                {errors.password2 && <p className="form-error">{errors.password2}</p>}
            </div>
            <div className="form-wrapper auth-checkbox-form-wrapper">
                <label className="form-input-label">
                    ვეთანხმები <span>წესებს და პირობებს </span>
                </label>
                <input
                    className="form-input auth-checkbox-form-input"
                    type="checkbox"
                    name="agreedOnTerms"
                    value={formInput['agreedOnTerms']}
                    onChange={handleInputChange}
                />
                {errors.agreedOnTerms && <p className="form-error">{errors.agreedOnTerms}</p>}
            </div>
            <button className="form-btn login-btn" disabled={loading}>
                <p className="form-btn-text login-btn-text">რეგისტრაცია</p>
                {loading && <TailSpinner width={10} height={10} />}
            </button>
        </form>
    );
};

export default RegisterView;
