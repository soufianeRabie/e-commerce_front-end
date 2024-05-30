import React from 'react'
import './new.css';
import banner from './assets/images/banner.png';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useState,useEffect } from 'react';
import { RxDotFilled } from "react-icons/rx";
function Banner() {
  const slides = [
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-152-1-1.png" },
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-150-1-1.png" },
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-145-1-1.png" },
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-147-1-1.png" },
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-149-1-1.png" },
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-136-1-1.png" },
    { url: "https://www.ultrapc.ma/themes/creacomputer/assets/img/slide-img-153-1-1.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 7000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [currentIndex]); // Adding currentIndex as a dependency

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[700px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FaChevronLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FaChevronRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}


    // <div className="shopify-section  h-screen z-10 relative section section_homepage section_image-with-text-overlay">
    //   <div className="section_wrap h-screen min-h-52 flexible_block__medium">
    //     <div
    //       className="img_placeholder__wrap h-screen img_placeholder__medium"
    //       style={{
    //         backgroundImage: `url(${banner})`,
    //         minHeight: '200px', // Use the imported image variable
    //       }}
    //     ></div>

    //     <div className="section_txt align_center full_width">
    //       <div className="caption_text_left inverted">
    //         <h5 className="hidden-small">Creating a feature now!</h5>
    //         <h2>Best Laptops!</h2>
    //         <p className={'hidden-small'}>
    //           Our extensive collection of men’s and women’s!
    //         </p>
    //       </div>
    //       <div className="caption_text_right">
    //         <h4 className="hidden sm:inline text-sm md:text-lg lg:text-xl hidden-small">
    //           Great deals every weekends!
    //         </h4>
    //         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    //           From $699
    //         </h2>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    


export default Banner
