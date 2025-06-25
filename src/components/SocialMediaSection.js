import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./SocialMediaSection.css";

function SocialMedia() {
  return (
    <section className="social-media-section" data-aos="fade-up">
      <h2>Follow Us On Social Media</h2>
      <p>Stay connected and get the latest updates and exclusive offers!</p>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FaFacebookF /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><FaTwitter /></a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon"><FaYoutube /></a>
      </div>
    </section>
  );
}

export default SocialMedia;
