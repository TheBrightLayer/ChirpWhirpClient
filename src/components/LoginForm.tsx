import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function LoginForm({ onClose, onLoginSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserRole = async (token: string) => {
    const res = await fetch(`https://thebrightlayerbackend.onrender.com/api/auth/me/role`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://thebrightlayerbackend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data?.msg || "Login failed");

      const profile = await fetchUserRole(data.token);
      const user = {
        token: data.token,
        role: profile.role || "admin",
        username: profile.username || email.split("@")[0],
        email: profile.email || email,
        profilePicture: profile.profilePicture,
      };

      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
      onClose();
      navigate("/blogs");
    } catch {
      setError("Something went wrong.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://thebrightlayerbackend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data?.msg || "Registration failed");

      const profile = await fetchUserRole(data.token);
      const user = {
        token: data.token,
        role: profile.role || "reader",
        username: profile.username || email.split("@")[0],
        email: profile.email || email,
        profilePicture: profile.profilePicture,
      };

      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
      onClose();
      navigate("/blogs");
    } catch {
      setError("Something went wrong.");
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "facebook" | "apple",
    token: string,
    extra?: any
  ) => {
    try {
      const body =
        provider === "google"
          ? { idToken: token }
          : provider === "facebook"
          ? { accessToken: token, userID: extra?.userID }
          : { identityToken: token, name: extra?.name, email: extra?.email };

      const res = await fetch(
        `https://thebrightlayerbackend.onrender.com/api/auth/login/${provider}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok) return setError(data?.msg || `${provider} login failed`);

      localStorage.setItem("user", JSON.stringify(data.user));
      onLoginSuccess(data.user);
      onClose();
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      setError(`Something went wrong with ${provider} login.`);
    }
  };

  return (
    <div className="overlay">
      <div className="auth-card">
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        <div className="social-buttons">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (!credentialResponse.credential)
                return setError("Google login failed");
              handleSocialLogin("google", credentialResponse.credential);
            }}
            onError={() => setError("Google login failed")}
          />
        </div>

        <div className="divider">
          <span>OR LOGIN WITH</span>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="actions">
            <a href="#">Forgot Password?</a>
            <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
          </div>
          {/* Close button below the form */}
          <button type="button" className="close-btn" onClick={onClose}>
            CLOSE
          </button>
        </form>
      </div>

      <style>{`
        .overlay {
          position: fixed !important;
          inset: 0 !important;
          background: rgba(0, 0, 0, 0.85) !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          z-index: 1000 !important;
          backdrop-filter: blur(4px) !important;
        }
        .auth-card {
          background: #121212 !important;
          padding: 2rem 2.5rem !important;
          width: 420px !important;
          border-radius: 14px !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.8) !important;
          color: #f5f5f5 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 1.2rem !important;
          font-family: "Inter", sans-serif !important;
        }
        .tabs { display: flex !important; justify-content: space-around !important; border-bottom: 1px solid #333 !important; }
        .tabs button { flex: 1 !important; padding: 0.9rem 0 !important; background: none !important; border: none !important; color: #aaa !important; font-weight: 600 !important; cursor: pointer !important; transition: color 0.2s, border-bottom 0.2s !important; }
        .tabs button.active { color: #1a4eff !important; border-bottom: 3px solid #1a4eff !important; }
        .social-buttons { display: flex !important; flex-direction: column !important; gap: 0.7rem !important; margin-bottom: 1.2rem !important; }
        .divider { display: flex !important; align-items: center !important; margin: 1rem 0 !important; }
        .divider span { flex: 1 !important; text-align: center !important; font-size: 0.75rem !important; color: #888 !important; position: relative !important; }
        .divider span::before, .divider span::after { content: "" !important; height: 1px !important; background: #333 !important; flex: 1 !important; margin: 0 0.5rem !important; }
        form { display: flex !important; flex-direction: column !important; gap: 0.8rem !important; }
        form label { font-size: 0.8rem !important; color: #aaa !important; font-weight: 500 !important; }
        form input { padding: 0.7rem !important; border-radius: 6px !important; border: 1px solid #333 !important; background: #1b1b1b !important; color: #fff !important; font-size: 0.9rem !important; transition: all 0.2s !important; }
        form input:focus { outline: none !important; border-color: #1a4eff !important; background: #222 !important; }
        .actions { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-top: 1rem !important; }
        .actions a { color: #888 !important; font-size: 0.8rem !important; text-decoration: none !important; transition: color 0.2s !important; }
        .actions a:hover { color: #1a4eff !important; }
        .actions button { background: #1a4eff !important; border: none !important; padding: 0.65rem 1.3rem !important; color: #fff !important; border-radius: 6px !important; font-weight: 600 !important; cursor: pointer !important; transition: background 0.2s !important; }
        .actions button:hover { background: #0033cc !important; }
        .error { color: #ff4d4f !important; text-align: center !important; margin-bottom: 0.8rem !important; font-size: 0.9rem !important; }
        .close-btn {
        position : relative;
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: #d32f2f;
}
      `}</style>
    </div>
  );
}
