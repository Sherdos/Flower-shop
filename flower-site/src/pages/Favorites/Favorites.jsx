import React from 'react';
import { removeFromFavorites } from '../../store/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useSubmitFavoritesMutation } from '../../store/favoritesApi';


const Favorites = () => {
    const [submitFavorites, { isLoading, isError }] = useSubmitFavoritesMutation();
    const handleFavoritesSubmit = () => {
        if (user) {
            // Опционально: выполните дополнительные проверки перед отправкой заказа
            submitFavorites({ favorites, userId: user });
            console.log({ favorites, userId: user });
        }
    };
    const favorites = useSelector((state) => state.favorites.favorites);
    const user = useSelector((state) => state.auth.user.user.id);
    console.log(favorites);
    console.log(user);
    const dispatch = useDispatch()
    const handleRemoveFromFavorites = (id) => {
        // Диспатчим действие removeFromFavorites с идентификатором элемента для удаления
        dispatch(removeFromFavorites(id));
    }
    return (
        <div className='favorites'>
            <div className="container">
                <h2>Корзина</h2>
                {favorites.map((favorite, index) => (
                    <div key={index} className="cfavorites">
                        <div className="img">
                            <img src={favorite.image} alt="" />
                        </div>
                        <div className="con">
                            <div className='ctitle'>
                                <h1 className='title'>{favorite.title}</h1>
                                <p className='price'>Цена: {favorite.price}</p>
                            </div>
                            <div className="x">
                                <button onClick={() => handleRemoveFromFavorites(favorite.id)}><img src="./src/assets/cart/x.jpg" alt="" /></button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="btn">
                    <button onClick={handleFavoritesSubmit} disabled={isLoading} className='button'>
                        {isLoading ? 'Оформляется...' : 'Оформить заказ'}
                    </button>
                    {isError && <div>Ошибка при отправке заказа</div>}
                </div>
            </div>
        </div>
    );
}

export default Favorites;
