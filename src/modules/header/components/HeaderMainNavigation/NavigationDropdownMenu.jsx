import React from 'react';

const NavigationDropdownMenu = ({ navigationItem }) => {
    return (
        <React.Fragment>
            {navigationItem.categories.map((category, index) => (
                <div className="container p-2 mx-auto " key={index}>
                    <div className="grid grid-cols-2 py-16 gap-y-10 gap-x-8">
                        <div className="grid grid-cols-2 col-start-2 gap-x-8">
                            {category.featured.map((item) => (
                                <div key={item.name} className="relative text-base group">
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
                                                <a href={item.href} className="hover:text-gray-800">
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
        </React.Fragment>
    );
};

export default NavigationDropdownMenu;
