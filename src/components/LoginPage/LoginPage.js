import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { LOGIN } from "../../urls";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { setLoggedUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    axios
      .post(LOGIN, formData)
      .then((responseData) => {
        if (responseData.status === 200) {
          localStorage.setItem("access", responseData.data.access);
          localStorage.setItem("refresh", responseData.data.refresh);
          setLoggedUser(username);
          navigate("/");
          //   window.open("/", "_self");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorText("username or password incorrect, try again or signup");
        } else {
          console.log(error);
          setErrorText(error.response.data.detail);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>

        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <br />

        <input type="submit" value="Login"></input>
      </form>
      {errorText && <p>Error occurred: {errorText}</p>}
    </>
  );
}
