import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuItems() {
  const [section, setSection] = useState({
    subtitle: '',
    title: '',
    description: ''
  });
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // fetch section text
    axios.get('/api/menu-section')
      .then(res => setSection(res.data.section))
      .catch(console.error);

    // fetch cards
    axios.get('/api/menu-items')
      .then(res => setMenus(res.data.items))
      .catch(console.error);
  }, []);

  return (
    <section className="fp__menu mt_95 xs_mt_65">
      <div className="container">
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_45">
              <h4>{section.subtitle}</h4>
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
        <div className="row grid">
          {menus.map((item, idx) => (
            <div
              className="col-xl-3 col-sm-6 col-lg-4 wow fadeInUp"
              key={item._id || idx}
              data-wow-duration="1s"
            >
              <div className="fp__menu_item">
                <div className="fp__menu_item_img">
                  <img src={item.image} alt={item.title} className="img-fluid w-100" />
                  <a className="category" href="#">{item.category}</a>
                </div>
                <div className="fp__menu_item_text">
                  <a className="title" href="menu_details.html">{item.name}</a>
                  <h5 className="price">${item.price.toFixed(2)}</h5>
                  <ul className="d-flex flex-wrap justify-content-center">
                    <li>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                        <i className="fas fa-shopping-basket" />
                      </a>
                    </li>
                    <li><a href="#"><i className="fal fa-heart" /></a></li>
                    <li><a href="#"><i className="far fa-eye" /></a></li>
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
