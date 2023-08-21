import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../auth-slice";

function Protected({ children }) {
  const dispatch = useDispatch();

  const isLoggedIn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isLoggedIn !== null) {
      dispatch(login({ role: isLoggedIn?.data?.role }));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn?.data) {
    return <Navigate to="/auth/signin?mode=learner" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
