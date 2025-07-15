// src/components/TeamSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeamSection() {
  const [section, setSection]   = useState(null);
  const [chefs, setChefs]       = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    // Load both the section copy and the chef cards in parallel
    Promise.all([
      axios.get('/api/team-section'),
      axios.get('/api/chefs')
    ])
      .then(([secRes, chefRes]) => {
        setSection(secRes.data);
        setChefs(chefRes.data);
      })
      .catch(err => console.error('Error loading team data:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="fp__team pt_95 xs_pt_65 pb_50 text-center">
        <p>Loading…</p>
      </section>
    );
  }

  if (!section) {
    return (
      <section className="fp__team pt_95 xs_pt_65 pb_50 text-center">
        <p>Unable to load team section.</p>
      </section>
    );
  }

  return (
    <section className="fp__team pt_95 xs_pt_65 pb_50">
      <div className="container">

        {/* Section Heading */}
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_25">
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

        {/* Chef Cards */}
        <div className="row team_slider">
          {chefs.map((chef) => (
            <div
              key={chef._id}
              className="col-xl-3 wow fadeInUp"
              data-wow-duration="1s"
            >
              <div className="fp__single_team">
                <div className="fp__single_team_img">
                  <img
                    src={chef.imageUrl}
                    alt={chef.name}
                    className="img-fluid w-100"
                  />
                </div>
                <div className="fp__single_team_text">
                  <h4>{chef.name}</h4>
                  <p>{chef.position}</p>
                  <ul className="d-flex flex-wrap justify-content-center">
                    {chef.socials && chef.socials.length > 0
                      ? chef.socials.map((s) => (
                          <li key={s.platform}>
                            <a href={s.url} target="_blank" rel="noreferrer">
                              <i className={`fab fa-${s.platform.toLowerCase()}`} />
                            </a>
                          </li>
                        ))
                      : (
                        <>
                          <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                          <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                          <li><a href="#"><i className="fab fa-twitter" /></a></li>
                          <li><a href="#"><i className="fab fa-behance" /></a></li>
                        </>
                      )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
