import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../assets/css/verify-email.scss";
import axios from 'axios';
import { environment } from '../subComponent/enviroments/developement.enviroment';
import { prodEnvironment } from '../subComponent/enviroments/production.environment';

function VerifyEmail() {
    const navigate = useNavigate();
    let [payloadForResendEmail, setPayloadForResendEmail] = useState();
    const localStorageItems = JSON.parse(localStorage.getItem('userLoginTrack'));
    const cookieVal = Cookies.get('ACCESS_TOKEN');

    useEffect(() => {
        if(localStorageItems?.__isVerifiedEmail){
            if(localStorageItems?.neech === 'Organizer'){
              navigate("/dashboard/organizer");
            } else if(localStorageItems?.neech === 'Arena Owner'){
              navigate("/dashboard/owner");
            } else if(localStorageItems?.neech === "Participant"){
              navigate("/dashboard/participant");
            }
        }
        else{
            const payload = {
                email: localStorageItems.email
            }
            axios.post(`${process.env.NODE_ENV === "development" ? environment.BACKEND_API_URL : prodEnvironment.BACKEND_API_URL}/dashboard/getUserData`, payload, {
                withCredentials: true
              })
              .then((res) => {
                // eslint-disable-next-line
                setPayloadForResendEmail(res.data);
              })
              .catch((err) => {}
            );
        }
        // eslint-disable-next-line
      }, []);
      console.log(payloadForResendEmail)
  return (
    <div className='verify-email'>
        <div className="verify-email__box">
            <h1 className='verify-email__box-heading'>Email not verified yet!!!</h1>
            <p className="verify-email__box-description">Please check your email and verify to access your account</p>
            <button className='verify-email__box-resend'>Resend Email</button>
        </div>
    </div>
  )
}

export default VerifyEmail;