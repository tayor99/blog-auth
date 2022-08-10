import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { LOGIN_URL } from "../apis/api";

import "../styles/login.css";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setErrMsg("");
  }, [loginDetails]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(LOGIN_URL, loginDetails);
      localStorage.setItem("loginDetails", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      setErrMsg("Invalid login details retry");
    }
  };

  return (
    <div className="login">
      <p className={errMsg ? "error__message" : "no__error"}>{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={loginDetails.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
        />

        <div className="login__btn">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
