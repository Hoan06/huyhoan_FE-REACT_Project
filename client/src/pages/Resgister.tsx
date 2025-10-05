import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/trello-logo.png.png";

export default function Resgister() {
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="img-logo" />
      <p>Please sign up</p>
      <form id="form">
        <div className="float-label">
          <input type="email" className="ip-email" id="email" placeholder=" " />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="float-label">
          <input type="text" id="userName" placeholder=" " />
          <label htmlFor="userName">User name</label>
        </div>

        <div className="float-label">
          <input
            type="password"
            className="ip-pass"
            id="pass"
            placeholder=" "
          />
          <label htmlFor="pass">Password</label>
        </div>

        <div className="form-p">
          Already have an account,{" "}
          <a href="" onClick={handleLogin}>
            click here !
          </a>
        </div>

        <button type="submit" className="btn-primary" id="btnResgister">
          Sign up
        </button>
      </form>

      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
    </div>
  );
}
