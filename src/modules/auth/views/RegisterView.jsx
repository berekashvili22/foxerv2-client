import React from 'react';

import { useRegister } from '../hooks/useRegister';

import InputField from '../components/InputField';
import LocalAuthButton from '../components/LocalAuthButton';

const RegisterView = ({ formData, strings }) => {
    const { handleInputChange, onFormSubmit, formInput, errors, loading } = useRegister();

    return (
        <form className="auth-form login-form" onSubmit={onFormSubmit}>
            {/* Create form fields */}
            {formData.map(
                ({ name, placeholder, title, type, errorClass, wrapperClass, inputClass }) => (
                    <InputField
                        name={name}
                        placeholder={placeholder}
                        title={title}
                        type={type}
                        value={formInput[name]}
                        wrapperClass={wrapperClass}
                        inputClass={inputClass}
                        handleInputChange={handleInputChange}
                        errorClass={errorClass}
                        error={errors[name]}
                        key={name}
                    />
                )
            )}
            <LocalAuthButton
                loading={loading}
                text={strings.registerButtonText}
                type={'register'}
            />
        </form>
    );
};

export default RegisterView;
