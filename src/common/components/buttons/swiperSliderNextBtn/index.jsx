import { useSwiper } from 'swiper/react';

const SwiperSliderNextBtn = () => {
    const swiper = useSwiper();

    return (
        <div className="category_slider_arrow left-arrow" onClick={() => swiper?.slideNext()}>
            <img src={'/icons/left-arrow.svg'} />
        </div>
    );
};

export default SwiperSliderNextBtn;
