import MainNavbar from "../features/MainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
