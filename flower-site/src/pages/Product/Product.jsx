import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../store/cardSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../store/favoriteSlice';

const Product = () => {
    const { id } = useParams()
    const { data } = useGetProductQuery(id)
    console.log(data);
    const dispatch = useDispatch();
    const handleAddToFavorites = () => {
        dispatch(addToFavorites(
           { id: data.id,
            image: data.image,
            price: data.price,
            title: data.title,
            category: data.category}
        ));
    };
    return (
        <div className="container">
            <div className="crumbs">
                <ul className="breadcrumbs">
                    <Link to={'/'}> 
                        <a href="/" title="Главная" itemprop="item">
					        <span itemprop="name">Главная &nbsp; — &nbsp;&nbsp;</span>
				        </a>
                    </Link>
                    <Link to={'/'}> 
                        <a href="/" title="Хит продаж" itemprop="item">
					        <span itemprop="name">Хит продаж &nbsp; — &nbsp;&nbsp;</span>
				        </a>
                    </Link>
                    <li className="crumb active">{data?.title}</li>
                </ul>
            </div>
            <div className='product__wrap'>
                <div className="product__left">
                    <img className='img' src={data?.image} alt="" />
                </div>
                <div className="product__right">
                    <div className="product__right-upper">
                        <h1 className='title'>{data?.title}</h1>
                        <p className="price">Цена: {data?.price}</p>
                        <div className="product-options">
                            <button onClick={handleAddToFavorites} className="basket-btn js-add-to-cart" data-id="1627">В корзину</button>
                        </div>
                        <div className="product__buttons">
                            <a href="" className="product-buttons__option js-fast-order-form" data-id="1627">Купить в один клик</a>
                        </div>
                        <div className="product__item">
                            <div className="product__item-title">
                                <span>Способы оплаты</span>
                                <div className="product__payment">
                                    <div className="product__payment-item">
                                        <div className="product__payment-item-img">
                                            <a href="/payment"><img src="./src/assets/product/money-bill-wave-alt.png" alt=""/></a>
                                        </div>
                                        Наличными
                                    </div>
                                    <div className="product__payment-item">
                                        <div className="product__payment-item-img">
                                            <a href="/payment"><img src="./src/assets/product/credit-card.png" alt=""/></a>
                                        </div>
                                        Картой
                                    </div>
                                    <div className="product__payment-item">
                                        <div className="product__payment-item-img">
                                           <a href="/payment"><img src="./src/assets/product/university.png" alt=""/></a>
                                        </div>
                                        На к/р
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="why">
                <h2>Почему мы?</h2>
                <div className="why__wrap">
                    <div className="why__item">
                        <div className="why__item-img">
                            <img src="./src/assets/product/why/why1.png" alt=""/>
                        </div>
                        <p>Доставим в срок</p>
                    </div>
                    <div className="why__item">
                        <div className="why__item-img">
                            <img src="./src/assets/product/why/why2.png" alt=""/>
                        </div>
                        <p>Цветы простоят от 6 дней</p>
                    </div>
                    <div className="why__item">
                        <div className="why__item-img">
                            <img src="./src/assets/product/why/why3.png" alt=""/>
                        </div>
                        <p>Возвращаем до 15% бонусами</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
