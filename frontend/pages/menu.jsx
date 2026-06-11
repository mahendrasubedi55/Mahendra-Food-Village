import { useEffect, useMemo, useState } from "react";

const MENU_PRICES = {
  "Classic Margherita": "₹180",
  "BBQ Chicken Feast": "₹320",
  "Crispy Fried Chicken": "₹260",
  "Chocolate Lava Cake": "₹150",
  "Garlic Butter Prawns": "₹380",
  "Chicken Biryani": "₹280",
  "Vegetable Stir Fry": "₹190",
  "Mushroom Risotto": "₹240",
  "Spicy Tacos": "₹220",
  "Berry Smoothie Bowl": "₹160",
  "Carbonara Pasta": "₹270",
  "Grilled Salmon": "₹420",
};

const MENU_TAGS = {
  "Classic Margherita": "Bestseller",
  "BBQ Chicken Feast": "Weekend special",
  "Crispy Fried Chicken": "Crispy & hot",
  "Chocolate Lava Cake": "Dessert",
  "Garlic Butter Prawns": "Seafood",
  "Chicken Biryani": "Village special",
  "Vegetable Stir Fry": "Healthy",
  "Mushroom Risotto": "Italian",
  "Spicy Tacos": "Mexican",
  "Berry Smoothie Bowl": "Fresh",
  "Carbonara Pasta": "Italian",
  "Grilled Salmon": "Premium",
};

const CARD_COLORS = [
  "var(--color-accent-soft)",
  "var(--color-primary-soft)",
  "var(--color-gold-soft)",
  "var(--color-surface)",
  "#fef3f0",
  "#edf8f4",
];

function Menu() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    document.title = "Our Menu - Mahendra Food Village";
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes?limit=12");
        const data = await response.json();

        if (!response.ok) throw new Error("Could not load menu.");

        if (isMounted) {
          const enriched = data.recipes.map((r, i) => ({
            ...r,
            price: MENU_PRICES[r.name] || "₹200",
            menuTag: MENU_TAGS[r.name] || "Village fresh",
            cardColor: CARD_COLORS[i % CARD_COLORS.length],
          }));

          setItems(enriched);
          setStatus("ready");
        }
      } catch {
        if (isMounted) setStatus("error");
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.cuisine));
    return ["All", ...set];
  }, [items]);

  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((i) => i.cuisine === active);
  }, [active, items]);

  return (
    <div className="page page--menu">
      <section className="menu-hero">
        <span className="eyebrow">Made with love</span>
        <h1>Our Menu</h1>
        <p>
          Village-style cooking, honest pricing. Every dish is prepared fresh
          — no pre-mixes, no shortcuts.
        </p>

        <div className="menu-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`menu-pill ${active === cat ? "menu-pill--active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {status === "loading" ? (
        <p className="state-text">Bringing the kitchen to your screen…</p>
      ) : status === "error" ? (
        <p className="state-text state-text--error">Our menu is on break. Please try again.</p>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => (
            <article
              className="menu-card"
              key={item.id}
              style={{ background: item.cardColor }}
            >
              <div className="menu-card__img">
                <img src={item.image} alt={item.name} loading="lazy" />
                <span className="menu-card__tag">{item.menuTag}</span>
              </div>
              <div className="menu-card__body">
                <span className="menu-card__cuisine">{item.cuisine}</span>
                <h3>{item.name}</h3>
                <div className="menu-card__footer">
                  <span className="menu-card__difficulty">{item.difficulty}</span>
                  <span className="menu-card__rating">★ {item.rating}</span>
                </div>
                <div className="menu-card__price-row">
                  <span className="menu-card__price">{item.price}</span>
                  <span className="menu-card__reviews">
                    {item.reviewCount} reviews
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="menu-note">
        <div className="menu-note__inner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <strong>Prices are indicative</strong>
            <p>
              Actual prices may vary slightly at the counter. All prices include
              applicable taxes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
