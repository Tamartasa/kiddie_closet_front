import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import ItemPage from "./components/ItemPage/ItemPage";
import AllItems2 from "./components/AllItems/AllItems2";
import ItemPageNew from "./components/ItemPage/ItemPageNew";
import HomePage from "./components/HomePage/HomePage";
import ItemsByCategory from "./components/ItemsByCategory/ItemsByCategory";
import AllItems3 from "./components/AllItems/AllItems3";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddItem from "./components/AddItem/AddItem";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  const theme = createTheme({
    palette: {
      primary: { main: "#e4c4a1" },
      secondary: {
        main: "#f5e9dc",
      },
    },

    typography: { fontFamily: `"Ysabeau" sans-serif` },
  });

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Ad />} /> */}
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/items/:item_id" element={<ItemPageNew />} />
            <Route
              path="/items/categories/:category_id"
              element={<ItemsByCategory />}
            />
            <Route path="test" element={<ItemPage />} />
            <Route path="testapi" element={<AddItem />} />
            <Route path="items" element={<AllItems3 />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
