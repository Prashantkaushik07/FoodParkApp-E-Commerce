// src/components/DailyOffer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function DailyOffer() {
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/daily-offer')
      .then(({ data }) => {
        setDaily(data.daily);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading daily offer:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-5">Loading offers…</div>;
  if (!daily)  return <div className="text-center py-5">No offers available</div>;

  const { small, title, subTitle, offers, actions = [] } = daily;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: Math.min(offers.length, 3),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: Math.min(offers.length, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => <ul style={{ margin: 0 }}>{dots}</ul>,
    customPaging: () => (
      <button
        style={{
          width: 12,
          height: 12,
          border: 'none',
          borderRadius: '50%',
          backgroundColor: 'orange',
        }}
      />
    ),
  };

  return (
    <section className="fp__offer_item mt_100 xs_mt_70 pt_95 xs_pt_65 pb_150 xs_pb_120">
      <div className="container">
        {/* Heading */}
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_50">
              <h4>{small}</h4>
              <h2>{title}</h2>
              <span>
                <img
                  src="http://localhost:5000/images/heading_shapes.png"
                  alt="shapes"
                  className="img-fluid w-100"
                />
              </span>
              <p>{subTitle}</p>
            </div>
          </div>
        </div>

        {/* Slider */}
        <Slider
          {...settings}
          className="offer_item_slider wow fadeInUp"
          data-wow-duration="1s"
        >
          {offers.map(({ _id, img, discount, title: t, desc }) => (
            <div key={_id} className="px-2">
              <div className="fp__offer_item_single">
                <div className="img">
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt={t}
                    className="img-fluid w-100"
                  />
                </div>
                <div className="text">
                  <span>{discount}</span>
                  <a className="title" href="/menu-details">{t}</a>
                  <p>{desc}</p>

                  <ul className="d-flex flex-wrap">
                    {actions.map((act, idx) => (
                      <li key={idx} className="me-3">
                        <a
                          href={act.url || '#'}
                          data-bs-toggle="modal"
                          data-bs-target="#cartModal"
                        >
                          <i className={act.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* CART POPUP */}
      <div className="fp__cart_popup">
        <div className="modal fade" id="cartModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fal fa-times"></i>
                </button>
                <div className="fp__cart_popup_img">
                  <img
                    src="http://localhost:5000/images/menu1.png"
                    alt="menu"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="fp__cart_popup_text">
                  <a href="#" className="title">Maxican Pizza Test Better</a>
                  <p className="rating">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i>
                    <i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                    <i className="far fa-star"></i><span>(201)</span>
                  </p>
                  <h4 className="price">$320.00 <del>$350.00</del></h4>
                  {/* rest of popup… */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
