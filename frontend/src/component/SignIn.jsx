import React, { useEffect, useState } from 'react'
import "../assets/css/signIn.scss";
import "../assets/css/homePage.scss";
import InputFields from '../subComponent/signIn/InputFields';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
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
    <div className='d-flex flex-row justify-content-center align-items-center signIn'>
        <div className='w-50 signIn-left'>
            <img src={process.env.PUBLIC_URL + '/assets/images/signin/background.jpg'} alt="sign in page background" className='w-100' />
        </div>
        <div className='w-50 signIn-right ms-5 d-flex justify-content-center flex-column pe-5'>
            <h2>SIGN IN</h2>
            <div className={error ? 'd-flex badge bg-danger p-3 text-white text-uppercase flex-row-reverse align-items-center' : 'd-none'} style={{justifyContent: "start"}}>
              {error}
              <ErrorOutlineIcon className={error ? "errorIcon h-100 pl-3 me-2 d-block" : "d-none"} />
            </div>
            <InputFields showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} setErrorForWrongPassword={setError} />
        </div>  
    </div>
  )
}

export default SignIn