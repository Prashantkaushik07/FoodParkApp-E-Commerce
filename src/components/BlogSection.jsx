import React from 'react';

export default function BlogSection() {
  const blogs = [
    { img: "images/menu2_img_1.jpg", title: "Competently Supply Customized Initiatives", category: "Chicken", date: "25 Oct 2022", comments: 25 },
    { img: "images/menu2_img_2.jpg", title: "Unicode UTF8 Character Sets Guide", category: "Kabab", date: "27 Oct 2022", comments: 41 },
    { img: "images/menu2_img_3.jpg", title: "Quality Foods Requirements For All", category: "Grill", date: "27 Oct 2022", comments: 32 }
  ];

  return (
    <section className="fp__blog fp__blog2">
      <div className="fp__blog_overlay pt_95 pt_xs_60 pb_100 xs_pb_70">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-duration="1s">
            <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
              <div className="fp__section_heading mb_25">
                <h4>news & blogs</h4>
                <h2>Our Latest Food Blogs</h2>
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
            {blogs.map((blog, index) => (
              <div className="col-xl-4 col-sm-6 col-lg-4 wow fadeInUp" data-wow-duration="1s" key={index}>
                <div className="fp__single_blog">
                  <a href="#" className="fp__single_blog_img">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="img-fluid w-100"
                    />
                  </a>
                  <div className="fp__single_blog_text">
                    <a className="category" href="#">{blog.category}</a>
                    <ul className="d-flex flex-wrap mt_15">
                      <li><i className="fas fa-user" /> admin</li>
                      <li><i className="fas fa-calendar-alt" /> {blog.date}</li>
                      <li><i className="fas fa-comments" /> {blog.comments} comments</li>
                    </ul>
                    <a className="title" href="blog_details.html">{blog.title}</a>
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
