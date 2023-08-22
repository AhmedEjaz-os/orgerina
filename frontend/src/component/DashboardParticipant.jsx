import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../subComponent/organizerDashboard/Navbar'

function DashboardParticipant() {
  const navigate = useNavigate();
  const localStorageItems = JSON.parse(localStorage.getItem('userLoginTrack'));
  useEffect(() => {
    if(localStorageItems?.neech === 'Organizer'){
      navigate("/dashboard/organizer");
    } else if(localStorageItems?.neech === 'Arena Owner'){
      navigate("/dashboard/owner");
    } else if(localStorageItems?.neech === "Participant"){
      navigate("/dashboard/participant");
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