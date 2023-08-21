import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteCourses: [],
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite(state, action) {
      const isExistInFavouriteCoursesList = state.favouriteCourses.some(
        (id) => action.payload === id
      );
      if (!isExistInFavouriteCoursesList) {
        state.favouriteCourses.push(action.payload);
      }
    },
    removeFromFavourite(state, action) {
      state.favouriteCourses = state.favouriteCourses.filter(
        (id) => id !== action.payload
      );
    },
    clearFavouriteCourseList(state, action) {
      state.favouriteCourses = [];
    },
  },
});

export const { addToFavourite, removeFromFavourite, clearFavouriteCourseList } =
  favouriteSlice.actions;

export default favouriteSlice;
