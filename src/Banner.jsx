import React from 'react'
import './new.css'
import banner from './assets/images/banner.png'

function Banner() {
  return (
    <div className="shopify-section  h-screen z-10 relative section section_homepage section_image-with-text-overlay">
      <div className="section_wrap h-screen min-h-52 flexible_block__medium">
        <div
          className="img_placeholder__wrap h-screen img_placeholder__medium"
          style={{
            backgroundImage: `url(${banner})`,
            minHeight: '200px', // Use the imported image variable
          }}
        ></div>

        <div className="section_txt align_center full_width">
          <div className="caption_text_left inverted">
            <h5 className="hidden-small">Creating a feature now!</h5>
            <h2>Best Laptops!</h2>
            <p className={'hidden-small'}>
              Our extensive collection of men’s and women’s!
            </p>
          </div>
          <div className="caption_text_right">
            <h4 className="hidden sm:inline text-sm md:text-lg lg:text-xl hidden-small">
              Great deals every weekends!
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              From $699
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
