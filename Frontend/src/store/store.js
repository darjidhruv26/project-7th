import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/auth-slice";
import favouriteSlice from "../features/course/favorite-slice";
import createCourseSlice from "../features/createCourse/create-course-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    favourite: favouriteSlice.reducer,
    createCourse: createCourseSlice.reducer,
  },
});

export default store;
