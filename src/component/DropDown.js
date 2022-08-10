import "../styles/dropdown.css";
import { Link } from "react-router-dom";
import { LOGOUT_URL } from "../apis/api";
import axios from "axios";

const DropDown = () => {
  const logOut = async () => {
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    if (loginDetails) {
      try {
        await axios.post(
          LOGOUT_URL,
          {},
          {
            headers: { Authorization: `Bearer ${loginDetails.access}` },
          }
        );
        localStorage.removeItem("loginDetails");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <ul className="dropdown__item">
      <li>
        <Link to="/blogpost">Post</Link>
      </li>
      <li>
        <Link to="/signUp">SignUp</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>

      <li onClick={logOut}>LogOut</li>
    </ul>
  );
};

export default DropDown;
