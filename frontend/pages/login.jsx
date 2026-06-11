import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.js";
import api from "../api/axios.js";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { username, password } = form;
    try{
      const res = await api.post("/api/auth/login", { 
        username,
         password 
        });
      updateUser(res.data);
      setIsLoading(false);
      navigate("/");
    }
    
catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg || error.response?.data?.error || error.message || "An error occurred during login.");
      console.log("Login error:", error);
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <div className="auth-card__header">
        <p className="eyebrow">Member access</p>
        <h3>Welcome back</h3>
        <p>Sign in to your account to continue ordering.</p>
      </div>

      <div className="auth-card__body">
        <label className="field">
          <span>Username</span>
          <input
            autoComplete="username"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            autoComplete="current-password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>

        <button
          className="submit-button"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        {error && <span className="text-sm text-danger">{error}</span>}

        <p className="auth-switch">
          No account yet? <NavLink to="/register">Create one</NavLink>
        </p>
      </div>
    </form>
  );
}

export default Login;
