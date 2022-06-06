const InputField = ({
    name,
    placeholder,
    title,
    type,
    value,
    handleInputChange,
    errorClass,
    error
}) => {
    return (
        <div
            className={`relative  w-full d-flex ${
                type === 'checkbox' ? 'flex-row justify-between mt-2' : 'flex-col'
            } `}>
            <label className="text-base text-gray mb-1 text-gray-700">{title}</label>
            <input
                className={`block px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-5 ${
                    type === 'checkbox' ? 'w-5 h-5 cursor-pointer' : ''
                }`}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
            />
            {error && (
                <p className={`absolute bottom-0 text-red-600 text-sm  ${errorClass}`}>{error}</p>
            )}
        </div>
    );
};

export default InputField;
