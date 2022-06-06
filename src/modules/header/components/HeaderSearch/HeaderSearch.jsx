import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const HeaderSearch = () => {
    const [searchIsFocused, setSearchIsFocused] = React.useState(false);

    function updateSearchFocusState(value) {
        setSearchIsFocused(value);

        if (value === true) {
            document.getElementById('black-blur').style.display = 'block';
        } else {
            document.getElementById('black-blur').style.display = 'none';
        }
    }

    return (
        <React.Fragment>
            <input
                onFocus={() => updateSearchFocusState(true)}
                onBlur={() => updateSearchFocusState(false)}
                className="w-full h-12 text-black  bg-gray-100 rounded-l-md px-4 focus:outline-none"
                // name={'search'}
                placeholder={'შეიყვანე საძიებო სიტყვა'}
                type={'text'}
            />
            <a className="p-2 text-gray-400 d-flex items-center hover:text-gray-500 bg-gray-100 h-12  right-2 top-2 md:top-4 cursor-pointer rounded-r-md">
                <span className="sr-only">Search</span>
                <SearchIcon className="w-5 h-5" aria-hidden="true" />
            </a>
        </React.Fragment>
    );
};

export default HeaderSearch;
