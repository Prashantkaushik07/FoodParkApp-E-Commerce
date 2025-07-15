// src/components/CounterSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CounterSection() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    axios.get('/api/counter-settings/public')
      .then(res => setCounters(res.data.settings))
      .catch(err => console.error(err));
  }, []);

  if (!counters.length) return null;

  return (
    <section
      className="fp__counter"
      style={{ background: "url(images/counter_bg2.jpg)" }}
    >
      <div className="fp__counter_overlay pt_100 xs_pt_70 pb_100 xs_pb_70">
        <div className="container">
          <div className="row">
            {counters.map((count, idx) => (
              <div
                className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
                data-wow-duration="1s"
                key={idx}
              >
                <div className="fp__single_counter">
                  <i className={count.icon} />
                  <div className="text">
                    <h2 className="counter">{count.value}</h2>
                    <p>{count.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
