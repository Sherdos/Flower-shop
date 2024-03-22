import React, { useEffect } from "react";
import { removeFromFavorites } from "../../store/favoriteSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSubmitFavoritesMutation } from "../../store/favoritesApi";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Favorites = () => {
  const [submitFavorites, { isLoading, isError }] = useSubmitFavoritesMutation();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  useEffect(() => {
    whoami();
  }, []);
  let userId;
  const whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        userId = data.id;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userId);


  const handleFavoritesSubmit = (event) => {
    event.preventDefault();
    for (const item of favorites) {
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
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
    }
  };

  console.log(favorites);
  console.log(user);
  const dispatch = useDispatch();
  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id));
  };
  return (
    <div className="favorites">
      <div className="container">
        <h2>Корзина</h2>
        {favorites.map((favorite, index) => (
          <div key={index} className="cfavorites">
            <div className="img">
              <img src={favorite.image} alt="" />
            </div>
            <div className="con">
              <div className="ctitle">
                <h1 className="title">{favorite.title}</h1>
                <p className="price">Цена: {favorite.price}</p>
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
          <button
            onClick={handleFavoritesSubmit}
            disabled={isLoading}
            className="button"
          >
            {isLoading ? "Оформляется..." : "Оформить заказ"}
          </button>
          {isError && <div>Ошибка при отправке заказа</div>}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
