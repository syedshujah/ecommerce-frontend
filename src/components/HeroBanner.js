// src/components/HeroBanner.js
import React from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

function HeroBanner() {
  const navigate = useNavigate();
  const banners = [
    { img: "/banner/banner1.jpg", discount: "30%", category: "electronics", title: "Electronics Bonanza" },
    { img: "/banner/banner2.jpg", discount: "20%", category: "fashion", title: "Trendy Fashion Sale" },
    { img: "/banner/banner3.jpg", discount: "50%", category: "shoes", title: "Shoes Mega Sale" },
    { img: "/banner/banner4.jpg", discount: "35%", category: "watches", title: "Luxury Watches" },
    { img: "/banner/banner5.jpg", discount: "45%", category: "bags", title: "Stylish Bags Discount" },
  ];
  


  return (
    <section data-aos="fade-down">
      <div className="hero-banner">
        <Carousel fade interval={3000}>
          {banners.map((banner, idx) => (
            <Carousel.Item key={idx} style={{ cursor: "pointer" }}>
              <img
                className="d-block w-100 banner-img"
                src={banner.img}
                alt={`${banner.category} sale - ${banner.discount} OFF`}
              />
              <div className="banner-overlay">
                <h2>{banner.title}</h2>
                <p>{banner.discount} OFF</p>
                <button
                  className="shop-now-btn"
                  onClick={() =>
                    navigate(
                      `/products?discount=true&category=${banner.category}`
                    )
                  }
                >
                  Shop Now
                </button>

              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default HeroBanner;
