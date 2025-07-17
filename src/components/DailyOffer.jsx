import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function DailyOffer() {
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/daily-offer')
      .then(({ data }) => setDaily(data.daily))
      .catch(err => console.error('Load daily-offer failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading offers…</div>;
  if (!daily) return <div className="text-center py-5">No offers available</div>;

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
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
    appendDots: dots => <ul className="slick-dots">{dots}</ul>,
    customPaging: () => (
      <button style={{
        width: 12, height: 12, border: 'none',
        borderRadius: '50%',
        backgroundColor: '#f16821'
      }} />
    )
  };

  return (
    <>
      {/*=============================
    OFFER ITEM START
==============================*/}
<section className="fp__offer_item mt_100 xs_mt_70 pt_95 xs_pt_65 pb_150 xs_pb_120">
  <div className="container">
    {/* Section Heading */}
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

    {/* Offer Items */}
    <div className="row offer_item_slider wow fadeInUp" data-wow-duration="1s">
      <Slider {...settings}>
        {offers.map((offer, offerIdx) => (
          <div key={offerIdx}>
            <div className="fp__offer_item_single">
              {/* Offer Image */}
              <div className="img">
                <img
                  src={`http://localhost:5000${offer.img}`}
                  alt={offer.title?.trim() || 'Offer Image'}
                  className="img-fluid w-100"
                />
              </div>

              {/* Offer Text */}
              <div className="text">
                <span>{offer.discount?.trim() || 'Special Offer'}</span>
                <a className="title" href="/menu-details">
                  {offer.title?.trim() || 'Food Item'}
                </a>
                <p>{offer.desc?.trim() || 'Delicious food item available today only.'}</p>

                {/* Offer Actions */}
                <ul className="d-flex flex-wrap">
                  {actions.length > 0 ? actions.map((act, idx) => (
                    <li key={idx}>
                      <a
                        href={act.url?.trim() || '#'}
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                      >
                        <i className={act.icon?.trim() || 'fas fa-shopping-basket'}></i>
                      </a>
                    </li>
                  )) : (
                    <li>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                        <i className="fas fa-shopping-basket"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
</section>

      <div className="fp__cart_popup">
        <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <i className="fal fa-times"></i>
                </button>
                <div className="fp__cart_popup_img">
                  <img src="http://localhost:5000/images/menu1.png" alt="menu" className="img-fluid w-100" />
                </div>
                <div className="fp__cart_popup_text">
                  <a href="#" className="title">Sample Item Name</a>
                  <p className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <i className="far fa-star"></i>
                    <span>(201)</span>
                  </p>
                  <h4 className="price">$320.00 <del>$350.00</del></h4>
                  <ul className="details_button_area d-flex flex-wrap">
                    <li><a className="common_btn" href="#">add to cart</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=============================
          CART POPUP END
      ==============================*/}
    </>
  );
}
