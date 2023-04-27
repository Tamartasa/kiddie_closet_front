import "./App.css";
import Ad from "./Ad/Ad";
import SignUp from "./SignUp/SignUp";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Ad />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
