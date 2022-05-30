import React from 'react';

import { useLogin } from '../hooks/useLogin';

import InputField from '../components/InputField';
import LocalAuthButton from '../components/LocalAuthButton';

const LoginView = ({ formData, strings }) => {
    const { handleInputChange, onFormSubmit, formInput, errors, loading } = useLogin();

    return (
        <form className="flex-col border-solid d-flex" onSubmit={onFormSubmit}>
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
            <p className="text-right underline cursor-pointer underline-offset-1">
                {strings.forgotPassword}
            </p>
            <LocalAuthButton loading={loading} text={strings.loginButtonText} type={'login'} />
        </form>
    );
};

export default LoginView;
