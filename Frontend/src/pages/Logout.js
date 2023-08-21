import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import store from "../store/store";
import { logoutUser } from "../services/apiAuth";
import { logout } from "../features/auth/auth-slice";
import { clearFavouriteCourseList } from "../features/course/favorite-slice";

const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    await logoutUser();
    store.dispatch(logout());
    store.dispatch(clearFavouriteCourseList());
    window.localStorage.removeItem("user");
    navigate("/");
  }, []);

  useEffect(() => {
    logoutHandler();
  }, []);

  return <></>;
};

export default Logout;
  