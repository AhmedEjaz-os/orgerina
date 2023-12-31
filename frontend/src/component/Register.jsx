import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../assets/css/signIn.scss';
import '../assets/css/homePage.scss';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [checkIfPasswordMatches, setIfPasswordMatches] = useState(false);
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
    axios.post('http://localhost:5000/signIn/createUser', payload)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
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
                  <option>ORGANIZER</option>
                  <option>Arena Owner</option>
                  <option>Participant</option>
                  <option>Other</option>
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