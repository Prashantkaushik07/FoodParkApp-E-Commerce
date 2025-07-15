// src/components/BannerSlider.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { apiList } from '../apilist';    // ← named import

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerSlider() {
  const [slides, setSlides] = useState([]);
  const [sliderTexts, setSliderTexts] = useState({});

  const GET_SLIDERS = apiList.SLIDER;
  const UPDATE_SLIDER = id => apiList.SLIDER_BY_ID(id);

  useEffect(() => {
    axios.get(GET_SLIDERS)
      .then(res => {
        setSlides(res.data.sliders);
        const initial = {};
        res.data.sliders.forEach(s => { initial[s._id] = s.text });
        setSliderTexts(initial);
      })
      .catch(err => console.error("Error fetching slider data:", err));
  }, [GET_SLIDERS]);

  const handleTextChange = (id, e) => {
    setSliderTexts(prev => ({ ...prev, [id]: e.target.value }));
  };

  const handleSubmit = id => {
    const newText = sliderTexts[id];
    axios
      .put(UPDATE_SLIDER(id), { text: newText })
      .then(({ data }) => {
        setSlides(prev =>
          prev.map(s => (s._id === id ? { ...s, text: data.slider.text } : s))
        );
        alert('Slider text updated');
      })
      .catch(err => {
        console.error('Error updating slider:', err.response || err);
        alert('Failed to update');
      });
  };

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

  if (slides.length === 0) {
    return <div>Loading banners…</div>;
  }

  return (
    <section
      className="fp__banner"
      style={{ background: 'url(images/banner_bg.jpg) center/cover no-repeat' }}
      aria-label="Banner Slider Section"
    >
      <div className="fp__banner_overlay">
        <Slider {...settings} className="banner_slider">
          {slides.map(slider => (
            <div key={slider._id} className="col-12">
              <div className="fp__banner_slider">
                <div className="container">
                  <div className="row align-items-center">
                    {/* Image on the LEFT */}
                    <div className="col-xl-5 col-md-5 col-lg-5">
                      <div className="fp__banner_img wow fadeInLeft" data-wow-duration="1s">
                        <div className="img position-relative">
                          <img
                            src={`http://localhost:5000/${slider.img}`} // hard-coded host
                            alt={`Slide ${slider._id}`}
                            className="img-fluid w-100 rounded-circle"
                          />
                          <span className="position-absolute top-0 end-0 bg-orange text-white p-2 rounded-start">
                            {slider.discount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text on the RIGHT */}
                    <div className="col-xl-5 col-md-7 col-lg-6 offset-xl-1">
                      <div className="fp__banner_text wow fadeInRight" data-wow-duration="1s">
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

                    {/* Inline editor */}
                    <div className="col-12 mt-3">
                      <input
                        type="text"
                        value={sliderTexts[slider._id] || ''}
                        onChange={e => handleTextChange(slider._id, e)}
                        placeholder="Enter new slider text"
                        style={{ marginRight: 8 }}
                      />
                      <button onClick={() => handleSubmit(slider._id)}>
                        Update Slider
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
