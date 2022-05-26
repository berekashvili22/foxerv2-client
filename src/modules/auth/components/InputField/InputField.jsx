const InputField = ({
    name,
    placeholder,
    title,
    type,
    value,
    wrapperClass,
    inputClass,
    handleInputChange,
    errorClass,
    error
}) => {
    return (
        <div className={`form-wrapper ${wrapperClass}`}>
            <label className="form-input-label">{title}</label>
            <input
                className={`form-input ${inputClass}`}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
            />
            {error && <p className={`form-error ${errorClass}`}>{error}</p>}
        </div>
    );
};

export default InputField;
