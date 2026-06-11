import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";
import Contact from "../pages/contact.jsx";
import Images from "../pages/images.jsx";
import About from "../pages/about.jsx";
import Menu from "../pages/menu.jsx";
import MenuBoard from "../pages/menuBoard.jsx";
import "./App.css";

const API_URL = "https://dummyjson.com/recipes?limit=8";

const bentoFoods = [
  {
    name: "Butter Chicken Bowl",
    image: "https://cdn.dummyjson.com/recipe-images/20.webp",
    tag: "Chef favorite",
    color: "var(--color-accent-soft)",
  },
  {
    name: "Chicken Biryani",
    image: "https://cdn.dummyjson.com/recipe-images/11.webp",
    tag: "Village special",
    color: "var(--color-primary-soft)",
  },
  {
    name: "Mango Lassi",
    image: "https://cdn.dummyjson.com/recipe-images/22.webp",
    tag: "Fresh drink",
    color: "var(--color-gold-soft)",
  },
  {
    name: "Classic Margherita",
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    tag: "Wood fired",
    color: "var(--color-surface)",
  },
  {
    name: "BBQ Chicken Feast",
    image: "https://cdn.dummyjson.com/recipe-images/3.webp",
    tag: "Weekend special",
    color: "var(--color-accent-soft)",
  },
  {
    name: "Crispy Fried Chicken",
    image: "https://cdn.dummyjson.com/recipe-images/5.webp",
    tag: "Crispy & hot",
    color: "var(--color-gold-soft)",
  },
];

function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__video-wrap">
        <video
          className="home-hero__video"
          src="https://videos.pexels.com/video-files/7818021/7818021-hd_1920_1080_24fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://cdn.dummyjson.com/recipe-images/11.webp"
        />
        <div className="home-hero__video-overlay" />
      </div>

      <div className="home-hero__content">
        <span className="eyebrow">Open daily 10AM – 11PM</span>
        <h1>Mahendra<br />Food Village</h1>
        <p>Village clay ovens, honest spices, zero fuss.<br />Hot food — done right.</p>
      </div>

      <div className="home-hero__decor" aria-hidden="true">
        <span className="home-hero__blob home-hero__blob--1" />
        <span className="home-hero__blob home-hero__blob--2" />
        <span className="home-hero__blob home-hero__blob--3" />
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="section section--bento">
      <div className="section__header">
        <p className="eyebrow">Hand-picked</p>
        <h2>Village Fresh Picks</h2>
        <p>Our kitchen's best sellers — every plate cooked to order, every photo unfiltered.</p>
      </div>

      <div className="bento-grid">
        <article className="bento-card bento-card--tall" style={{ background: "var(--color-accent-soft)" }}>
          <img src={bentoFoods[0].image} alt={bentoFoods[0].name} loading="lazy" />
          <div className="bento-card__body">
            <span className="bento-card__tag">{bentoFoods[0].tag}</span>
            <h3>{bentoFoods[0].name}</h3>
          </div>
        </article>

        <article className="bento-card" style={{ background: "var(--color-primary-soft)" }}>
          <img src={bentoFoods[1].image} alt={bentoFoods[1].name} loading="lazy" />
          <div className="bento-card__body">
            <span className="bento-card__tag">{bentoFoods[1].tag}</span>
            <h3>{bentoFoods[1].name}</h3>
          </div>
        </article>

        <article className="bento-card bento-card--wide" style={{ background: "var(--color-gold-soft)" }}>
          <img src={bentoFoods[2].image} alt={bentoFoods[2].name} loading="lazy" />
          <div className="bento-card__body">
            <span className="bento-card__tag">{bentoFoods[2].tag}</span>
            <h3>{bentoFoods[2].name}</h3>
          </div>
        </article>

        <article className="bento-card" style={{ background: bentoFoods[3].color }}>
          <img src={bentoFoods[3].image} alt={bentoFoods[3].name} loading="lazy" />
          <div className="bento-card__body">
            <span className="bento-card__tag">{bentoFoods[3].tag}</span>
            <h3>{bentoFoods[3].name}</h3>
          </div>
        </article>

        <article className="bento-card" style={{ background: bentoFoods[4].color }}>
          <img src={bentoFoods[4].image} alt={bentoFoods[4].name} loading="lazy" />
          <div className="bento-card__body">
            <span className="bento-card__tag">{bentoFoods[4].tag}</span>
            <h3>{bentoFoods[4].name}</h3>
          </div>
        </article>

        <article className="bento-card" style={{ background: bentoFoods[5].color }}>
          <img src={bentoFoods[5].image} alt={bentoFoods[5].name} loading="lazy" />
          <div className="bento-card__body">
            <span className="bento-card__tag">{bentoFoods[5].tag}</span>
            <h3>{bentoFoods[5].name}</h3>
          </div>
        </article>
      </div>
    </section>
  );
}

function ApiCollection() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) throw new Error("Could not load API data.");

        if (isMounted) {
          setItems(data.recipes || []);
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

  return (
    <section className="section" id="collection">
      <div className="section__header">
        <p className="eyebrow">API powered</p>
        <h2>More From the Kitchen</h2>
        <p>Browse our wider collection.</p>
      </div>

      {status === "loading" ? <p className="state-text">Loading collection…</p> : null}
      {status === "error" ? <p className="state-text">API data is not available right now.</p> : null}

      <div className="collection-grid collection-grid--loose">
        {items.map((item) => (
          <article className="product-card product-card--minimal" key={item.id}>
            <img src={item.image} alt={item.name} loading="lazy" />
            <div className="product-card__body">
              <div className="product-card__meta">
                <span>{item.difficulty}</span>
                <span>{item.rating} ★</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.cuisine}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Mahendra Food Village</p>
      <span>Fresh meals, warm service, simple online access.</span>
    </footer>
  );
}

function AuthPage({ mode }) {
  useEffect(() => {
    document.title = mode === "login" ? "Login - Mahendra Food Village" : "Register - Mahendra Food Village";
  }, [mode]);

  return (
    <>
      <Navbar />
      <AuthShell mode={mode} />
      <Footer />
    </>
  );
}

function AuthShell({ mode }) {
  return (
    <section className="auth-section" id="auth">
      <div className="auth-copy">
        <p className="eyebrow">Member access</p>
        <h2>{mode === "login" ? "Login to your account" : "Create your food village account"}</h2>
        <p>Keep your details ready, save favorite meals, and order quickly the next time you visit.</p>
        <ul>
          {["Fresh village-style meals", "Easy online ordering", "Fast member checkout"].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {mode === "login" ? <Login /> : <Register />}
    </section>
  );
}

function HomePage() {
  useEffect(() => {
    document.title = "Mahendra Food Village";
  }, []);

  return (
    <>
      <Navbar />
      <HomeHero />
      <BentoGrid />
      <ApiCollection />
      <Footer />
    </>
  );
}

function AboutPage() {
  useEffect(() => {
    document.title = "About Us - Mahendra Food Village";
  }, []);

  return (
    <>
      <Navbar />
      <About />
      <Footer />
    </>
  );
}

function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us - Mahendra Food Village";
  }, []);

  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
}

function ImagesPage() {
  useEffect(() => {
    document.title = "Our Gallery - Mahendra Food Village";
  }, []);

  return (
    <>
      <Navbar />
      <Images />
      <Footer />
    </>
  );
}

function App() {
  return (
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-board" element={<MenuBoard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/images" element={<ImagesPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="create" />} />
      </Routes>
    </main>
  );
}

export default App;
