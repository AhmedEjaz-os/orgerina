import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Cookies from "js-cookie";
import axios from "axios";
import { environment } from "../subComponent/enviroments/developement.enviroment";
import { prodEnvironment } from "../subComponent/enviroments/production.environment";

function ForgetPassword() {
  const navigate = useNavigate();
  const localStorageItems = JSON.parse(localStorage.getItem("userLoginTrack"));
  const cookieVal = Cookies.get("ACCESS_TOKEN");
  useEffect(() => {
    if (!cookieVal) {
      localStorage.setItem(
        "userLoginTrack",
        JSON.stringify({
          __isLoggedIn: false,
          email: "",
          name: "",
          neech: "",
        })
      );
    } else {
      if (localStorageItems?.neech === "Organizer") {
        navigate("/dashboard/organizer");
      } else if (localStorageItems?.neech === "Arena Owner") {
        navigate("/dashboard/owner");
      } else if (localStorageItems?.neech === "Participant") {
        navigate("/dashboard/participant");
      }
    }
    // eslint-disable-next-line
  }, []);

  const [error, setError] = useState("");
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    let payload = {
      email: e.target[0].value,
    };
    axios
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? environment.BACKEND_API_URL
            : prodEnvironment.BACKEND_API_URL
        }/signIn/forget-password`,
        payload
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center signIn register">
      <div className="w-50 signIn-left">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/signin/background.jpg"}
          alt="sign in page background"
          className="w-100"
        />
      </div>
      <div className="w-50 signIn-right ms-5 d-flex justify-content-center flex-column pe-5">
        <h2>Reset Password</h2>
        <div
          className={
            error
              ? "d-block badge bg-danger p-3 text-white text-uppercase"
              : "d-none"
          }
        >
          {error}
          <ErrorOutlineIcon
            className={error ? "errorIcon h-100 pl-3 d-block" : "d-none"}
          />
        </div>
        <form onSubmit={handleForgetPassword}>
          <input
            type="email"
            className="form-control mt-3 p-3"
            id="exampleFormControlInput2"
            placeholder="EMAIL"
          />
          <button className="button mt-3 me-3" type="submit">
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
