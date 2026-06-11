import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.js";
import logoImage from "../logo/logo..png";
import api from "../api/axios.js";

function Navbar() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    try {
      await api.post("/api/auth/logout");
    } finally {
      updateUser(null);
      navigate("/login");
    }
  };

  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <img src={logoImage} alt="Mahendra Food Village logo" className="brand__logo" />
        <span>Mahendra Food Village</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/menu-board">Board</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {currentUser ? (
          <div className="profile-wrapper">
            <button
              type="button"
              className="profile-trigger"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              onBlur={() => setTimeout(() => setShowProfileMenu(false), 150)}
            >
              <img
                src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=d95a28&color=fff`}
                alt={currentUser.username}
                className="nav-avatar"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=d95a28&color=fff`;
                }}
              />
              <span className="nav-user">Hi, {currentUser.username}</span>
            </button>
            {showProfileMenu ? (
              <div className="profile-menu">
                <button type="button" onClick={handleLogout} className="profile-menu__item">
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="nav-cta" to="/register">
              Create
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
