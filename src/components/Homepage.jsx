<>
  {/*=============================
  TOPBAR START
    ==============================*/}
  <section className="fp__topbar">
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-md-8">
          <ul className="fp__topbar_info d-flex flex-wrap">
            <li>
              <a href="mailto:example@gmail.com">
                <i className="fas fa-envelope" /> Unifood@gmail.com
              </a>
            </li>
            <li>
              <a href="callto:123456789">
                <i className="fas fa-phone-alt" /> +96487452145214
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xl-6 col-md-4 d-none d-md-block">
          <ul className="topbar_icon d-flex flex-wrap">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>{" "}
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>{" "}
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in" />
              </a>{" "}
            </li>
            <li>
              <a href="#">
                <i className="fab fa-behance" />
              </a>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  TOPBAR END
    ==============================*/}
  {/*=============================
  MENU START
    ==============================*/}
  <nav className="navbar navbar-expand-lg main_menu">
    <div className="container">
      <a className="navbar-brand" href="index.html">
        <img src="images/logo.png" alt="FoodPark" className="img-fluid" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="far fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav m-auto">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              href="index.html"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="about.html">
              about
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="menu.html">
              menu
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="chefs.html">
              chefs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              pages <i className="far fa-angle-down" />
            </a>
            <ul className="droap_menu">
              <li>
                <a href="menu_details.html">menu details</a>
              </li>
              <li>
                <a href="blog_details.html">blog details</a>
              </li>
              <li>
                <a href="cart_view.html">cart view</a>
              </li>
              <li>
                <a href="check_out.html">checkout</a>
              </li>
              <li>
                <a href="payment.html">payment</a>
              </li>
              <li>
                <a href="testimonial.html">testimonial</a>
              </li>
              <li>
                <a href="search_menu.html">search result</a>
              </li>
              <li>
                <a href="404.html">404/Error</a>
              </li>
              <li>
                <a href="faq.html">FAQs</a>
              </li>
              <li>
                <a href="sign_in.html">sign in</a>
              </li>
              <li>
                <a href="sign_up.html">sign up</a>
              </li>
              <li>
                <a href="forgot_password.html">forgot password</a>
              </li>
              <li>
                <a href="privacy_policy.html">privacy policy</a>
              </li>
              <li>
                <a href="terms_condition.html">terms and condition</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="blogs.html">
              blog
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contact.html">
              contact
            </a>
          </li>
        </ul>
        <ul className="menu_icon d-flex flex-wrap">
          <li>
            <a href="#" className="menu_search">
              <i className="far fa-search" />
            </a>
            <div className="fp__search_form">
              <form>
                <span className="close_search">
                  <i className="far fa-times" />
                </span>
                <input type="text" placeholder="Search . . ." />
                <button type="submit">search</button>
              </form>
            </div>
          </li>
          <li>
            <a className="cart_icon">
              <i className="fas fa-shopping-basket" /> <span>5</span>
            </a>
          </li>
          <li>
            <a href="dashboard.html">
              <i className="fas fa-user" />
            </a>
          </li>
          <li>
            <a
              className="common_btn"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              reservation
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div className="fp__menu_cart_area">
    <div className="fp__menu_cart_boody">
      <div className="fp__menu_cart_header">
        <h5>total item (05)</h5>
        <span className="close_cart">
          <i className="fal fa-times" />
        </span>
      </div>
      <ul>
        <li>
          <div className="menu_cart_img">
            <img
              src="images/menu8.png"
              alt="menu"
              className="img-fluid w-100"
            />
          </div>
          <div className="menu_cart_text">
            <a className="title" href="#">
              Hyderabadi Biryani{" "}
            </a>
            <p className="size">small</p>
            <span className="extra">coca-cola</span>
            <span className="extra">7up</span>
            <p className="price">
              $99.00 <del>$110.00</del>
            </p>
          </div>
          <span className="del_icon">
            <i className="fal fa-times" />
          </span>
        </li>
        <li>
          <div className="menu_cart_img">
            <img
              src="images/menu4.png"
              alt="menu"
              className="img-fluid w-100"
            />
          </div>
          <div className="menu_cart_text">
            <a className="title" href="#">
              Chicken Masalas
            </a>
            <p className="size">medium</p>
            <span className="extra">7up</span>
            <p className="price">$70.00</p>
          </div>
          <span className="del_icon">
            <i className="fal fa-times" />
          </span>
        </li>
        <li>
          <div className="menu_cart_img">
            <img
              src="images/menu5.png"
              alt="menu"
              className="img-fluid w-100"
            />
          </div>
          <div className="menu_cart_text">
            <a className="title" href="#">
              Competently Supply Customized Initiatives
            </a>
            <p className="size">large</p>
            <span className="extra">coca-cola</span>
            <span className="extra">7up</span>
            <p className="price">
              $120.00 <del>$150.00</del>
            </p>
          </div>
          <span className="del_icon">
            <i className="fal fa-times" />
          </span>
        </li>
        <li>
          <div className="menu_cart_img">
            <img
              src="images/menu6.png"
              alt="menu"
              className="img-fluid w-100"
            />
          </div>
          <div className="menu_cart_text">
            <a className="title" href="#">
              Hyderabadi Biryani
            </a>
            <p className="size">small</p>
            <span className="extra">7up</span>
            <p className="price">$59.00</p>
          </div>
          <span className="del_icon">
            <i className="fal fa-times" />
          </span>
        </li>
        <li>
          <div className="menu_cart_img">
            <img
              src="images/menu1.png"
              alt="menu"
              className="img-fluid w-100"
            />
          </div>
          <div className="menu_cart_text">
            <a className="title" href="#">
              Competently Supply
            </a>
            <p className="size">medium</p>
            <span className="extra">coca-cola</span>
            <span className="extra">7up</span>
            <p className="price">
              $99.00 <del>$110.00</del>
            </p>
          </div>
          <span className="del_icon">
            <i className="fal fa-times" />
          </span>
        </li>
      </ul>
      <p className="subtotal">
        sub total <span>$1220.00</span>
      </p>
      <a className="cart_view" href="cart_view.html">
        {" "}
        view cart
      </a>
      <a className="checkout" href="check_out.html">
        checkout
      </a>
    </div>
  </div>
  <div className="fp__reservation">
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Book a Table
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form className="fp__reservation_form">
              <input
                className="reservation_input"
                type="text"
                placeholder="Name"
              />
              <input
                className="reservation_input"
                type="text"
                placeholder="Phone"
              />
              <input className="reservation_input" type="date" />
              <select className="reservation_input" id="select_js">
                <option value="">select time</option>
                <option value="">08.00 am to 09.00 am</option>
                <option value="">10.00 am to 11.00 am</option>
                <option value="">12.00 pm to 01.00 pm</option>
                <option value="">02.00 pm to 03.00 pm</option>
                <option value="">04.00 pm to 05.00 pm</option>
              </select>
              <select className="reservation_input" id="select_js2">
                <option value="">select person</option>
                <option value="">1 person</option>
                <option value="">2 person</option>
                <option value="">3 person</option>
                <option value="">4 person</option>
                <option value="">5 person</option>
              </select>
              <button type="submit">book table</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*=============================
  MENU END
    ==============================*/}
  {/*=============================
  BANNER START
    ==============================*/}
  <section
    className="fp__banner"
    style={{ background: "url(images/banner_bg.jpg)" }}
  >
    <div className="fp__banner_overlay">
      <div className="row banner_slider">
        <div className="col-12">
          <div className="fp__banner_slider">
            <div className=" container">
              <div className="row">
                <div className="col-xl-5 col-md-5 col-lg-5">
                  <div
                    className="fp__banner_img wow fadeInLeft"
                    data-wow-duration="1s"
                  >
                    <div className="img">
                      <img
                        src="images/slider_img_1.png"
                        alt="food item"
                        className="img-fluid w-100"
                      />
                      <span> 35% off </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-md-7 col-lg-6">
                  <div
                    className="fp__banner_text wow fadeInRight"
                    data-wow-duration="1s"
                  >
                    <h1>Different spice for a Different taste</h1>
                    <h3>Fast Food &amp; Restaurants</h3>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ipsum fugit minima et debitis ut distinctio optio qui
                      voluptate natus.
                    </p>
                    <ul className="d-flex flex-wrap">
                      <li>
                        <a className="common_btn" href="#">
                          shop now
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="fp__banner_slider">
            <div className=" container">
              <div className="row">
                <div className="col-xl-5 col-md-5 col-lg-5">
                  <div
                    className="fp__banner_img wow fadeInLeft"
                    data-wow-duration="1s"
                  >
                    <div className="img">
                      <img
                        src="images/slider_img_2.png"
                        alt="food item"
                        className="img-fluid w-100"
                      />
                      <span
                        style={{ background: "url(images/offer_shapes.png)" }}
                      >
                        70% off
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-md-7 col-lg-6">
                  <div
                    className="fp__banner_text wow fadeInRight"
                    data-wow-duration="1s"
                  >
                    <h1>Eat healthy. Stay healthy.</h1>
                    <h3>Fast Food &amp; Restaurants</h3>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ipsum fugit minima et debitis ut distinctio optio qui
                      voluptate natus.
                    </p>
                    <ul className="d-flex flex-wrap">
                      <li>
                        <a className="common_btn" href="#">
                          shop now
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="fp__banner_slider">
            <div className=" container">
              <div className="row">
                <div className="col-xl-5 col-md-5 col-lg-5">
                  <div
                    className="fp__banner_img wow fadeInLeft"
                    data-wow-duration="1s"
                  >
                    <div className="img">
                      <img
                        src="images/slider_img_3.png"
                        alt="food item"
                        className="img-fluid w-100"
                      />
                      <span
                        style={{ background: "url(images/offer_shapes.png)" }}
                      >
                        50% off
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-md-7 col-lg-6">
                  <div
                    className="fp__banner_text wow fadeInRight"
                    data-wow-duration="1s"
                  >
                    <h1>Great food. Tastes good.</h1>
                    <h3>Fast Food &amp; Restaurants</h3>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ipsum fugit minima et debitis ut distinctio optio qui
                      voluptate natus.
                    </p>
                    <ul className="d-flex flex-wrap">
                      <li>
                        <a className="common_btn" href="#">
                          shop now
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  BANNER END
    ==============================*/}
  {/*=============================
  WHY CHOOSE START
    ==============================*/}
  <section className="fp__why_choose mt_100 xs_mt_70">
    <div className="container">
      <div className="row wow fadeInUp" data-wow-duration="1s">
        <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
          <div className="fp__section_heading mb_25">
            <h4>why choose us</h4>
            <h2>why choose us</h2>
            <span>
              <img
                src="images/heading_shapes.png"
                alt="shapes"
                className="img-fluid w-100"
              />
            </span>
            <p>
              Objectively pontificate quality models before intuitive
              information. Dramatically recaptiualize multifunctional materials.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 col-md-6 col-lg-4">
          <div className="fp__choose_single">
            <div className="icon icon_1">
              <i className="fas fa-percent" />
            </div>
            <div className="text">
              <h3>discount voucher</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                debitis expedita .
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-lg-4">
          <div className="fp__choose_single">
            <div className="icon icon_2">
              <i className="fas fa-burger-soda" />
            </div>
            <div className="text">
              <h3>fresh healthy foods</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                debitis expedita .
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-lg-4">
          <div className="fp__choose_single">
            <div className="icon icon_3">
              <i className="far fa-hat-chef" />
            </div>
            <div className="text">
              <h3>fast serve on table</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                debitis expedita .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  WHY CHOOSE END
    ==============================*/}
  {/*=============================
  OFFER ITEM START
    ==============================*/}
  <section className="fp__offer_item mt_100 xs_mt_70 pt_95 xs_pt_65 pb_150 xs_pb_120">
    <div className="container">
      <div className="row wow fadeInUp" data-wow-duration="1s">
        <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
          <div className="fp__section_heading mb_50">
            <h4>daily offer</h4>
            <h2>up to 75% off for this day</h2>
            <span>
              <img
                src="images/heading_shapes.png"
                alt="shapes"
                className="img-fluid w-100"
              />
            </span>
            <p>
              Objectively pontificate quality models before intuitive
              information. Dramatically recaptiualize multifunctional materials.
            </p>
          </div>
        </div>
      </div>
      <div
        className="row offer_item_slider wow fadeInUp"
        data-wow-duration="1s"
      >
        <div className="col-xl-4">
          <div className="fp__offer_item_single">
            <div className="img">
              <img
                src="images/slider_img_1.png"
                alt="offer"
                className="img-fluid w-100"
              />
            </div>
            <div className="text">
              <span>30% off</span>
              <a className="title" href="menu_details.html">
                Dal Makhani Paneer
              </a>
              <p>Lightly smoked and minced pork tenderloin topped</p>
              <ul className="d-flex flex-wrap">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="fp__offer_item_single">
            <div className="img">
              <img
                src="images/slider_img_2.png"
                alt="offer"
                className="img-fluid w-100"
              />
            </div>
            <div className="text">
              <span>40% off</span>
              <a className="title" href="menu_details.html">
                Hyderabadi biryani
              </a>
              <p>Lightly smoked and minced pork tenderloin topped</p>
              <ul className="d-flex flex-wrap">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="fp__offer_item_single">
            <div className="img">
              <img
                src="images/slider_img_3.png"
                alt="offer"
                className="img-fluid w-100"
              />
            </div>
            <div className="text">
              <span>55% off</span>
              <a className="title" href="menu_details.html">
                Beef Masala Salad
              </a>
              <p>Lightly smoked and minced pork tenderloin topped</p>
              <ul className="d-flex flex-wrap">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="fp__offer_item_single">
            <div className="img">
              <img
                src="images/slider_img_2.png"
                alt="offer"
                className="img-fluid w-100"
              />
            </div>
            <div className="text">
              <span>45% off</span>
              <a className="title" href="menu_details.html">
                Indian cuisine Pakora
              </a>
              <p>Lightly smoked and minced pork tenderloin topped</p>
              <ul className="d-flex flex-wrap">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* CART POPUT START */}
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
              <i className="fal fa-times" />
            </button>
            <div className="fp__cart_popup_img">
              <img
                src="images/menu1.png"
                alt="menu"
                className="img-fluid w-100"
              />
            </div>
            <div className="fp__cart_popup_text">
              <a href="#" className="title">
                Maxican Pizza Test Better
              </a>
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>(201)</span>
              </p>
              <h4 className="price">
                $320.00 <del>$350.00</del>{" "}
              </h4>
              <div className="details_size">
                <h5>select size</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="large"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="large">
                    large <span>+ $350</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="medium"
                  />
                  <label className="form-check-label" htmlFor="medium">
                    medium <span>+ $250</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="small"
                  />
                  <label className="form-check-label" htmlFor="small">
                    small <span>+ $150</span>
                  </label>
                </div>
              </div>
              <div className="details_extra_item">
                <h5>
                  select option <span>(optional)</span>
                </h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="coca-cola"
                  />
                  <label className="form-check-label" htmlFor="coca-cola">
                    coca-cola <span>+ $10</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="7up"
                  />
                  <label className="form-check-label" htmlFor="7up">
                    7up <span>+ $15</span>
                  </label>
                </div>
              </div>
              <div className="details_quentity">
                <h5>select quentity</h5>
                <div className="quentity_btn_area d-flex flex-wrapa align-items-center">
                  <div className="quentity_btn">
                    <button className="btn btn-danger">
                      <i className="fal fa-minus" />
                    </button>
                    <input type="text" placeholder={1} />
                    <button className="btn btn-success">
                      <i className="fal fa-plus" />
                    </button>
                  </div>
                  <h3>$320.00</h3>
                </div>
              </div>
              <ul className="details_button_area d-flex flex-wrap">
                <li>
                  <a className="common_btn" href="#">
                    add to cart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* CART POPUT END */}
  {/*=============================
  OFFER ITEM END
    ==============================*/}
  {/*=============================
  MENU ITEM START
    ==============================*/}
  <section className="fp__menu mt_95 xs_mt_65">
    <div className="container">
      <div className="row wow fadeInUp" data-wow-duration="1s">
        <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
          <div className="fp__section_heading mb_45">
            <h4>food Menu</h4>
            <h2>Our Popular Delicious Foods</h2>
            <span>
              <img
                src="images/heading_shapes.png"
                alt="shapes"
                className="img-fluid w-100"
              />
            </span>
            <p>
              Objectively pontificate quality models before intuitive
              information. Dramatically recaptiualize multifunctional materials.
            </p>
          </div>
        </div>
      </div>
      <div className="row wow fadeInUp" data-wow-duration="1s">
        <div className="col-12">
          <div className="menu_filter d-flex flex-wrap justify-content-center">
            <button className=" active" data-filter="*">
              all menu
            </button>
            <button data-filter=".burger">burger</button>
            <button data-filter=".chicken">chicken</button>
            <button data-filter=".pizza">pizza</button>
            <button data-filter=".dresserts">dresserts</button>
          </div>
        </div>
      </div>
      <div className="row grid">
        <div
          className="col-xl-3 col-sm-6 col-lg-4 burger pizza wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_1.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                Biryani
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>10</span>
              </p>
              <a className="title" href="menu_details.html">
                Hyderabadi biryani
              </a>
              <h5 className="price">$70.00</h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  chicken dresserts wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_2.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                chicken
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>145</span>
              </p>
              <a className="title" href="menu_details.html">
                chicken Masala
              </a>
              <h5 className="price">
                $80.00 <del>90.00</del>
              </h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  chicken dresserts wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_3.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                grill
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>54</span>
              </p>
              <a className="title" href="menu_details.html">
                daria shevtsova
              </a>
              <h5 className="price">$99.00</h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  burger pizza wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_4.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                chicken
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>74</span>
              </p>
              <a className="title" href="menu_details.html">
                chicken Masala
              </a>
              <h5 className="price">
                $80.00 <del>90.00</del>
              </h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  chicken dresserts wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_5.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                chicken
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>120</span>
              </p>
              <a className="title" href="menu_details.html">
                chicken Masala
              </a>
              <h5 className="price">
                $80.00 <del>90.00</del>
              </h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  burger pizza wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_6.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                Biryani
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>514</span>
              </p>
              <a className="title" href="menu_details.html">
                Hyderabadi biryani
              </a>
              <h5 className="price">$70.00</h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  chicken dresserts wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_7.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                grill
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>25</span>
              </p>
              <a className="title" href="menu_details.html">
                daria shevtsova
              </a>
              <h5 className="price">$99.00</h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="col-xl-3 col-sm-6 col-lg-4  burger pizza wow fadeInUp"
          data-wow-duration="1s"
        >
          <div className="fp__menu_item">
            <div className="fp__menu_item_img">
              <img
                src="images/menu2_img_8.jpg"
                alt="menu"
                className="img-fluid w-100"
              />
              <a className="category" href="#">
                chicken
              </a>
            </div>
            <div className="fp__menu_item_text">
              <p className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
                <span>324</span>
              </p>
              <a className="title" href="menu_details.html">
                chicken Masala
              </a>
              <h5 className="price">
                $80.00 <del>90.00</del>
              </h5>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    <i className="fas fa-shopping-basket" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fal fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="far fa-eye" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  MENU ITEM END
    ==============================*/}
  {/*=============================
  ADD SLIDER START
    ==============================*/}
  <section className="fp__add_slider mt_100 xs_mt_70 pt_100 xs_pt_70 pb_100 xs_pb_70">
    <div className="container">
      <div className="row add_slider wow fadeInUp" data-wow-duration="1s">
        <div className="col-xl-4">
          <a
            href="#"
            className="fp__add_slider_single"
            style={{ background: "url(images/offer_slider_3.png)" }}
          >
            <div className="text">
              <h3>red chicken</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </a>
        </div>
        <div className="col-xl-4">
          <a
            href="#"
            className="fp__add_slider_single"
            style={{ background: "url(images/offer_slider_2.png)" }}
          >
            <div className="text">
              <h3>red chicken</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </a>
        </div>
        <div className="col-xl-4">
          <a
            href="#"
            className="fp__add_slider_single"
            style={{ background: "url(images/offer_slider_1.png)" }}
          >
            <div className="text">
              <h3>red chicken</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </a>
        </div>
        <div className="col-xl-4">
          <a
            href="#"
            className="fp__add_slider_single"
            style={{ background: "url(images/offer_slider_4.png)" }}
          >
            <div className="text">
              <h3>red chicken</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  ADD SLIDER END
    ==============================*/}
  {/*=============================
  TEAM START
    ==============================*/}
  <section className="fp__team pt_95 xs_pt_65 pb_50">
    <div className="container">
      <div className="row wow fadeInUp" data-wow-duration="1s">
        <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
          <div className="fp__section_heading mb_25">
            <h4>our team</h4>
            <h2>meet our expert chefs</h2>
            <span>
              <img
                src="images/heading_shapes.png"
                alt="shapes"
                className="img-fluid w-100"
              />
            </span>
            <p>
              Objectively pontificate quality models before intuitive
              information. Dramatically recaptiualize multifunctional materials.
            </p>
          </div>
        </div>
      </div>
      <div className="row team_slider">
        <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_team">
            <div className="fp__single_team_img">
              <img
                src="images/chef_1.jpg"
                alt="team"
                className="img-fluid w-100"
              />
            </div>
            <div className="fp__single_team_text">
              <h4>ismat joha</h4>
              <p>senior chef</p>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-behance" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_team">
            <div className="fp__single_team_img">
              <img
                src="images/chef_2.jpg"
                alt="team"
                className="img-fluid w-100"
              />
            </div>
            <div className="fp__single_team_text">
              <h4>arun chandra</h4>
              <p>senior chef</p>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-behance" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_team">
            <div className="fp__single_team_img">
              <img
                src="images/chef_3.jpg"
                alt="team"
                className="img-fluid w-100"
              />
            </div>
            <div className="fp__single_team_text">
              <h4>isita rahman</h4>
              <p>senior chef</p>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-behance" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_team">
            <div className="fp__single_team_img">
              <img
                src="images/chef_4.jpg"
                alt="team"
                className="img-fluid w-100"
              />
            </div>
            <div className="fp__single_team_text">
              <h4>khandakar rashed</h4>
              <p>senior chef</p>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-behance" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_team">
            <div className="fp__single_team_img">
              <img
                src="images/chef_5.jpg"
                alt="team"
                className="img-fluid w-100"
              />
            </div>
            <div className="fp__single_team_text">
              <h4>naurin nipu</h4>
              <p>senior chef</p>
              <ul className="d-flex flex-wrap justify-content-center">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-behance" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  TEAM END
    ==============================*/}
  {/*=============================
  DOWNLOAD APP START
    ==============================*/}
  <section className="fp__download mt_100 xs_mt_70">
    <div
      className="fp__download_bg"
      style={{ background: "url(images/download_bg.jpg)" }}
    >
      <div className="fp__download_overlay">
        <div className="container">
          <div className="row justify-content-between">
            <div
              className="col-xl-5 col-md-6 wow fadeInUp"
              data-wow-duration="1s"
            >
              <div className="fp__download_img">
                <img
                  src="images/download_img.png"
                  alt="download"
                  className="img-fluid w-100"
                />
              </div>
            </div>
            <div
              className="col-xl-6 col-md-6 wow fadeInUp"
              data-wow-duration="1s"
            >
              <div className="fp__download_text">
                <div className="fp__section_heading mb_25">
                  <h2>download our mobile apps</h2>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Cumque assumenda tenetur, provident earum consequatur, ut
                    voluptas laboriosam fuga error aut eaque architecto quo
                    pariatur. Vel dolore omnis quisquam. Lorem ipsum dolor, sit
                    amet consectetur adipisicing elit Cumque.
                  </p>
                </div>
                <ul className="d-flex flex-wrap">
                  <li>
                    <a href="#">
                      <i className="fab fa-google-play" />
                      <p>
                        {" "}
                        <span>download from</span> google play{" "}
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-apple" />
                      <p>
                        {" "}
                        <span>download from</span> apple store{" "}
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  DOWNLOAD APP END
    ==============================*/}
  {/*=============================
 TESTIMONIAL  START
    ==============================*/}
  <section className="fp__testimonial pt_95 xs_pt_66 mb_150 xs_mb_120">
    <div className="container">
      <div className="row wow fadeInUp" data-wow-duration="1s">
        <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
          <div className="fp__section_heading mb_40">
            <h4>testimonial</h4>
            <h2>our customar feedbacks</h2>
            <span>
              <img
                src="images/heading_shapes.png"
                alt="shapes"
                className="img-fluid w-100"
              />
            </span>
            <p>
              Objectively pontificate quality models before intuitive
              information. Dramatically recaptiualize multifunctional materials.
            </p>
          </div>
        </div>
      </div>
      <div className="row testi_slider">
        <div className="col-xl-4 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_testimonial">
            <div className="fp__testimonial_header d-flex flex-wrap align-items-center">
              <div className="img">
                <img
                  src="images/comment_img_1.png"
                  alt="clients"
                  className="img-fluid w-100"
                />
              </div>
              <div className="text">
                <h4>isita islam</h4>
                <p>nyc usa</p>
              </div>
            </div>
            <div className="fp__single_testimonial_body">
              <p className="feedback">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                accusamus praesentium quaerat nihil magnam a porro eaque numquam
              </p>
              <span className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_testimonial">
            <div className="fp__testimonial_header d-flex flex-wrap align-items-center">
              <div className="img">
                <img
                  src="images/comment_img_2.png"
                  alt="clients"
                  className="img-fluid w-100"
                />
              </div>
              <div className="text">
                <h4>sumon mahmud</h4>
                <p>nyc usa</p>
              </div>
            </div>
            <div className="fp__single_testimonial_body">
              <p className="feedback">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                accusamus praesentium quaerat nihil magnam a porro eaque numquam
              </p>
              <span className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_testimonial">
            <div className="fp__testimonial_header d-flex flex-wrap align-items-center">
              <div className="img">
                <img
                  src="images/client_img_1.jpg"
                  alt="clients"
                  className="img-fluid w-100"
                />
              </div>
              <div className="text">
                <h4>israt jahan</h4>
                <p>nyc usa</p>
              </div>
            </div>
            <div className="fp__single_testimonial_body">
              <p className="feedback">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                accusamus praesentium quaerat nihil magnam a porro eaque numquam
              </p>
              <span className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 wow fadeInUp" data-wow-duration="1s">
          <div className="fp__single_testimonial">
            <div className="fp__testimonial_header d-flex flex-wrap align-items-center">
              <div className="img">
                <img
                  src="images/client_img_3.jpg"
                  alt="clients"
                  className="img-fluid w-100"
                />
              </div>
              <div className="text">
                <h4>payel sarkar</h4>
                <p>nyc usa</p>
              </div>
            </div>
            <div className="fp__single_testimonial_body">
              <p className="feedback">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                accusamus praesentium quaerat nihil magnam a porro eaque numquam
              </p>
              <span className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <i className="far fa-star" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  TESTIMONIAL END
    ==============================*/}
  {/*=============================
  COUNTER START
    ==============================*/}
  <section
    className="fp__counter"
    style={{ background: "url(images/counter_bg2.jpg)" }}
  >
    <div className="fp__counter_overlay pt_100 xs_pt_70 pb_100 xs_pb_70">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_counter">
              <i className="fas fa-burger-soda" />
              <div className="text">
                <h2 className="counter">85,000</h2>
                <p>customer serve</p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_counter">
              <i className="fal fa-hat-chef" />
              <div className="text">
                <h2 className="counter">120</h2>
                <p>experience chef</p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_counter">
              <i className="far fa-handshake" />
              <div className="text">
                <h2 className="counter">72,000</h2>
                <p>happy customer</p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_counter">
              <i className="far fa-trophy" />
              <div className="text">
                <h2 className="counter">30</h2>
                <p>winning award</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  COUNTER END
    ==============================*/}
  {/*=============================
  BLOG 2 START
    ==============================*/}
  <section className="fp__blog fp__blog2">
    <div className="fp__blog_overlay pt_95 pt_xs_60 pb_100 xs_pb_70">
      <div className="container">
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
            <div className="fp__section_heading mb_25">
              <h4>news &amp; blogs</h4>
              <h2>our latest foods blog</h2>
              <span>
                <img
                  src="images/heading_shapes.png"
                  alt="shapes"
                  className="img-fluid w-100"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-sm-6 col-lg-4 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_blog">
              <a href="#" className="fp__single_blog_img">
                <img
                  src="images/menu2_img_1.jpg"
                  alt="blog"
                  className="img-fluid w-100"
                />
              </a>
              <div className="fp__single_blog_text">
                <a className="category" href="#">
                  chicken
                </a>
                <ul className="d-flex flex-wrap mt_15">
                  <li>
                    <i className="fas fa-user" />
                    admin
                  </li>
                  <li>
                    <i className="fas fa-calendar-alt" /> 25 oct 2022
                  </li>
                  <li>
                    <i className="fas fa-comments" /> 25 comment
                  </li>
                </ul>
                <a className="title" href="blog_details.html">
                  Competently supply customized initiatives
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-sm-6 col-lg-4 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_blog">
              <a href="#" className="fp__single_blog_img">
                <img
                  src="images/menu2_img_2.jpg"
                  alt="blog"
                  className="img-fluid w-100"
                />
              </a>
              <div className="fp__single_blog_text">
                <a className="category" href="#">
                  kabab
                </a>
                <ul className="d-flex flex-wrap mt_15">
                  <li>
                    <i className="fas fa-user" />
                    admin
                  </li>
                  <li>
                    <i className="fas fa-calendar-alt" /> 27 oct 2022
                  </li>
                  <li>
                    <i className="fas fa-comments" /> 41 comment
                  </li>
                </ul>
                <a className="title" href="blog_details.html">
                  Unicode UTF8 Character Sets They Sltimate Guide Systems
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-sm-6 col-lg-4 wow fadeInUp"
            data-wow-duration="1s"
          >
            <div className="fp__single_blog">
              <a href="#" className="fp__single_blog_img">
                <img
                  src="images/menu2_img_3.jpg"
                  alt="blog"
                  className="img-fluid w-100"
                />
              </a>
              <div className="fp__single_blog_text">
                <a className="category" href="#">
                  grill
                </a>
                <ul className="d-flex flex-wrap mt_15">
                  <li>
                    <i className="fas fa-user" />
                    admin
                  </li>
                  <li>
                    <i className="fas fa-calendar-alt" /> 27 oct 2022
                  </li>
                  <li>
                    <i className="fas fa-comments" /> 32 comment
                  </li>
                </ul>
                <a className="title" href="blog_details.html">
                  Quality Foods Requirments For Every Human Body’s
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*=============================
  BLOG 2 END
    ==============================*/}
  {/*=============================
  FOOTER START
    ==============================*/}
  <footer>
    <div className="footer_overlay pt_100 xs_pt_70 pb_100 xs_pb_70">
      <div className="container wow fadeInUp" data-wow-duration="1s">
        <div className="row justify-content-between">
          <div className="col-lg-4 col-sm-8 col-md-6">
            <div className="fp__footer_content">
              <a className="footer_logo" href="index.html">
                <img
                  src="images/footer_logo.png"
                  alt="FoodPark"
                  className="img-fluid w-100"
                />
              </a>
              <span>
                There are many variations of Lorem Ipsum available, but the
                majority have suffered.
              </span>
              <p className="info">
                <i className="far fa-map-marker-alt" /> 7232 Broadway Suite 308,
                Jackson Heights, 11372, NY, United States
              </p>
              <a className="info" href="callto:1234567890123">
                <i className="fas fa-phone-alt" />
                +1347-430-9510
              </a>
              <a className="info" href="mailto:websolutionus1@gmail.com">
                <i className="fas fa-envelope" />
                websolutionus1@gmail.com
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-md-6">
            <div className="fp__footer_content">
              <h3>Short Link</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Our Service</a>
                </li>
                <li>
                  <a href="#">gallery</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-sm-4 col-md-6 order-sm-4 order-lg-3">
            <div className="fp__footer_content">
              <h3>Help Link</h3>
              <ul>
                <li>
                  <a href="#">Terms And Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Refund Policy</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-8 col-md-6 order-lg-4">
            <div className="fp__footer_content">
              <h3>subscribe</h3>
              <form>
                <input type="text" placeholder="Subscribe" />
                <button>Subscribe</button>
              </form>
              <div className="fp__footer_social_link">
                <h5>follow us:</h5>
                <ul className="d-flex flex-wrap">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-behance" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="fp__footer_bottom d-flex flex-wrap">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="fp__footer_bottom_text d-flex flex-wrap justify-content-between">
              <p>
                Copyright 2022 <b>FoodPark</b> All Rights Reserved.
              </p>
              <ul className="d-flex flex-wrap">
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">payment</a>
                </li>
                <li>
                  <a href="#">settings</a>
                </li>
                <li>
                  <a href="#">privacy policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/*=============================
  FOOTER END
    ==============================*/}
  {/*=============================
  SCROLL BUTTON START
    ==============================*/}
  <div className="fp__scroll_btn">go to top</div>
  {/*=============================
  SCROLL BUTTON END 
    ==============================*/}
  {/*jquery library js*/}
  {/*bootstrap js*/}
  {/*font-awesome js*/}
  {/* slick slider */}
  {/* isotop js */}
  {/* simplyCountdownjs */}
  {/* counter up js */}
  {/* nice select js */}
  {/* venobox js */}
  {/* sticky sidebar js */}
  {/* wow js */}
  {/* ex zoom js */}
  {/*main/custom js*/}
</>
