
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { Link } from "react-router-dom";
const cookies = new Cookies();

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleUserEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const register = (event) => {
    event.preventDefault();
    fetch("/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((data) => {
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
        setError("");
        dispatch(setUser({username}));
        navigate("/");
      })
      .catch((err) => {
        setError("Wrong username or password.");
      });
  };

  return (
    <div className="container mt-3">
      <br />
      <h2>Зарегистрироваться</h2>
      <form onSubmit={register}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUserNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleUserEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>{error && <small className="text-danger">{error}</small>}</div>
        </div>
        <button type="submit" >
          Register
        </button>
      </form>
      <p>Есть акканут?</p>
      <p>
        <Link to={"/auth/login"}> Войти</Link>
      </p>
    </div>
  );
};

export default Register;
