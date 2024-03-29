import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import img from "../../assets/reviews/img.png";
import Cookies from "universal-cookie";
import { useUser } from "../../store/context.jsx";
const cookies = new Cookies();

const Reviews = () => {
  const [username, setUsername] = useState("false");
  const [reviews, setUReviews] = useState([]);
  const { userId } = useUser();
  useEffect(() => {
    whoami();
    reviewsAll();
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

  const reviewsAll = () => {
    fetch("api/v1/reviews/")
      .then((res) => res.json())
      .then((data) => {
        setUReviews(data);
      });
  };

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    // try {
    //   const commentData = await addComment(data).unwrap();
    //   await refetch(); // обновление данных после успешного добавления
    //   reset(); // сброс формы
    //   handleClose();
    //   navigate("/reviews");
    // } catch (e) {
    //   console.log(e.message);
    // }
    fetch("api/v1/reviews/" ,{
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  "X-CSRFToken": cookies.get("csrftoken"),
		},
		credentials: "same-origin",
		body: JSON.stringify({
		  text:data.title,
		  user:userId ,
		}),
	})
	.then((res) => res.json())
	.then((res) => console.log(res));
	 navigate("/reviews");
  };
  return (
    <div className="reviews">
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div closeButton className="btn__name">
            <input
              value={username}
              {...register("name")}
              required
              type="text"
              placeholder="имя"
            />
          </div>
          <div className="btn__kom">
            <input
              {...register("title")}
              required
              type="text"
              placeholder="комментари"
            />{" "}
            <br />
          </div>
          <div className="btn__opr">
            <button variant="secondary" >
              Close
            </button>
            <button type="submit" variant="primary" >
              отправить
            </button>
          </div>
        </div>
      </form>
      <div className="page">
        <div className="page__title">
          <div class="title__wrap">
            <h1>Отзывы</h1>
            {username ? (
              <button  class="watch-all">
                Оставить отзыв
              </button>
            ) : (
              <p>
                Вам нужно регистрация, <br /> чтобы{" "}
              </p>
            )}
          </div>
        </div>
        {reviews?.map((item) => (
          <div key={item.id} className="comments">
            <div className="comments__wrap">
              <div className="comments__item-content">
                <div className="feedback-swiper__slide">
                  <div className="feedback-swiper__slide-title">
                    <span>{item.user}</span>
                  </div>
                  <div className="feedback-swiper__slide-stars">
                    <span>
                      <img src={img} alt="star" />
                    </span>
                    <span>
                      <img src={img} alt="star" />
                    </span>
                    <span>
                      <img src={img} alt="star" />
                    </span>
                    <span>
                      <img src={img} alt="star" />
                    </span>
                    <span>
                      <img src={img} alt="star" />
                    </span>
                  </div>
                  <p>{item.text}</p>
                </div>
                <div className="comments__item" id="bx_3218110189_1402"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
