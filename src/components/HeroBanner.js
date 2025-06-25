// src/components/HeroBanner.js
import React from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

function HeroBanner() {
  const navigate = useNavigate();
  const banners = [
    { img: "/banner/banner1.jpg", discount: "30%" },
    { img: "/banner/banner2.jpg", discount: "20%" },
    { img: "/banner/banner3.jpg", discount: "50%" },
    { img: "/banner/banner4.jpg", discount: "35%" },
    { img: "/banner/banner5.jpg", discount: "45%" },
  ];

  return (
<section data-aos="fade-down">
    <div className="hero-banner">
      <Carousel fade interval={3000}>
        {banners.map((banner, idx) => (
          <Carousel.Item key={idx} onClick={() => navigate("/products")} style={{ cursor: "pointer" }}>
            <img className="d-block w-100 banner-img" src={banner.img} alt={`Slide ${idx + 1}`} />
            <div className="banner-overlay">
              <h2>MEGA SALE</h2>
              <p>{banner.discount} OFF</p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    </section>
  );
}

export default HeroBanner;
