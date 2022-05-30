import { MenuIcon } from '@heroicons/react/outline';

const HeaderBurgerButton = ({ openMenu }) => {
    return (
        <button
            type="button"
            className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
            onClick={openMenu}>
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
    );
};

export default HeaderBurgerButton;
