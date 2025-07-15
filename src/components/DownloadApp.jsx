import React from 'react';

export default function DownloadApp() {
  return (
    <section className="fp__download mt_100 xs_mt_70">
      <div
        className="fp__download_bg"
        style={{ background: "url(images/download_bg.jpg)" }}
      >
        <div className="fp__download_overlay">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-5 col-md-6 wow fadeInUp" data-wow-duration="1s">
                <div className="fp__download_img">
                  <img
                    src="images/download_img.png"
                    alt="download"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-md-6 wow fadeInUp" data-wow-duration="1s">
                <div className="fp__download_text">
                  <div className="fp__section_heading mb_25">
                    <h2>Download Our Mobile Apps</h2>
                    <p>Stay connected with FoodPark anytime, anywhere.</p>
                  </div>
                  <ul className="d-flex flex-wrap">
                    <li>
                      <a href="#">
                        <i className="fab fa-google-play" />
                        <p><span>Download from</span> Google Play</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-apple" />
                        <p><span>Download from</span> App Store</p>
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
  );
}
