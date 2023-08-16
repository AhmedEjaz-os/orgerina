import React, { useState } from 'react'
import "../assets/css/signIn.scss";
import "../assets/css/homePage.scss";
import InputFields from '../subComponent/signIn/InputFields';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    
    const [passwordValidationMessage, setPasswordValidationMessage] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    

  return (
    <div className='d-flex flex-row justify-content-center align-items-center signIn'>
        <div className='w-50 signIn-left'>
            <img src={process.env.PUBLIC_URL + '/assets/images/signin/background.jpg'} alt="sign in page background" className='w-100' />
        </div>
        <div className='w-50 signIn-right ms-5 d-flex justify-content-center flex-column pe-5'>
            <h2>SIGN IN</h2>
            <InputFields showPassword={showPassword} passwordValidationMessage={passwordValidationMessage} handleClickShowPassword={handleClickShowPassword} setPasswordValidationMessage={setPasswordValidationMessage} />
        </div>  
    </div>
  )
}

export default SignIn