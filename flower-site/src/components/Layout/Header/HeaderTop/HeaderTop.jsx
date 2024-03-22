import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../../../store/authSlice";
import { useNavigate } from "react-router-dom";

const HeaderTop = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("false");
  const dispath = useDispatch();
  const navigate = useNavigate();

  const isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  useEffect(() => {
    whoami();
    getSession();
  }, []);

  const whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(username);
  const getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
  const handleLogout = () => {
    fetch("/api/logout/", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        setIsAuthenticated(false);
        setUsername('')
      })
      .catch((err) => {
        console.log(err);
      });
    // Очищаем данные пользователя и перенаправляем на страницу входа
    dispath(clearUser());
    localStorage.removeItem("user"); // Очищаем данные из localStorage
    navigate("/");
  };
  return (
    <div className="header__top">
      <div className="container">
        <nav className="header__top__nav">
          <ul className="header__top__nav__menu">
            <li>
              <Link to={"/"}>Каталог</Link>
            </li>
            <li>
              <Link to={"/about"}>О компании</Link>
            </li>
            <li>
              <Link to={"/payment"}>Способы оплаты</Link>
            </li>
            <li>
              <Link to={"/reviews"}>Отзывы</Link>
            </li>
            <li>
              <Link to={"/delivery"}>Доставка</Link>
            </li>
            <li>
              <Link to={"/contacts"}>Контакты</Link>
            </li>
          </ul>
          <ul className="header__top__nav__auth">
            <li className="one">
              {username ? (
                username
              ) : (
                <Link to={"auth/login"}>
                  <span>
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.78125 9.5C8.875 9.5 8.46875 10 7 10C5.5 10 5.09375 9.5 4.1875 9.5C1.875 9.5 0 11.4062 0 13.7188V14.5C0 15.3438 0.65625 16 1.5 16H12.5C13.3125 16 14 15.3438 14 14.5V13.7188C14 11.4062 12.0938 9.5 9.78125 9.5ZM12.5 14.5H1.5V13.7188C1.5 12.2188 2.6875 11 4.1875 11C4.65625 11 5.375 11.5 7 11.5C8.59375 11.5 9.3125 11 9.78125 11C11.2812 11 12.5 12.2188 12.5 13.7188V14.5ZM7 9C9.46875 9 11.5 7 11.5 4.5C11.5 2.03125 9.46875 0 7 0C4.5 0 2.5 2.03125 2.5 4.5C2.5 7 4.5 9 7 9ZM7 1.5C8.625 1.5 10 2.875 10 4.5C10 6.15625 8.625 7.5 7 7.5C5.34375 7.5 4 6.15625 4 4.5C4 2.875 5.34375 1.5 7 1.5Z"
                        fill="#444444"
                      />
                    </svg>
                  </span>{" "}
                  &nbsp;Войти
                </Link>
              )}
            </li>
            <li>
              {username ? (
                <button onClick={handleLogout}>выйти</button>
              ) : (
                <Link to={"auth/register"}>
                  <span>
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 12.5C14.6562 12.5 16 11.1562 16 9.5V3.5C16 1.84375 14.6562 0.5 13 0.5H10.375C10.1562 0.5 10 0.6875 10 0.875V1.625C10 1.84375 10.1562 2 10.375 2H13C13.8125 2 14.5 2.6875 14.5 3.5V9.5C14.5 10.3438 13.8125 11 13 11H10.375C10.1562 11 10 11.1875 10 11.375V12.125C10 12.3438 10.1562 12.5 10.375 12.5H13ZM5.21875 1.125L4.59375 1.75C4.4375 1.875 4.4375 2.125 4.59375 2.28125L8.125 5.6875H0.375C0.15625 5.6875 0 5.875 0 6.0625V6.9375C0 7.15625 0.15625 7.3125 0.375 7.3125H8.125L4.59375 10.75C4.4375 10.9062 4.4375 11.1562 4.59375 11.2812L5.21875 11.9062C5.34375 12.0625 5.59375 12.0625 5.75 11.9062L10.875 6.78125C11.0312 6.625 11.0312 6.40625 10.875 6.25L5.75 1.125C5.59375 0.96875 5.34375 0.96875 5.21875 1.125Z"
                        fill="#444444"
                      />
                    </svg>
                  </span>
                  &nbsp;Регистрация
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderTop;
