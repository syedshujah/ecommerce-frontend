import React from "react";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import SocialMediaSection from "../components/SocialMediaSection";
function Home() {
  return (
    <div>
      <div className="animated-top-strip">
        <div className="animated-message">
          🎉 Welcome to Blue Mart! | FREE Shipping Above Rs. 3000 | Flash Sale LIVE!
        </div>
      </div>
      <section data-aos="fade-up">
        <HeroBanner />
      </section>

      <section data-aos="zoom-in-up">
        <CategoryGrid />
      </section>

      <section data-aos="fade-right">
        <FeaturedProducts />
      </section>
      <section className="mt-5">
        <Testimonials />
      </section>

      <section data-aos="flip-left">
        <Newsletter />
      </section>

     <section className="mt-5">
        <SocialMediaSection />
      </section>

    </div>
  );
}

export default Home;

