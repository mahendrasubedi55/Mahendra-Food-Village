import { useEffect } from "react";
import logoImage from "../logo/logo..png";

function MenuBoard() {
  useEffect(() => {
    document.title = "Menu Board - Mahendra Food Village";
  }, []);

  const menuItems = [
    {
      name: "Steamed Momo",
      desc: "10 pcs · chicken or veg · with achar",
      price: "₹180",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
      tag: "Bestseller",
      color: "#fff8f0",
    },
    {
      name: "Chicken Chowmein",
      desc: "Wok-tossed noodles · veggies · egg",
      price: "₹160",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
      tag: "Nepali classic",
      color: "#fefaf6",
    },
    {
      name: "Thakali Set",
      desc: "Rice · dal · tarkari · pickle · roti",
      price: "₹280",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
      tag: "Thali",
      color: "#fff",
    },
    {
      name: "Veg Fried Rice",
      desc: "Jeera rice · mixed vegetables · egg opt",
      price: "₹150",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      tag: "Rice",
      color: "#fef9f0",
    },
    {
      name: "Chicken Burger",
      desc: "Crispy chicken · lettuce · mayo · bun",
      price: "₹220",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      tag: "Fast food",
      color: "#fffaf5",
    },
    {
      name: "Margherita Pizza",
      desc: "Fresh mozzarella · basil · tomato sauce",
      price: "₹280",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      tag: "Italian",
      color: "#fff",
    },
    {
      name: "Pork Sekuwa",
      desc: "Charcoal grilled · Timur spice · 250g",
      price: "₹300",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      tag: "Grill",
      color: "#fff7f2",
    },
    {
      name: "Masala Tea",
      desc: "Spiced milk tea · ginger · cardamom",
      price: "₹60",
      image: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400&h=300&fit=crop",
      tag: "Beverage",
      color: "#fef9f2",
    },
    {
      name: "Chicken Sekuwa",
      desc: "Tandoori style · 250g · house spice",
      price: "₹320",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop",
      tag: "Tandoori",
      color: "#fff5f0",
    },
    {
      name: "Cheese Pizza",
      desc: "Double cheese · olives · capsicum",
      price: "₹320",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      tag: "Best seller",
      color: "#fff8f2",
    },
    {
      name: "Buff Momo",
      desc: "Juicy buff · jhol · 10 pcs",
      price: "₹170",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
      tag: "Traditional",
      color: "#fff",
    },
    {
      name: "Cold Drink",
      desc: "Coke · Sprite · Fanta · 350ml",
      price: "₹50",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop",
      tag: "Beverage",
      color: "#f5faff",
    },
  ];

  return (
    <div className="menu-board-page">
      <div className="menu-board">
        <div className="menu-board__header">
          <div className="menu-board__logo">
            <img src={logoImage} alt="Mahendra Food Village logo" className="menu-board__logo-img" />
            <h1>Mahendra Food Village</h1>
            <p className="menu-board__tagline">Authentic Nepali · Indian · Fast Food</p>
          </div>
          <div className="menu-board__divider" aria-hidden="true">
            <span className="menu-board__divider-leaf">🌿</span>
          </div>
          <p className="menu-board__sub">Village Taste · City Speed · Home Delivery Available</p>
        </div>

        <div className="menu-board__table-wrap">
          <table className="menu-board__table">
            <thead>
              <tr>
                <th className="menu-board__th menu-board__th--item">Food Item</th>
                <th className="menu-board__th menu-board__th--price">Price (NPR)</th>
                <th className="menu-board__th menu-board__th--img">Image</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, i) => (
                <tr key={i} className={`menu-board__row ${i % 2 === 0 ? "menu-board__row--light" : "menu-board__row--dark"}`}>
                  <td className="menu-board__td">
                    <div className="menu-board__item">
                      <span className="menu-board__item-name">{item.name}</span>
                      <span className="menu-board__item-desc">{item.desc}</span>
                    </div>
                  </td>
                  <td className="menu-board__td menu-board__td--price">
                    <span className="menu-board__price">{item.price}</span>
                  </td>
                  <td className="menu-board__td">
                    <div className="menu-board__img-wrap">
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <span className="menu-board__tag">{item.tag}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="menu-board__footer">
          <p>✨ Fresh ingredients • Village herbs • Cooked on order</p>
          <p className="menu-board__footer-small">
            Prices are indicative • All prices inclusive of applicable taxes
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenuBoard;
