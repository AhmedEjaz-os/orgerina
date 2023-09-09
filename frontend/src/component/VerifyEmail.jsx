import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../assets/css/verify-email.scss";
import axios from "axios";
import { environment } from "../subComponent/enviroments/developement.enviroment";
import { prodEnvironment } from "../subComponent/enviroments/production.environment";

function VerifyEmail() {
  const navigate = useNavigate();
  let [payloadForResendEmail, setPayloadForResendEmail] = useState();
  const [error, setError] = useState("");
  const localStorageItems = JSON.parse(localStorage.getItem("userLoginTrack"));

  useEffect(() => {
    if (localStorageItems?.__isVerifiedEmail) {
      if (localStorageItems?.neech === "Organizer") {
        navigate("/dashboard/organizer");
      } else if (localStorageItems?.neech === "Arena Owner") {
        navigate("/dashboard/owner");
      } else if (localStorageItems?.neech === "Participant") {
        navigate("/dashboard/participant");
      }
    } else {
      const payload = {
        email: localStorageItems.email,
      };
      axios
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? environment.BACKEND_API_URL
              : prodEnvironment.BACKEND_API_URL
          }/dashboard/getUserData`,
          payload,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // eslint-disable-next-line
          setPayloadForResendEmail({
            ...res.data,
            __isVerifiedEmail: localStorageItems?.__isVerifiedEmail,
          });
        })
        .catch((err) => {});
    }
    // eslint-disable-next-line
  }, []);

  const handleResendEmail = async () => {
    await axios
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? environment.BACKEND_API_URL
            : prodEnvironment.BACKEND_API_URL
        }/signIn/resend-verification-email`,
        payloadForResendEmail,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setError(res.data.message);
        if (res.data.message === "Email Already Verified!!!") {
          setTimeout(() => {
            navigate("/sign-in");
          }, 5000);
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="verify-email">
      <div className="verify-email__box">
        <h1 className="verify-email__box-heading">Email not verified yet!!!</h1>
        <p className="verify-email__box-description">
          Please check your email and verify to access your account
        </p>
        <button
          className="verify-email__box-resend"
          onClick={handleResendEmail}
        >
          Resend Email
        </button>
        <div
          className={
            error
              ? error === "Email Already Verified!!!"
                ? "mt-3 d-flex badge bg-danger p-3 text-white text-uppercase flex-row-reverse align-items-center"
                : "mt-3 d-flex badge bg-success p-3 text-white text-uppercase flex-row-reverse align-items-center"
              : "d-none"
          }
          style={{ justifyContent: "start" }}
        >
          {error}
          <ErrorOutlineIcon
            className={
              error === "Email Already Verified!!!"
                ? "errorIcon h-100 pl-3 me-2 d-block"
                : "d-none"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
