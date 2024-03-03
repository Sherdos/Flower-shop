import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [], // Изначально данные пользователя пусты
};

const loadUserFromLocalStorage = () => {
  try {
    const favoritesData = localStorage.getItem('favorites');
    if (favoritesData) {
      return JSON.parse(favoritesData);
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
  }
  return [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ...initialState,
    favorites: loadUserFromLocalStorage(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
      try {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    },
    removeFromFavorites: (state, action) => {
      const idToRemove = action.payload;
      state.favorites = state.favorites.filter(item => item.id !== idToRemove);
      try {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    },
  },
});


export const { addToFavorites, removeFromFavorites, } = favoritesSlice.actions;
export default favoritesSlice.reducer;