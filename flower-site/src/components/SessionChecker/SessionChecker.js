import { useEffect } from 'react';
import { useCheckSessionQuery } from '../../store/cardSlice'; // Импортируем хук для запроса checkSession

function SessionChecker() {
    const { data, error, isLoading, refetch } = useCheckSessionQuery(); // Получаем данные о сессии с сервера

    useEffect(() => {
        if (!isLoading) { // Проверяем, завершился ли запрос
            if (error) {
                console.error('Ошибка при проверке сессии:', error);
                // Обработка ошибки, например, перенаправление на страницу входа
            } else {
                if (data && data.authenticated) {
                    console.log('Пользователь аутентифицирован, его ID:', data.user);
                    // Обновление состояния приложения, например, сохранение информации о пользователе в Redux Store
                } else {
                    console.log('Сессия не существует');
                    // Обработка отсутствия сессии, например, перенаправление на страницу входа
                }
            }
        }
    }, [data, error, isLoading, refetch]);

    return null; // Компонент ничего не отображает, поэтому возвращаем null
}

export default SessionChecker;
