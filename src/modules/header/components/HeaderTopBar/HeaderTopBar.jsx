import { TruckIcon } from '@heroicons/react/outline';

const HeaderTopBar = ({ text }) => {
    return (
        <p className="flex items-center justify-center h-10 px-4 text-xs sm:text-base font-bold text-white bg-indigo-600 sm:px-6 lg:px-8">
            <TruckIcon className="w-4 h-4  mr-2 sm:w-6 sm:h-6 sm:mr-3" />
            {text}
        </p>
    );
};

export default HeaderTopBar;
