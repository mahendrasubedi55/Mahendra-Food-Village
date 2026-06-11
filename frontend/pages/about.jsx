import { useEffect } from "react";
import logoImage from "../logo/logo..png";

const highlights = [
  { title: "Home Delivery", desc: "Hot meals delivered within 30 min across village + nearby city" },
  { title: "Event Catering", desc: "Weddings, birthdays, corporate — bulk village menus" },
  { title: "Takeaway", desc: "Pre-order and pick fresh, zero wait" },
  { title: "Late Night", desc: "Open till 11 PM, kitchen till 10:30 PM" },
];

const signatureFoods = [
  { name: "Butter Chicken Bowl", cuisine: "North Indian", rating: "4.8", img: "https://cdn.dummyjson.com/recipe-images/20.webp" },
  { name: "Chicken Biryani", cuisine: "Hyderabadi", rating: "4.9", img: "https://cdn.dummyjson.com/recipe-images/11.webp" },
  { name: "Mango Lassi", cuisine: "Punjabi", rating: "4.7", img: "https://cdn.dummyjson.com/recipe-images/22.webp" },
  { name: "Classic Margherita", cuisine: "Italian", rating: "4.6", img: "https://cdn.dummyjson.com/recipe-images/1.webp" },
  { name: "BBQ Chicken Feast", cuisine: "American", rating: "4.7", img: "https://cdn.dummyjson.com/recipe-images/3.webp" },
  { name: "Crispy Fried Chicken", cuisine: "Korean", rating: "4.5", img: "https://cdn.dummyjson.com/recipe-images/5.webp" },
];

function About() {
  useEffect(() => {
    document.title = "About Us - Mahendra Food Village";
  }, []);

  return (
    <div className="page page--about">
      <section className="about-hero">
        <img src={logoImage} alt="Mahendra Food Village logo" className="about-hero__logo" />
        <span className="eyebrow">Our kitchen story</span>
        <h1>Mahendra Food Village</h1>
        <p>Born from village clay ovens, served with city-speed delivery.</p>
      </section>

      <section className="about-section">
        <div className="section__header">
          <p className="eyebrow">What we offer</p>
          <h2>Food Serving &amp; Delivery</h2>
          <p>From sizzling takeaways to full event banquets — warm food, village style.</p>
        </div>
        <div className="service-grid">
          {highlights.map((item) => (
            <div className="service-card" key={item.title}>
              <div className="service-card__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section__header">
          <p className="eyebrow">Special dishes</p>
          <h2>Signature Foods</h2>
          <p>Our village kitchen favorites — every plate cooked fresh, every photo real.</p>
        </div>

        <div className="food-gallery">
          <article className="food-gallery__featured">
            <img src={signatureFoods[0].img} alt={signatureFoods[0].name} loading="lazy" />
            <div className="food-gallery__featured-body">
              <span className="food-gallery__cuisine">{signatureFoods[0].cuisine}</span>
              <h3>{signatureFoods[0].name}</h3>
              <span className="food-gallery__rating">★ {signatureFoods[0].rating} rating</span>
            </div>
          </article>

          <div className="food-gallery__grid">
            {signatureFoods.slice(1).map((food) => (
              <article className="food-gallery__card" key={food.name}>
                <img src={food.img} alt={food.name} loading="lazy" />
                <div className="food-gallery__card-body">
                  <span className="food-gallery__cuisine">{food.cuisine}</span>
                  <h3>{food.name}</h3>
                  <span className="food-gallery__rating">★ {food.rating} rating</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
