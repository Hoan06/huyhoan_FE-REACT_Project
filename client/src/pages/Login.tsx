import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/trello-logo.png.png";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { fetchData } from "../api/loginSlice";

export default function Login() {
  const navigate = useNavigate();
  const { users } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResgister = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/resgister");
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email không được để trống!");
      return;
    }
    if (!password.trim()) {
      setError("Password không được bỏ trống!");
      return;
    }

    const check = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!check) {
      setError("Tài khoản không tồn tại trong hệ thống!");
      return;
    }

    localStorage.setItem("token", check.id.toString());
    setSuccess("Đăng nhập thành công!");

    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="img-logo" />
      <p>Please sign in</p>
      <form id="form">
        <div className="form-group">
          <input
            type="email"
            className="ip-email"
            id="userEmail"
            placeholder=" "
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="userEmail">Email address</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            className="ip-pass"
            id="pass"
            placeholder=" "
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="pass">Password</label>
        </div>

        <div className="div-chb">
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <div className="form-p">
          Don't have an account,{" "}
          <a href="" onClick={handleResgister}>
            click here !
          </a>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </form>
      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
      <div className="alert-container">
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "16px" }}
            onClose={() => setError("")}
          />
        )}
        {success && (
          <Alert
            message={success}
            type="success"
            showIcon
            style={{ marginBottom: "16px" }}
            onClose={() => setSuccess("")}
          />
        )}
      </div>
    </div>
  );
}
