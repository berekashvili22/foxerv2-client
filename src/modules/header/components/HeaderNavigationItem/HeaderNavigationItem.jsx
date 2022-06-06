const HeaderNavigationItem = ({ title, onClick }) => {
    return (
        <a
            className="mr-6 text-base font-bold cursor-pointer hover:text-gray-900"
            onClick={onClick}>
            {title}
        </a>
    );
};

export default HeaderNavigationItem;
