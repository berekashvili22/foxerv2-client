import React from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

export default function Home() {
    const images = [
        'https://images.pexels.com/photos/5632346/pexels-photo-5632346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];

    return (
        <React.Fragment>
            <>
                <Swiper pagination={true} modules={[Pagination]} className="container mySwiper">
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="bg-center bg-no-repeat bg-cover border border-gray-300 border-solid h-96"
                                style={{ backgroundImage: `url(${image})` }}>
                                <img className="w-full" alt="" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* <Swiper
                    slidesPerView={'3'}
                    spaceBetween={30}
                    pagination={{
                        clickable: true
                    }}
                    modules={[Pagination]}
                    className="mySwiper">
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="border border-gray-500 border-solid h-96">
                                <img className="max-w-full" src={image} alt="" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            </>
            <section className="text-gray-600 body-font">
                <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
                    <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
                        <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
                            არ გამოტოვო
                            <br className="hidden lg:inline-block" />
                            საუკეთესო შეთავაზებები
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            კოპერ ბუგი არის ერთ-ერთი სუკეთესო რომელიც არ ვიცი სად როგორ ფაფ ლაკ ფ
                            ფდგ დ ლფ მაფმა არ გსდგნ ს მაგმრა ფსა იყიოს ფს ჯფჯა სფას ფსდფს
                            ფმაფმაგმალალფ აფნ ასფნსდფ სდფვსსდ კვსდფვჯო ბონბდ დფნ ადლადლ
                        </p>
                        <div className="flex justify-center">
                            <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                                შესვლა
                            </button>
                            <button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200">
                                ავტორიზაცია
                            </button>
                        </div>
                    </div>
                    <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
                        <img
                            className="object-cover object-center rounded"
                            alt="hero"
                            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                    </div>
                </div>
            </section>
            {/*  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <h1 className="mb-20 text-2xl font-medium text-center text-gray-900 sm:text-3xl title-font">
                        Raw Denim Heirloom Man Braid
                        <br className="hidden sm:block" />
                        Selfies Wayfarers
                    </h1>
                    <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
                        <div className="flex p-4 md:w-1/3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-indigo-500 bg-indigo-100 rounded-full">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                                    Shooting Stars
                                </h2>
                                <p className="text-base leading-relaxed">
                                    Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                                    taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                                    banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                                    live-edge tilde.
                                </p>
                                <a className="inline-flex items-center mt-3 text-indigo-500">
                                    Learn More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex p-4 md:w-1/3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-indigo-500 bg-indigo-100 rounded-full">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24">
                                    <circle cx={6} cy={6} r={3} />
                                    <circle cx={6} cy={18} r={3} />
                                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                                </svg>
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                                    The Catalyzer
                                </h2>
                                <p className="text-base leading-relaxed">
                                    Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                                    taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                                    banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                                    live-edge tilde.
                                </p>
                                <a className="inline-flex items-center mt-3 text-indigo-500">
                                    Learn More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex p-4 md:w-1/3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-indigo-500 bg-indigo-100 rounded-full">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                </svg>
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                                    Neptune
                                </h2>
                                <p className="text-base leading-relaxed">
                                    Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                                    taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                                    banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                                    live-edge tilde.
                                </p>
                                <a className="inline-flex items-center mt-3 text-indigo-500">
                                    Learn More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*  */}
            <section className="text-gray-600 body-font">
                <div className="container flex flex-wrap px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font lg:w-1/3 lg:mb-0">
                            Master Cleanse Reliac Heirloom
                        </h1>
                        <p className="mx-auto text-base leading-relaxed lg:pl-6 lg:w-2/3">
                            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                            gentrify, subway tile poke farm-to-table. Franzen you probably haven't
                            heard of them man bun deep jianbing selfies heirloom.
                        </p>
                    </div>
                    <div className="flex flex-wrap -m-1 md:-m-2">
                        <div className="flex flex-wrap w-1/2">
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-full"
                                    src="https://dummyimage.com/500x300"
                                />
                            </div>
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-full"
                                    src="https://dummyimage.com/501x301"
                                />
                            </div>
                            <div className="w-full p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-full"
                                    src="https://dummyimage.com/600x360"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap w-1/2">
                            <div className="w-full p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-full"
                                    src="https://dummyimage.com/601x361"
                                />
                            </div>
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-full"
                                    src="https://dummyimage.com/502x302"
                                />
                            </div>
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    className="block object-cover object-center w-full h-full"
                                    src="https://dummyimage.com/503x303"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*  */}
            <section className="text-gray-600 body-font">
                <div className="container flex flex-wrap px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 lg:w-1/2 md:w-full">
                            <div className="flex flex-col p-8 border-2 border-gray-200 border-opacity-50 rounded-lg sm:flex-row">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mb-4 text-indigo-500 bg-indigo-100 rounded-full sm:mr-8 sm:mb-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-8 h-8"
                                        viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                        Shooting Stars
                                    </h2>
                                    <p className="text-base leading-relaxed">
                                        Blue bottle crucifix vinyl post-ironic four dollar toast
                                        vegan taxidermy. Gastropub indxgo juice poutine.
                                    </p>
                                    <a className="inline-flex items-center mt-3 text-indigo-500">
                                        Learn More
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 lg:w-1/2 md:w-full">
                            <div className="flex flex-col p-8 border-2 border-gray-200 border-opacity-50 rounded-lg sm:flex-row">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mb-4 text-indigo-500 bg-indigo-100 rounded-full sm:mr-8 sm:mb-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-10 h-10"
                                        viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                        <circle cx={12} cy={7} r={4} />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                        The Catalyzer
                                    </h2>
                                    <p className="text-base leading-relaxed">
                                        Blue bottle crucifix vinyl post-ironic four dollar toast
                                        vegan taxidermy. Gastropub indxgo juice poutine.
                                    </p>
                                    <a className="inline-flex items-center mt-3 text-indigo-500">
                                        Learn More
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*  */}
        </React.Fragment>
    );
}
