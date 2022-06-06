import React from 'react';
import { useRouter } from 'next/router';

import useOnClickOutside from '../../../../common/hooks/useClickOutside.js';

import NavigationDropdownMenu from './NavigationDropdownMenu';

const HeaderMainNavigation = ({ navigationItems }) => {
    const [activeNavigationItem, setActiveNavigationItem] = React.useState(false);

    const router = useRouter();

    function updateActiveNavigationItem(value) {
        setActiveNavigationItem(value);
    }

    function handleNavigationItemClick(slug, value) {
        if (slug) {
            router.push(slug);
            return;
        }

        updateActiveNavigationItem(value);
    }

    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = React.useRef();
    useOnClickOutside(ref, () => updateActiveNavigationItem(false));

    return (
        <React.Fragment>
            <nav className="container mx-auto  items-center hidden text-base text-gray-600 justify-center lg:flex w-full">
                {navigationItems.map((navigationItem, index) => (
                    <a
                        className={`mr-10 text-lg font-bold cursor-pointer hover:text-gray-900 ${navigationItem.customStyle}`}
                        onClick={() => handleNavigationItemClick(navigationItem.slug, index)}
                        key={navigationItem.title}
                        name={'navigationItem'}>
                        {navigationItem.title}
                    </a>
                ))}
            </nav>
            {navigationItems[activeNavigationItem] && (
                <div
                    className="absolute inset-x-0 z-40 w-full text-gray-500 bg-white drop-shadow-md top-44"
                    ref={ref}>
                    <NavigationDropdownMenu
                        navigationItem={navigationItems[activeNavigationItem]}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default HeaderMainNavigation;
