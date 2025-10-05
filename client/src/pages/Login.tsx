import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/trello-logo.png.png";
import { Alert } from "antd";

export default function Login() {
  const navigate = useNavigate();

  const handleResgister = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/resgister");
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

        <button type="submit" id="btnLogin" className="btn btn-primary mt-3">
          Sign in
        </button>
      </form>
      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
      <div className="alert-container">
        <Alert
          message="Error"
          description="Mật khẩu không được bỏ trống | Email không được bỏ trống"
          type="error"
          showIcon
          closable
          style={{ marginBottom: "16px" }}
        />
        <Alert
          message="Đăng nhập thành công"
          type="success"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      </div>
    </div>
  );
}
