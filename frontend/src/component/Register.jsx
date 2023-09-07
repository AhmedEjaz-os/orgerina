import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '../assets/css/signIn.scss';
import '../assets/css/homePage.scss';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { environment } from '../subComponent/enviroments/developement.enviroment';
import { prodEnvironment } from '../subComponent/enviroments/production.environment';

function Register() {
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
  const [showPassword, setShowPassword] = useState(false);
  const [checkIfPasswordMatches, setIfPasswordMatches] = useState(false);
  const [error, setError] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let password, confirmPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleRegisterUser = async(e) => {
    e.preventDefault();
    let payload = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      neech: e.target[5].value
    }
    axios.post(`${process.env.NODE_ENV === "development" ? environment.BACKEND_API_URL : prodEnvironment.BACKEND_API_URL}/signIn/createUser`, payload, {
      withCredentials: true
    })
    .then((response) => {
      setError('');
      const {name, email, neech, __isVerifiedEmail} = response.data.data;
      console.log(name, email, neech, __isVerifiedEmail)
      if(__isVerifiedEmail){
        localStorage.setItem('userLoginTrack', JSON.stringify({
          __isLoggedIn: true,
          email,
          name,
          neech,
          __isVerifiedEmail
        }))
        if(response.data?.neech === 'Organizer'){
          window.location.href = "/dashboard/organizer";
        }
        else if(response.data?.neech === 'Arena Owner'){
          window.location.href = "/dashboard/owner";
        }
        else if(response.data?.neech === "Participant"){
          window.location.href = "/dashboard/participant";
        }
      }
      else{
        localStorage.setItem('userLoginTrack', JSON.stringify({
          __isLoggedIn: true,
          email,
          name,
          neech,
          __isVerifiedEmail
        }));
        Cookies.remove('ACCESS_TOKEN');
        window.location.href = "/verify-email"
      }
    })
    .catch((err) => {
      setError(err.response.data.error ? err.response.data?.error : err.response.data?.includes('"password" with value "password" fails to match the required pattern') ? "password must contain 8 characters, 1 uppercase, 1 lowercase, 1 special character ,and 1 number": err.response?.data);
    });
  }

  const getPasswordValue = (e) => {
    password = e.target.value;
    
  }
  const getConfirmPasswordValue = (e) => {
    confirmPassword = e.target.value
    if(!checkIfPasswordMatches){
      if(password === confirmPassword){
        setIfPasswordMatches(true)
      }
      else if(password !== confirmPassword){
        setIfPasswordMatches(false)
      }
    }
    else if(checkIfPasswordMatches){
      if(password !== confirmPassword){
        setIfPasswordMatches(false)
      }
      else if(password === confirmPassword){
        setIfPasswordMatches(true)
      }
    }
  }
  

  return (
    <div className='d-flex flex-row justify-content-center align-items-center signIn register'>
        <div className='w-50 signIn-left'>
            <img src={process.env.PUBLIC_URL + '/assets/images/signin/background.jpg'} alt="sign in page background" className='w-100' />
        </div>
        <div className='w-50 signIn-right ms-5 d-flex justify-content-center flex-column pe-5'>
            <h2>REGISTER ACCOUNT</h2>
            <div className={error ? 'd-block badge bg-danger p-3 text-white text-uppercase' : 'd-none'}>
              {error}
              <ErrorOutlineIcon className={error ? "errorIcon h-100 pl-3 d-block" : "d-none"} />
            </div>
            <form onSubmit={handleRegisterUser}>
              <input type="text" className="form-control mt-3 p-3" id="exampleFormControlInput1" placeholder="NAME" />
              <input type="email" className="form-control mt-3 p-3" id="exampleFormControlInput2" placeholder="EMAIL" />
              <div className='passwordInput'>
                <input type={`${showPassword ? 'text': 'password'}`} className="form-control mt-3 p-3" id="exampleFormControlInput3" onChange={getPasswordValue} placeholder="PASSWORD" />
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                className='togglePassword'
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <div className='passwordInput '>
                <input type={`${showPassword ? 'text': 'password'}`} className="form-control mt-3 p-3" id="exampleFormControlInput4" onChange={getConfirmPasswordValue} placeholder="CONFIRM PASSWORD" />
                <CancelIcon className={!checkIfPasswordMatches ? 'togglePassword passwordError d-block' : 'togglePassword passwordError d-none'} />
                <CheckCircleIcon className={checkIfPasswordMatches ? 'togglePassword passwordCorrection d-block' : 'togglePassword passwordCorrection d-none'} />
              </div>
              <div className='passwordInput '>
                <select className="form-control mt-3 p-3" id="exampleFormControlSelect5" >
                  <option>Organizer</option>
                  <option>Arena Owner</option>
                  <option>Participant</option>
                </select>
                <ArrowDropDownIcon className='togglePassword passwordError' />
              </div>
              <div className='d-flex'>
                {
                  checkIfPasswordMatches ? 
                  <button className='button mt-3 me-3' type='submit' >Create Account</button> :
                  <button className='button mt-3 me-3' type='submit' title="Make Sure all the fields are filled!" disabled>Create Account</button>
                }
              </div>
              
            </form>
        </div>  
    </div>
  )
}

export default Register