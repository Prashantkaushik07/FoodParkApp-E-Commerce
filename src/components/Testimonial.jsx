// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function Testimonials() {
  const [section, setSection] = useState(null);
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    Promise.all([
      axios.get('/api/testimonial-section'),
      axios.get('/api/testimonials'),
    ])
      .then(([secRes, itemsRes]) => {
        setSection(secRes.data);
        setItems(itemsRes.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load testimonials');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="fp__testimonial pt_95 xs_pt_66 mb_150 xs_mb_120 text-center">
        <p>Loading testimonials…</p>
      </section>
    );
  }
  if (error || !section) {
    return (
      <section className="fp__testimonial pt_95 xs_pt_66 mb_150 xs_mb_120 text-center">
        <p>{error || 'Unable to load testimonial section.'}</p>
      </section>
    );
  }

  // react-slick settings
  const settings = {
    dots: true,
    arrows: true,
    infinite: items.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="fp__testimonial pt_95 xs_pt_66 mb_150 xs_mb_120">
      <div className="container">
        {/* heading */}
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_40">
              <h4>{section.preTitle}</h4>
              <h2>{section.title}</h2>
              <span>
                <img
                  src="images/heading_shapes.png"
                  alt="shapes"
                  className="img-fluid w-100"
                />
              </span>
              <p>{section.description}</p>
            </div>
          </div>
        </div>

        {/* slider */}
        <Slider {...settings} className="row testi_slider">
          {items.map(i => (
            <div key={i._id} className="col-xl-4">
              <div className="fp__single_testimonial wow fadeInUp" data-wow-duration="1s">
                <div className="fp__testimonial_header d-flex flex-wrap align-items-center">
                  <div className="img">
                    <img
                      src={i.avatarUrl}
                      alt={i.name}
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="text">
                    <h4>{i.name}</h4>
                    <p>{i.location}</p>
                  </div>
                </div>
                <div className="fp__single_testimonial_body">
                  <p className="feedback">{i.quote}</p>
                  <span className="rating">
                    {Array.from({ length: 5 }, (_, idx) => {
                      if (i.rating >= idx + 1) {
                        return <i key={idx} className="fas fa-star" />;
                      } else if (i.rating > idx && i.rating < idx + 1) {
                        return <i key={idx} className="fas fa-star-half-alt" />;
                      } else {
                        return <i key={idx} className="far fa-star" />;
                      }
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
