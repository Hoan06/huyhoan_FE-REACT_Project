import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/trello-logo.png.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import { fetchUsers, resgisterUser } from "../api/resgisterSlice";
import type { User } from "../utils/Types";

export default function Resgister() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.resgister);

  // state cho phần validate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const validate = (): boolean => {
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!email.trim()) {
      setError("Email không được để trống !");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Email không đúng định dạng!");
      return false;
    }
    if (!password.trim()) {
      setError("Mật khẩu không được để trống!");
      return false;
    }
    if (!passRegex.test(password)) {
      setError(
        "Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return false;
    }

    const check = users.find((u) => u.email === email);
    if (check) {
      setError("Email đã tồn tại trong hệ thống!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const newUser: Omit<User, "id" | "created_at"> = {
      email,
      userName,
      password,
    };
    try {
      await dispatch(resgisterUser(newUser));
      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/"), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Đăng ký thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="img-logo" />
      <p>Please sign up</p>
      <form id="form">
        <div className="float-label">
          <input
            type="email"
            className="ip-email"
            id="email"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="float-label">
          <input
            type="text"
            id="userName"
            placeholder=" "
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="userName">User name</label>
        </div>

        <div className="float-label">
          <input
            type="password"
            className="ip-pass"
            id="pass"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="pass">Password</label>
        </div>

        <div className="form-p">
          Already have an account,{" "}
          <a href="" onClick={handleLogin}>
            click here !
          </a>
        </div>

        <button
          type="submit"
          className="btn-primary"
          id="btnResgister"
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </form>

      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
      <div className="alert-container">
        {error && (
          <Alert
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
