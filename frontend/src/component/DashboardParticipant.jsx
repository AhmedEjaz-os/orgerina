import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../subComponent/organizerDashboard/Navbar'
import Cookies from 'js-cookie';
import axios from 'axios';
import { environment } from '../subComponent/enviroments/developement.enviroment';
import { prodEnvironment } from '../subComponent/enviroments/production.environment';

function DashboardParticipant() {
  const navigate = useNavigate();
  const localStorageItems = JSON.parse(localStorage.getItem('userLoginTrack'));
  const cookieVal = Cookies.get('ACCESS_TOKEN');
  useEffect(() => {
    if(!cookieVal){
      localStorage.setItem('userLoginTrack', JSON.stringify({
        __isLoggedIn: false,
        email: '',
        name: '',
        neech: ''
      }));
      navigate('/sign-in');
    }
    else{
      if(localStorageItems?.__isVerifiedEmail){
        Cookies.remove('TEMP_TOKEN');
        if(localStorageItems?.neech === 'Organizer'){
          navigate("/dashboard/organizer");
        } else if(localStorageItems?.neech === 'Arena Owner'){
          navigate("/dashboard/owner");
        } else if(localStorageItems?.neech === "Participant"){
          navigate("/dashboard/participant");
        }
        const payload = {
          email: localStorageItems.email
        }
        axios.post(`${process.env.NODE_ENV === "development" ? environment.BACKEND_API_URL : prodEnvironment.BACKEND_API_URL}/dashboard/getUserData`, payload, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
      else{
        navigate("/verify-email");
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
       <Navbar />
    </div>
  )
}

export default DashboardParticipant