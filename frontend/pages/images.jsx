import { useEffect, useMemo, useState } from "react";

const galleryImages = [
  { id: 1, src: "https://cdn.dummyjson.com/recipe-images/1.webp", title: "Classic Margherita", category: "Italian" },
  { id: 2, src: "https://cdn.dummyjson.com/recipe-images/3.webp", title: "BBQ Chicken Feast", category: "American" },
  { id: 3, src: "https://cdn.dummyjson.com/recipe-images/5.webp", title: "Crispy Fried Chicken", category: "Korean" },
  { id: 4, src: "https://cdn.dummyjson.com/recipe-images/7.webp", title: "Chocolate Lava Cake", category: "Dessert" },
  { id: 5, src: "https://cdn.dummyjson.com/recipe-images/9.webp", title: "Garlic Butter Prawns", category: "Seafood" },
  { id: 6, src: "https://cdn.dummyjson.com/recipe-images/11.webp", title: "Chicken Biryani", category: "Indian" },
  { id: 7, src: "https://cdn.dummyjson.com/recipe-images/13.webp", title: "Mushroom Risotto", category: "Italian" },
  { id: 8, src: "https://cdn.dummyjson.com/recipe-images/15.webp", title: "Spicy Tacos", category: "Mexican" },
  { id: 9, src: "https://cdn.dummyjson.com/recipe-images/17.webp", title: "Berry Smoothie Bowl", category: "Healthy" },
  { id: 10, src: "https://cdn.dummyjson.com/recipe-images/19.webp", title: "Carbonara Pasta", category: "Italian" },
  { id: 11, src: "https://cdn.dummyjson.com/recipe-images/20.webp", title: "Butter Chicken", category: "Indian" },
  { id: 12, src: "https://cdn.dummyjson.com/recipe-images/21.webp", title: "Grilled Salmon", category: "Seafood" },
];

const categories = ["All", ...new Set(galleryImages.map((item) => item.category))];

function Images() {
  const [selected, setSelected] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.title = "Our Gallery - Mahendra Food Village";
  }, []);

  const filtered = useMemo(() => {
    if (selected === "All") return galleryImages;
    return galleryImages.filter((item) => item.category === selected);
  }, [selected]);

  return (
    <div className="page page--images">
      <section className="gallery-hero">
        <span className="eyebrow">Food photography</span>
        <h1>A Visual Feast</h1>
        <p>
          Every dish tells a story. Browse our gallery of village-style meals,
          handcrafted with love and served with pride.
        </p>
      </section>

      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-filter ${selected === cat ? "gallery-filter--active" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map((item) => (
          <article
            className="gallery-card"
            key={item.id}
            onClick={() => setLightbox(item)}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <div className="gallery-card__overlay">
              <span className="gallery-card__category">{item.category}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>

      {lightbox ? (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox__close"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="lightbox__meta">
              <span className="gallery-card__category">{lightbox.category}</span>
              <h3>{lightbox.title}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Images;
