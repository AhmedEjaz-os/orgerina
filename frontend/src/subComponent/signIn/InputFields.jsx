import React from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';

function InputFields({ showPassword, handleClickShowPassword, setErrorForWrongPassword }) {
  const navigate = useNavigate();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignInSubmit = async(e) => {
      e.preventDefault();
      let payload = {
        email: e.target[0].value,
        password: e.target[1].value,
      }
      axios.post('http://localhost:5000/signIn/', payload, {
        withCredentials: true
      })
      .then((response) => {
        const {name, neech} = response.data?.documentFromDb;
        localStorage.setItem('userLoginTrack', JSON.stringify({
          __isLoggedIn: true,
          name,
          neech
        }));
        if(neech === 'Organizer'){
          navigate("/dashboard/organizer");
        }
        else if(neech === 'Arena Owner'){
          navigate("/dashboard/owner");
        }
        else if(neech === "Participant"){
          navigate("/dashboard/participant");
        }
      })
      .catch((err) => {
        setErrorForWrongPassword(err.response?.data.error);
      });
    }
  return (
    <form onSubmit={handleSignInSubmit} >
        <input type="text" className="form-control mt-3 p-3" id="exampleFormControlInput1" placeholder="EMAIL" />
        <div className='mt-3 passwordInput'>
            <input type={`${showPassword ? 'text': 'password'}`} className="form-control mt-3 p-3" id="exampleFormControlInput2" placeholder="PASSWORD" />
            <IconButton
            sx={{
              color: "#000 !important"
            }}
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            className='togglePassword'
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </div>
        <div className='d-flex'>
          <button className='button mt-3 me-3' type='submit' >SIGN IN</button>
          <NavLink to='/register' className='button mt-3 text-decoration-none'>Create Account</NavLink>
        </div>
    </form>
  )
}

export default InputFields