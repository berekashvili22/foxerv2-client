import TailSpinner from '../../../../common/components/spinners/TailSpinner';

const LocalAuthButton = ({ loading, text, type }) => {
    return (
        <button
            className={`bg-indigo-500 text-white rounded font-bold text-xl p-1 mt-3 hover:bg-indigo-700 ease-out duration-300`}
            disabled={loading}>
            <p>{text}</p>
            {loading && <TailSpinner width={10} height={10} />}
        </button>
    );
};

export default LocalAuthButton;
