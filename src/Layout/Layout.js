import KiddieAppBar from "../components/AppBar/AppBar";
import { Outlet, useLocation } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { useContext, useEffect } from "react";

export default function Layout() {
  const currLocation = useLocation();
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    console.log("Layout loggedUser changed:", loggedUser);
  }, [loggedUser]);

  console.log("Layout:", currLocation);
  console.log(loggedUser);

  return (
    <>
      <KiddieAppBar loggedUser={loggedUser} />
      <Outlet />
    </>
  );
}
