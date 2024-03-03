import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: "All", // Изначально данные пользователя пусты
  isAuthenticated: false, // Изначально пользователь не аутентифицирован
};

// localStorage
const loadUserFromLocalStorage = () => {
    try {
      const categoryData = localStorage.getItem('category');
      if (categoryData) {
        return JSON.parse(categoryData);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
    return "All";
  };

const card = createSlice({
  name: 'category',
//   initialState,
  initialState: {
    ...initialState,
    category: loadUserFromLocalStorage(),
    isAuthenticated: !!loadUserFromLocalStorage(),
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload; // Обновляем данные пользователя
      state.isAuthenticated = true; // Устанавливаем флаг аутентификации в true
    //   localStorage
      try {
        localStorage.setItem('category', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    }
  }
});

export const { setCategory , category} = card.actions;
export default card.reducer;