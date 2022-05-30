const HeaderNavigationItem = ({ title, onClick }) => {
    return (
        <a className="mr-5 cursor-pointer hover:text-gray-900" onClick={onClick}>
            {title}
        </a>
    );
};

export default HeaderNavigationItem;
