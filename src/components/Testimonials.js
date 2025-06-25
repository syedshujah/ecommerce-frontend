import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Ayesha Khan",
    review: "Amazing quality and fast delivery! Highly recommended.",
    image: "/testimonials/user1.jpeg",
  },
  {
    name: "Ali Raza",
    review: "Customer service was great and products are awesome.",
    image: "/testimonials/user2.jpeg",
  },
  {
    name: "Fatima Noor",
    review: "Very satisfied! Got exactly what I ordered.",
    image: "/testimonials/user3.jpeg",
  },
];

function Testimonials() {
  return (
    <section className="testimonial-wrapper py-5" data-aos="fade-up">
      <div className="container">
        <h2 className="text-center section-heading">What Our Customers Say</h2>
        <div className="row mt-5 g-4">
          {testimonials.map((t, i) => (
            <div className="col-md-4" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="testimonial-card p-4 shadow-lg rounded bg-white h-100 d-flex flex-column align-items-center text-center">
                <img src={t.image} alt={t.name} className="testimonial-img mb-3" />
                <h5 className="fw-bold text-primary">{t.name}</h5>
                <p className="text-muted fst-italic">"{t.review}"</p>
                <span className="stars mt-2">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
