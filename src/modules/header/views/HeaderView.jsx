import React from 'react';
import dynamic from 'next/dynamic';

import { useDispatch, useSelector } from 'react-redux';

import { removeUser } from '../../../store/features/user/userSlice.js';

import { useMessage } from '../../../common/hooks/useMessage.js';

import { data } from '../staticData.js';

import {
    ShoppingBagIcon,
    UserIcon,
    UserCircleIcon,
    ChevronDownIcon,
    LogoutIcon,
    ClipboardIcon,
    InboxIcon
} from '@heroicons/react/outline';

const AuthModalView = dynamic(() => import('../../auth/views/AuthModalView.jsx'));

import { useModal } from '../../../common/hooks/useModal.js';

import MobileMenu from '../components/MobileMenu/MobileMenu.jsx';
import HeaderTopBar from '../components/HeaderTopBar';
import HeaderLogo from '../components/HeaderLogo';
import HeaderBurgerButton from '../components/HeaderBurgerButton';
import HeaderMainNavigation from '../components/HeaderMainNavigation/HeaderMainNavigation.jsx';
import HeaderSearch from '../components/HeaderSearch/HeaderSearch.jsx';

export default function HeaderView() {
    const { user } = useSelector((store) => store.user);

    const dispatch = useDispatch();

    const { setModalMessage } = useMessage();
    const { authModalIsOpen, toggleModalState } = useModal();

    const [userMenuIsOpen, setUserMenuIsOpen] = React.useState(false);

    function logOut() {
        localStorage.setItem('user', null);
        dispatch(removeUser(null));
        setModalMessage('თქვენ გამოხვედით სისტემიდან', 3000, false);
    }

    // Call hook passing in the ref and a function to call on outside click
    function handleUserMenuClick() {
        if (!user) {
            toggleModalState('authModalIsOpen', true);
        } else {
            setUserMenuIsOpen(true);
        }
    }

    return (
        <React.Fragment>
            {authModalIsOpen && <AuthModalView />}
            {/* <MobileMenu setOpen={setOpen} open={open} /> */}
            <header className="relative flex flex-col justify-between mx-auto body-font">
                <HeaderTopBar text={data.strings.topBar.text} />
                <div className="container flex justify-between mx-auto px-2 md:px-0 ">
                    <div className="flex flex-1 shrink-0 justify-start md:justify-between pt-5 pb-5 align-center w-full lg:w-full">
                        <HeaderLogo />
                        <HeaderBurgerButton openMenu={() => setOpenMenu(true)} />
                        <nav className="items-center justify-between hidden lg:flex">
                            {data.leftNavigationItems.map((navigationItem, index) => (
                                <a
                                    className="mr-5 text-base font-bold cursor-pointer text-gray-600 hover:text-gray-900"
                                    onClick={() => updateActiveNavigationItem(index)}
                                    key={navigationItem.title}>
                                    {navigationItem.title}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="shrink hidden lg:ml-6 md:flex  w-full mx-2 md:mx-10 items-center relative">
                        <HeaderSearch />
                    </div>
                    {/* Right menu */}
                    <div className="relative flex flex-1 items-center justify-end pr-3 ml-auto md:pr-0">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            {/* User */}
                            {user ? (
                                <div
                                    className="flow-root ml-4 e lg:ml-6"
                                    onClick={() => handleUserMenuClick()}
                                    onMouseOver={() => setUserMenuIsOpen(true)}
                                    onMouseLeave={() => setUserMenuIsOpen(false)}>
                                    <button className="flex items-center p-2 -m-2 group">
                                        <UserIcon
                                            className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <ChevronDownIcon className="w-4 h-4 mt-3 text-gray-400 group-hover:text-gray-500 " />
                                    </button>
                                    <div
                                        className="absolute w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg right-24 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        style={{ display: userMenuIsOpen ? '' : 'none' }}>
                                        <li className="items-center p-2 transition border-b border-gray-200 border-solid cursor-pointer d-flex hover:bg-gray-100 ease-linear-300">
                                            <UserCircleIcon className="w-5 h-5 mr-2 text-gray-400" />
                                            <p className="font-bold text-gray-700 text-normal">
                                                პროფილი
                                            </p>
                                        </li>
                                        <li className="items-center p-2 transition border-b border-gray-200 border-solid cursor-pointer d-flex hover:bg-gray-100 ease-linear-300">
                                            <ClipboardIcon className="w-5 h-5 mr-2 text-gray-400" />
                                            <p className="font-bold text-gray-700 text-normal">
                                                შეკვეთები
                                            </p>
                                        </li>
                                        <li className="items-center p-2 transition border-b border-gray-200 border-solid cursor-pointer d-flex hover:bg-gray-100 ease-linear-300">
                                            <InboxIcon className="w-5 h-5 mr-2 text-gray-400" />
                                            <p className="font-bold text-gray-700 text-normal">
                                                შეტყობინებები
                                            </p>
                                        </li>
                                        <li
                                            className="items-center p-2 transition border-b border-gray-200 border-solid cursor-pointer d-flex hover:bg-gray-100 ease-linear-300"
                                            onClick={() => logOut()}>
                                            <LogoutIcon className="w-5 h-5 mr-2 text-gray-400" />
                                            <p className="font-bold text-gray-700 text-normal">
                                                გასვლა
                                            </p>
                                        </li>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flow-root cursor-pointer"
                                    onClick={() => handleUserMenuClick()}>
                                    <a className="block p-2 -m-2 font-medium text-gray-900 hover:text-black">
                                        {'ავტორიზაცია'}
                                    </a>
                                </div>
                            )}
                            <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                        </div>
                        {/* User */}
                        <div
                            className="flow-root ml-4 lg:ml-6 lg:hidden"
                            onClick={() => handleUserMenuClick()}>
                            <a href="#" className="flex items-center p-2 -m-2 group">
                                <UserIcon
                                    className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </a>
                        </div>
                        {/* Cart */}
                        <div className="flow-root ml-4 lg:ml-6">
                            <a href="#" className="flex items-center p-2 -m-2 group">
                                <ShoppingBagIcon
                                    className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                    0
                                </span>
                                <span className="sr-only">items in cart, view bag</span>
                            </a>
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div className="container mx-auto w-full flex md:hidden items-center justify-center px-2 sm:px-0">
                    <HeaderSearch />
                </div>
                <HeaderMainNavigation navigationItems={data.MainNavigationItems} />
            </header>
        </React.Fragment>
    );
}
