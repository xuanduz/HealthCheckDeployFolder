import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../assets/images/slide-1.jpg";
import slide2 from "../../assets/images/slide-2.jpg";
import slide3 from "../../assets/images/slide-3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Slider = () => {
  return (
    <div className="min-w-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="flex justify-center">
          <img src={slide1} alt="sl-1" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src={slide2} alt="sl-2" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src={slide3} alt="sl-3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
