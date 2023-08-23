import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { environment } from '../subComponent/enviroments/developement.enviroment';
import { prodEnvironment } from '../subComponent/enviroments/production.environment';
import Navbar from '../subComponent/organizerDashboard/Navbar';

function DashboardOrganizer() {
  const navigate = useNavigate();
  const localStorageItems = JSON.parse(localStorage.getItem('userLoginTrack'));
  const cookieVal = Cookies.get('ACCESS_TOKEN');
  let getInformation;
  const getUser = async(payload) => {
    await axios.post(`${process.env.NODE_ENV === "development" ? environment.BACKEND_API_URL : prodEnvironment.BACKEND_API_URL}/dashboard/getUserData`, payload, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Error part is working: ' + err);
    });
  }
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
      getUser(payload)
      
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>       
      <Navbar />
    </div>
  )
}

export default DashboardOrganizer