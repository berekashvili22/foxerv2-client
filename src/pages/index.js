import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Scrollbar, A11y } from 'swiper';
import SwiperSliderNextBtn from '../common/components/buttons/swiperSliderNextBtn';

const images = [
    'https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

import { useSwiper } from 'swiper/react';

const SwiperButtonNext = ({ children }) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slideNext()}>{children}</button>;
};

export default function Home() {
    const SwiperSliderS = useSwiper();

    return (
        <>
            <Swiper pagination={true} className="main-slider">
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-wrapper">
                            <img src={image} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* <div className="category_slider_wrapper"> */}
            {/* <div className="category_slider"> */}
            {/* <div className="category_slider_arrow right-arrow" onClick={() => swiper?.slideNext()}>
                        <img src={'/icons/right-arrow.svg'} />
                    </div> */}
            {/* <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        slidesPerGroup={4}
                        loop={false}
                        // loopFillGroupWithBlank={true}
                        pagination={{
                            clickable: true
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"> */}
            {/* <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} navigation spaceBetween={20} slidesPerView={1}>
                <SwiperButtonNext>Slide</SwiperButtonNext>
                <SwiperSlide>
                    <img
                        className="category_slider-image"
                        src={
                            'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="category_slider-image"
                        src={
                            'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="category_slider-image"
                        src={
                            'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="category_slider-image"
                        src={
                            'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="category_slider-image"
                        src={
                            'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="category_slider-image"
                        src={
                            'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        }
                    />
                </SwiperSlide>
            </Swiper> */}
            {/* </div> */}
            {/* </div> */}
        </>
    );
}
