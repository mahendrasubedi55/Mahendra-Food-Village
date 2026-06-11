import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", avatar: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = useMemo(
    () => form.username.trim() && form.email.trim() && form.password.trim().length >= 6,
    [form],
  );

  const passwordStrength = useMemo(() => {
    const pwd = form.password;
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return Math.min(score, 4);
  }, [form.password]);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsLoading(true);

    try {
      await api.post("/api/auth/register", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        avatar: form.avatar || undefined,
      });

      setStatus({ type: "success", message: "Account created! Please login." });
      navigate("/login");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.msg || error.response?.data?.error || error.message || "Registration failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <div className="auth-card__header">
        <p className="eyebrow">Create</p>
        <h3>Start your account</h3>
        <p>Join Mahendra Food Village for faster checkout and saved favorites.</p>
      </div>

      <div className="auth-card__body">
        <label className="field">
          <span>Username</span>
          <input
            autoComplete="username"
            name="username"
            onChange={handleChange}
            placeholder="Choose a username"
            type="text"
            value={form.username}
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            onChange={handleChange}
            placeholder="name@example.com"
            type="email"
            value={form.email}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            autoComplete="new-password"
            name="password"
            onChange={handleChange}
            placeholder="At least 6 characters"
            type="password"
            value={form.password}
          />
          {form.password ? (
            <div className="strength" aria-label="Password strength">
              <div
                className="strength__bar"
                style={{
                  opacity: 1,
                  width: `${(passwordStrength / 4) * 100}%`,
                  background:
                    passwordStrength <= 1
                      ? "#d95a28"
                      : passwordStrength <= 2
                        ? "#d3991b"
                        : passwordStrength <= 3
                          ? "#1b6b4a"
                          : "#0f5c3a",
                }}
              />
            </div>
          ) : null}
        </label>

        <label className="field">
          <span>Avatar URL</span>
          <input
            name="avatar"
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
            type="url"
            value={form.avatar}
          />
          {form.avatar ? (
            <img
              alt="Avatar preview"
              className="avatar-preview"
              src={form.avatar}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </label>

        {status.message ? (
          <p className={`form-message form-message--${status.type}`}>{status.message}</p>
        ) : null}

        <button className="submit-button" disabled={!canSubmit || isLoading} type="submit">
          {isLoading ? "Creating..." : "Create account"}
        </button>

        <p className="auth-switch">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </form>
  );
}

export default Register;
