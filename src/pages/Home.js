import React from "react";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import TrendingCategories from "../components/TrendingProducts";
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
      
      <div className=" mt-4">
      <CategoryGrid />
      </div>
      
      <section data-aos="fade-up">
        <HeroBanner />
      </section>
      <section className="mt-5">
        <TrendingCategories />
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

