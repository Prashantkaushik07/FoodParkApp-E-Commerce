import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerSlider() {
  const [slides, setSlides] = useState([]);

  // Direct API URL
  const GET_SLIDERS = 'http://localhost:5000/api/slider';

  useEffect(() => {
    axios.get(GET_SLIDERS)
      .then(res => {
        const fetched = Array.isArray(res.data?.sliders)
          ? res.data.sliders
          : [];
        setSlides(fetched);
      })
      .catch(err => console.error("Error fetching slider data:", err));
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    appendDots: dots => <ul style={{ margin: 0 }}>{dots}</ul>,
    customPaging: i => <button>{i + 1}</button>,
  };

  if (!slides.length) {
    return <div>Loading banners…</div>;
  }

  return (
  <section
    className="fp__banner"
    style={{ background: 'url(images/banner_bg.jpg)' }}
    aria-label="Banner Slider Section"
  >
    <div className="fp__banner_overlay">
      <div className="row banner_slider">
        <Slider {...settings}>
          {slides.map(slider => (
            <div key={slider._id} className="col-12">
              <div className="fp__banner_slider">
                <div className="container">
                  <div className="row">
                    {/* Image on the LEFT */}
                    <div className="col-xl-5 col-md-5 col-lg-5">
                      <div
                        className="fp__banner_img wow fadeInLeft"
                        data-wow-duration="1s"
                      >
                        <div className="img">
                          <img
                            src={`http://localhost:5000/${slider.img}`}
                            alt={slider.text}
                            className="img-fluid w-100"
                          />
                          <span
                            style={{
                              backgroundImage: 'url(images/offer_shapes.png)',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover'
                            }}
                          >
                            {slider.discount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text on the RIGHT */}
                    <div className="col-xl-5 col-md-7 col-lg-6">
                      <div
                        className="fp__banner_text wow fadeInRight"
                        data-wow-duration="1s"
                      >
                        <h1>{slider.text}</h1>
                        <h3>{slider.subtitle}</h3>
                        <p>{slider.description}</p>
                        <ul className="d-flex flex-wrap">
                          <li>
                            <a className="common_btn" href="#">
                              Shop Now
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </section>
);

}
