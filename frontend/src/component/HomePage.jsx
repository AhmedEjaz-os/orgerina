import React, { useEffect } from 'react';
import "../assets/css/homePage.scss";
import SectionOneHomePage from '../subComponent/homePage/SectionOneHomePage';
import SectionTwo from '../subComponent/homePage/SectionTwo';
import VerticalAlignTopTwoToneIcon from '@mui/icons-material/VerticalAlignTopTwoTone';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function HomePage() {
  const navigate = useNavigate();
  const localStorageItems = JSON.parse(localStorage.getItem('userLoginTrack'));
  const cookieVal = Cookies.get('ACCESS_TOKEN');
  useEffect(() => {
    if(!cookieVal){
      localStorage.setItem('userLoginTrack', JSON.stringify({
        __isLoggedIn: false,
        name: '',
        neech: ''
      }));
    }
    else {
      if(localStorageItems?.neech === 'Organizer'){
        navigate("/dashboard/organizer");
      } else if(localStorageItems?.neech === 'Arena Owner'){
        navigate("/dashboard/owner");
      } else if(localStorageItems?.neech === "Participant"){
        navigate("/dashboard/participant");
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='homePage'>
        <SectionOneHomePage />
        <SectionTwo heading={'Are you an organizer'} description={"Do you want to organize a competition and can't find a platform where you can convey your message to the world well you have come to the right place. We only Charge 6% fee on every Participant that participate in your competition. NO HIDDEN CHARGES. Here you can find arena owners. Deal with them in the platform securly and Stream your competitions on our twitch and youtube channels"} />
        <div className='section3'></div>
        <SectionTwo heading={'Are you an Arena Owner'} description={"Are you looking to rent your arena out display your arena with beautiful pictures to attract the orgnaizers. Our platform will securly manage your dealings with the Organizer. The Arenas will be rated according to their rating out of 5 stars. We will charge 3% of You every dealings with the organizer. NO HIDDEN CHARGES. Please follow the arena owner link"} />
        <div className='section5'></div>
        <SectionTwo heading={'Are you an Gamer'} description={"Are you looking to showcase your abilites and you want a source please check out our incoming competitions. Participate and Win Big POOLS. PUBG, TEKKEN, DOTA, OVERWATCH, VALORANT. Whatever your game is we provide you with all the information and upcoming competitions related to these games. JUST REGISTER FIND YOUR GAME, PARTICIPATE AND WIN."} />
        <div className='section7'>
          <a href="#registerSection" className='d-flex justify-content-center align-items-center text-decoration-none text-uppercase'><VerticalAlignTopTwoToneIcon /></a>
        </div>
    </div>
  )
}

export default HomePage