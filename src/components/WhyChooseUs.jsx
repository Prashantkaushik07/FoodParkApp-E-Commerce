// src/components/WhyChooseUs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WhyChooseUs() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/features')
      .then(({ data }) => {
        if (data.features && data.features.length > 0) {
          setConfig(data.features[0]); // use the first document
        } else {
          setError('No feature config found');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading features:', err);
        setError('Could not load features');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div className="text-danger">{error}</div>;
  if (!config) return null;

  const { small, title, subTitle, cards } = config;

  return (
    <section className="fp__why_choose mt_100 xs_mt_70">
      <div className="container">
        {/* Heading */}
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_25">
              <h4>{small}</h4>
              <h2>{title}</h2>
              <span>
                <img
                  src="images/heading_shapes.png"
                  alt="shapes"
                  className="img-fluid w-100"
                />
              </span>
              <p>{subTitle}</p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="row">
          {cards.map((item, idx) => (
            <div className="col-xl-4 col-md-6 col-lg-4" key={idx}>
              <div className="fp__choose_single">
                <div className={`icon icon_${idx + 1}`}>
                  <i className={item.icon} />
                </div>
                <div className="text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
