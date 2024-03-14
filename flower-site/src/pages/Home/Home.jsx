import React from "react";
import Card from "../../components/Card/Card";
import { useGetAllCardsQuery } from "../../store/cardSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const { category } = useSelector((state) => state);
  console.log(category);
  const { data = [], isLoading } = useGetAllCardsQuery({ category });
  console.log(data);
  if (isLoading) {
    return <h2>loading...</h2>;
  }
  return (
    <div className="home">
      <section className="home__banner">
        <div className="container">
          <div className="home__banner__content">
            <div>
              <p>
                Всегда в продаже <br />
                более 100 готовых <br /> дизайнерских букетов
              </p>
              <a href="#">Перейти в каталог </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bestseller">
        <div className="container">
          <h2 className="bestseller__title">Хит продаж</h2>
          <div className="cards">
            {data?.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                image={item.image}
                price={item.price}
                title={item.title}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
