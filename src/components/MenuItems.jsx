import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuItems() {
  const [section, setSection] = useState({
    subtitle: '',
    title: '',
    description: ''
  });
  const [menus, setMenus] = useState([]);
  const [activeFilter, setActiveFilter] = useState('*'); // '*' means show all

  useEffect(() => {
    axios.get('/api/menu-section')
      .then(res => setSection(res.data.section))
      .catch(console.error);

    axios.get('/api/menu-items')
      .then(res => setMenus(res.data.items))
      .catch(console.error);
  }, []);

  // Get unique categories for filter buttons
  const categories = Array.from(new Set(menus.map(m => m.category.toLowerCase())));

  return (
    <section className="fp__menu mt_95 xs_mt_65">
      <div className="container">
        {/* Section Heading */}
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_45">
              <h4>{section.subtitle || 'Food Menu'}</h4>
              <h2>{section.title || 'Our Popular Delicious Foods'}</h2>
              <span>
                <img
                  src="images/heading_shapes.png"
                  alt="shapes"
                  className="img-fluid w-100"
                />
              </span>
              <p>{section.description || 'Dramatically recaptiualize multifunctional materials.'}</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-12">
            <div className="menu_filter d-flex flex-wrap justify-content-center">
              <button
                className={activeFilter === '*' ? 'active' : ''}
                onClick={() => setActiveFilter('*')}
              >
                All Menu
              </button>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={activeFilter === cat ? 'active' : ''}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="row grid">
          {menus.filter(item =>
            activeFilter === '*' || item.category.toLowerCase() === activeFilter
          ).map((item, idx) => (
            <div
              key={item._id || idx}
              className={`col-xl-3 col-sm-6 col-lg-4 ${item.category.toLowerCase()} wow fadeInUp`}
              data-wow-duration="1s"
            >
              <div className="fp__menu_item">
                <div className="fp__menu_item_img position-relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid w-100"
                  />
                  <a className="category" href="#">
                    {item.badgeLabel || item.category}
                  </a>
                </div>
                <div className="fp__menu_item_text">
                  <p className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <i className="far fa-star"></i>
                    <span>{Math.floor(Math.random() * 500) + 10}</span>
                  </p>
                  <a className="title" href="menu_details.html">{item.name}</a>
                  <h5 className="price">
                    ${item.price.toFixed(2)}
                  </h5>
                  <ul className="d-flex flex-wrap justify-content-center">
                    <li>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                        <i className="fas fa-shopping-basket"></i>
                      </a>
                    </li>
                    <li><a href="#"><i className="fal fa-heart"></i></a></li>
                    <li><a href="#"><i className="far fa-eye"></i></a></li>
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
