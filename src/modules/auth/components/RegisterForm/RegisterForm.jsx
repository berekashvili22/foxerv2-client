import { useRegister } from '../../hooks/useRegister';

import LocalAuthButton from '../LocalAuthButton';
import InputField from '../InputField';

import { formData, strings } from '../../staticData';

const RegisterForm = () => {
    const { handleInputChange, onFormSubmit, formInput, errors, loading } = useRegister();

    return (
        <form className="flex-col w-full d-flex items-center" onSubmit={onFormSubmit}>
            {formData.register.map(({ name, placeholder, title, type, errorClass }) => (
                <InputField
                    name={name}
                    placeholder={placeholder}
                    title={title}
                    type={type}
                    value={formInput[name]}
                    handleInputChange={handleInputChange}
                    errorClass={errorClass}
                    error={errors[name]}
                    key={name}
                />
            ))}
            <div className="d-flex flex-col w-full justify-left">
                <p className="text-sm underline underline-offset-1 cursor-pointer hover:text-indigo-700 mb-5">
                    {strings.forgotPassword}
                </p>
                <LocalAuthButton loading={false} text={strings.registerButtonText} type={'login'} />
            </div>
        </form>
    );
};

export default RegisterForm;
