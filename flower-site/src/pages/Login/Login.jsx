import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
const cookies = new Cookies();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  const login = (event) => {
    event.preventDefault();
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(isResponseOk)
      .then((data) => {
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
        setError("");
        dispatch(setUser(username));
        navigate('/')
      })
      .catch((err) => {
        setError("Wrong username or password.");
      });
  };

  const logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        setIsAuthenticated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isAuthenticated) {
    
    return (
      <div className="container mt-3">
        <br />
        <h2>Логин</h2>
        <form onSubmit={login}>
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
            <label htmlFor="username">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div>
              {error && <small className="text-danger">{error}</small>}
            </div>
          </div>
          <button type="submit">
            Login
          </button>
        </form>
        <p>Нет акканут?</p>
         <p>
           <Link to={"/auth/register"}> Зарегистрироваться</Link>
        </p>
      </div>
    );
  }
  return (
    <div className="container mt-3">
      <h1>React Cookie Auth</h1>
      <p>You are logged in!</p>
      <button className="btn btn-primary mr-2" onClick={whoami}>
        WhoAmI
      </button>
      <button className="btn btn-danger" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Login;
