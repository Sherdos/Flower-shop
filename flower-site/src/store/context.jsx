import React, { createContext, useState, useEffect, useContext } from 'react';

// Создаем контекст
const UserContext = createContext();

// Создаем компонент-провайдер, который будет содержать состояние пользователя
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState({});

  useEffect(() => {
    // Выполняем whoami() для получения идентификатора пользователя
    whoami();
  }, []);

  const whoami = async () => {
    try {
      const response = await fetch("/api/whoami/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });
      const data = await response.json();
      setUserId(data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Предоставляем состояние пользователя через контекст
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook для использования состояния пользователя в других компонентах
export const useUser = () => useContext(UserContext);
