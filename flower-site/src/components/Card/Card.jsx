import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useUser } from "../../store/context.jsx";
const cookies = new Cookies();

const Card = (props) => {
  const { userId } = useUser();
  const [cartId, setCartId] = useState(null);
  useEffect(() => {
     getCart();
  }, []);

  
  const getCart = async () => {
    try {
      const response = await fetch(`/api/v2/cart/by_user_id/${userId}/`);
      const data = await response.json();
      console.log("cart data: ", data.id);
      setCartId(data.id);
      console.log("cart id: ", data.id);
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log('user id:', userId);
  console.log('cart id:', cartId);
  
  

  const handleAddToFavorites = (cardId) => {
    fetch("/api/v2/cart/add/card/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        cart: cartId,
        card: cardId,
      }),
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="card">
      <button onClick={() => handleAddToFavorites(props.id)}>
        <span>
          <svg
            width="32"
            height="29"
            viewBox="0 0 32 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.3828 4H7.30469L6.8125 1.59375C6.70312 0.992188 6.15625 0.5 5.55469 0.5H0.90625C0.523438 0.5 0.25 0.828125 0.25 1.15625V1.59375C0.25 1.97656 0.523438 2.25 0.90625 2.25H5.17188L9 22.6484C8.45312 23.3047 8.125 24.125 8.125 25C8.125 26.9688 9.65625 28.5 11.625 28.5C13.5391 28.5 15.125 26.9688 15.125 25C15.125 24.3984 14.9062 23.7969 14.6328 23.25H22.5625C22.2891 23.7969 22.125 24.3984 22.125 25C22.125 26.9688 23.6562 28.5 25.625 28.5C27.5391 28.5 29.125 26.9688 29.125 25C29.125 24.0703 28.6875 23.1406 28.0312 22.5391C27.9219 21.9375 27.375 21.5 26.7734 21.5H10.5859L9.92969 18H28.0312C28.6875 18 29.1797 17.6172 29.3438 16.9609L31.6953 5.58594C31.8594 4.76562 31.2578 4 30.3828 4ZM13.375 25C13.375 25.9844 12.5547 26.75 11.625 26.75C10.6406 26.75 9.875 25.9844 9.875 25C9.875 24.0703 10.6406 23.25 11.625 23.25C12.5547 23.25 13.375 24.0703 13.375 25ZM25.625 26.75C24.6406 26.75 23.875 25.9844 23.875 25C23.875 24.0703 24.6406 23.25 25.625 23.25C26.5547 23.25 27.375 24.0703 27.375 25C27.375 25.9844 26.5547 26.75 25.625 26.75ZM27.7031 16.25H9.60156L7.63281 5.75H29.8906L27.7031 16.25Z"
              fill="#4BB45E"
            />
          </svg>
        </span>
      </button>
      <Link to={`/${props.id}`}>
        <img src={props.image} alt="" />
        <p className="price">Цена: {props.price}</p>
        <p className="title">{props.title}</p>
        <p className="title">{props.category}</p>
      </Link>
    </div>
  );
};

export default Card;
