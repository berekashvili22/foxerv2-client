import TailSpinner from '../../../../common/components/spinners/TailSpinner';

const LocalAuthButton = ({ loading, text, type }) => {
    return (
        <button className={`form-btn ${type}-btn`} disabled={loading}>
            <p className={`form-btn-text ${type}-btn-text`}>{text}</p>
            {loading && <TailSpinner width={10} height={10} />}
        </button>
    );
};

export default LocalAuthButton;
