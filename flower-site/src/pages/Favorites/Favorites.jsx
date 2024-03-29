import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/context";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Favorites = () => {
  const [cartId, setCartId] = useState([]);
  const { userId } = useUser();
  const cartCards = cartId.cards;
  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, []);

  console.log("bayel", userId);
  console.log("bayel cart", cartCards);
  const getCart = async () => {
    try {
      const response = await fetch(`/api/v2/cart/by_user_id/${userId}/`);
      const data = await response.json();
      console.log("cart data: ", data);
      setCartId(data);
      console.log("cart data: ", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavoritesSubmit = () => {
    for (const item of filterData) {
      fetch("api/v1/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({
          user: userId,
          cards: [{ card_id: item.id }],
        }),
      })
        .then((res) => alert("Заказ успещно оформелено"))
        .catch((err) => console.log(err.message));
    }
  };

  console.log(cartId);

  const handleRemoveFromFavorites = (id) => {
    fetch(`/api/v2/cart/delete/card/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
    });
    const updatedFavorites = cartId.cards.filter((favorite) => favorite.id !== id);
    setCartId({ ...cartId, cards: updatedFavorites });
  };

  return (
    <div className="favorites">
      <div className="container">
        <h2>Корзина</h2>

        {cartCards?.map((favorite, index) => (
          <div key={index} className="cfavorites">
            <div className="img">
              <img src={favorite.card.image} alt="" />
            </div>
            <div className="con">
              <div className="ctitle">
                <h1 className="title">{favorite.card.title}</h1>
                <p className="price">Цена: {favorite.card.price}</p>
              </div>
              <div className="x">
                <button onClick={() => handleRemoveFromFavorites(favorite.id)}>
                  <img src="./src/assets/cart/x.jpg" alt="" />X
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="btn">
          <button onClick={handleFavoritesSubmit} className="button">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
