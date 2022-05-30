import { navigation } from '../staticData.js';

import React, { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
    MenuIcon,
    SearchIcon,
    ShoppingBagIcon,
    XIcon,
    HeartIcon,
    UserIcon,
    UserCircleIcon,
    DotsVerticalIcon,
    ChevronDoubleDownIcon,
    ChevronDownIcon,
    LogoutIcon,
    ClipboardIcon,
    InboxIcon
} from '@heroicons/react/outline';

import HeaderTopBar from '../components/HeaderTopBar';
import HeaderBurgerButton from '../components/HeaderBurgerButton';
import HeaderLogo from '../components/HeaderLogo';
import HeaderNavigationItem from '../components/HeaderNavigationItem';

import Link from 'next/link';

import useOnClickOutside from '../../../common/hooks/useClickOutside.js';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../../store/features/user/userSlice.js';
import { useMessage } from '../../../common/hooks/useMessage.js';
import { messages } from '../../../common/utils/messages.js';

const headerNavigationItems = [
    { title: 'კატეგორიები', slug: '/about-us' },
    { title: 'ჩვენს შესახებს', slug: '/about-us' },
    { title: 'წესები & პირობები', slug: '/about-us' },
    { title: 'კონტაქტი', slug: '/about-us' }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function HeaderView() {
    const { setModalMessage } = useMessage();

    const { user } = useSelector((store) => store.user);

    const dispatch = useDispatch();

    const router = useRouter();

    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = React.useRef();

    useOnClickOutside(ref, () => setMenuOpen(false));

    const [open, setOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);

    function logOut() {
        localStorage.setItem('user', null);
        dispatch(removeUser(null));
        setModalMessage('თქვენ გამოხვედით სისტემიდან', 3000, false);
    }

    // Call hook passing in the ref and a function to call on outside click

    function handleUserMenuClick() {
        if (!user) {
            router.push('/auth');
        } else {
            setUserMenuIsOpen(true);
        }
    }

    if (router.asPath.indexOf('auth') > -1) {
        return '';
    }
    return (
        <React.Fragment>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                                        onClick={() => setOpen(false)}>
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="w-6 h-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="flex px-4 -mb-px space-x-8">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected
                                                                ? 'text-indigo-600 border-indigo-600'
                                                                : 'text-gray-900 border-transparent',
                                                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                        )
                                                    }>
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel
                                                key={category.name}
                                                className="px-4 pt-10 pb-8 space-y-10">
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            className="relative text-sm group">
                                                            <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
                                                                <img
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt}
                                                                    className="object-cover object-center"
                                                                />
                                                            </div>
                                                            <a
                                                                href={item.href}
                                                                className="block mt-6 font-medium text-gray-900">
                                                                <span
                                                                    className="absolute inset-0 z-10"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p
                                                            id={`${category.id}-${section.id}-heading-mobile`}
                                                            className="font-medium text-gray-900">
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="flex flex-col mt-6 space-y-6">
                                                            {section.items.map((item) => (
                                                                <li
                                                                    key={item.name}
                                                                    className="flow-root">
                                                                    <a
                                                                        href={item.href}
                                                                        className="block p-2 -m-2 text-gray-500">
                                                                        {item.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a
                                                href={page.href}
                                                className="block p-2 -m-2 font-medium text-gray-900">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="block p-2 -m-2 font-medium text-gray-900">
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="block p-2 -m-2 font-medium text-gray-900">
                                            Create account
                                        </a>
                                    </div>
                                </div>

                                <div className="px-4 py-6 border-t border-gray-200">
                                    <a href="#" className="flex items-center p-2 -m-2">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="flex-shrink-0 block w-5 h-auto"
                                        />
                                        <span className="block ml-3 text-base font-medium text-gray-900">
                                            CAD
                                        </span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <header className="relative flex flex-col justify-between mx-auto body-font">
                <HeaderTopBar />
                <div className="container flex justify-between mx-auto ">
                    <div className="flex justify-between pt-5 pb-5 align-center ">
                        <HeaderBurgerButton openMenu={() => setOpen(true)} />
                        <HeaderLogo />
                        <nav
                            className="items-end hidden text-base text-gray-600 justify-baseline lg:flex"
                            ref={ref}>
                            {headerNavigationItems.map(({ title }, index) => (
                                <HeaderNavigationItem
                                    title={title}
                                    onClick={() => setMenuOpen(true)}
                                    key={index}
                                />
                            ))}
                        </nav>
                        <div
                            className="absolute inset-x-0 z-50 w-full text-gray-500 bg-white drop-shadow-md top-28"
                            style={{ display: !menuOpen ? 'none' : '' }}
                            ref={ref}>
                            {navigation.categories.map((category, index) => (
                                <div className="container p-2 mx-auto " key={index}>
                                    <div className="grid grid-cols-2 py-16 gap-y-10 gap-x-8">
                                        <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                            {category.featured.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="relative text-base group">
                                                    <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
                                                        <img
                                                            src={item.imageSrc}
                                                            alt={item.imageAlt}
                                                            className="object-cover object-center"
                                                        />
                                                    </div>
                                                    <a
                                                        href={item.href}
                                                        className="block mt-6 font-medium text-gray-900">
                                                        <span
                                                            className="absolute inset-0 z-10"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </a>
                                                    <p aria-hidden="true" className="mt-1">
                                                        Shop now
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-3 row-start-1 text-base gap-y-10 gap-x-8">
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p
                                                        id={`${section.name}-heading`}
                                                        className="font-medium text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${section.name}-heading`}
                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flex">
                                                                <a
                                                                    href={item.href}
                                                                    className="hover:text-gray-800">
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right menu */}
                    <div className="relative flex items-center pr-3 ml-auto md:pr-0">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                                </a>
                            </div>
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
                                    {/* Modal */}
                                    <div
                                        className="absolute w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg right-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                                    <a className="block p-2 -m-2 font-medium text-gray-900">
                                        ავტორიზაცია
                                    </a>
                                </div>
                            )}
                            <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                        </div>

                        {/* Wishlist */}
                        <div className="flow-root ml-4 lg:ml-6">
                            <a href="#" className="flex items-center p-2 -m-2 group">
                                <HeartIcon
                                    className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                    0
                                </span>
                                <span className="sr-only">items in cart, view bag</span>
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
                    </div>
                    {/*  */}
                </div>
            </header>
        </React.Fragment>
    );
}
