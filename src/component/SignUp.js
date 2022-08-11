import { useState, useEffect } from "react";
import "../styles/signUp.css";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { REGISTER_URL } from "../apis/api";

const PASSWORD_CHECK = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/;
const SignUp = () => {
  const navigate = useNavigate();
  const [signUpDetails, setSignUpdetails] = useState({
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (e) => {
    setSignUpdetails({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    });
  };

  const checkAllFieldsAreCompleted =
    !signUpDetails.first_name ||
    !signUpDetails.email ||
    !signUpDetails.last_name ||
    !signUpDetails.password ||
    !signUpDetails.password2 ||
    !signUpDetails.username
      ? true
      : false;

  const [isPwdValid, setIsPwdValid] = useState(false);
  const [pwdFocus, setpwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = PASSWORD_CHECK.test(signUpDetails.password);
    setIsPwdValid(result);
    const match =
      signUpDetails.password === signUpDetails.password_confirmation;
    setValidMatch(match);
  }, [signUpDetails.password, signUpDetails.password_confirmation]);
  useEffect(() => {
    setErrMsg("");
  }, [signUpDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(REGISTER_URL, signUpDetails);
      setSignUpdetails({
        first_name: "",
        email: "",
        last_name: "",
        password: "",
        password2: "",
        username: "",
      });
      navigate("/Login");
    } catch (e) {
      setErrMsg("Registration failed retry");
    }
  };

  return (
    <div className="signUp">
      <p className={errMsg ? "error__message" : "no__error"}>{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={signUpDetails.first_name}
          onChange={handleChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={signUpDetails.last_name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={signUpDetails.email}
          onChange={handleChange}
        />
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={signUpDetails.username}
          onChange={handleChange}
        />
        <label htmlFor="password">
          Password{" "}
          <span className={isPwdValid ? "valid" : "hide"}>
            <AiOutlineCheckCircle />
          </span>
          <span
            className={
              isPwdValid || !signUpDetails.password ? "hide" : "invalid"
            }
          >
            <FaTimesCircle />
          </span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={signUpDetails.password}
          onChange={handleChange}
          onFocus={() => setpwdFocus(true)}
          onBlur={() => setpwdFocus(false)}
          required
        />
        <p className={pwdFocus && !isPwdValid ? "intructions" : "hide"}>
          4-24 characters <br />
          Must include uppercase and lower case letters a number
        </p>
        <label htmlFor="password2">Confirm Password </label>
        <input
          type="password"
          id="password2"
          name="password2"
          value={signUpDetails.password2}
          onChange={handleChange}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p className={matchFocus && !validMatch ? "intructions" : "hide"}>
          Passwords must match
        </p>
        <div className="signUp__btn">
          <button disabled={checkAllFieldsAreCompleted}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
