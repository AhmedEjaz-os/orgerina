import React from 'react'
import { NavLink } from "react-router-dom";
function SectionOneHomePage() {
    const buttons = [
        {
            name: 'Organizer',
            path: '/sign-in'
        },
        {
            name: 'Arena Owner',
            path: '/sign-in'
        },
        {
            name: 'Participant',
            path: '/sign-in'
        },
        {
            name: 'Live Stream',
            path: '/sign-in'
        },
    ]
  return (
    <div className="section1 d-flex flex-column justify-content-center" id='registerSection'>
        <h2 className='text-center text-white'>
            Quick Access
        </h2>
        <div className='d-flex align-items-center flex-wrap justify-content-center'>
            {
                buttons.map(({name, path}, index) => (
                    <NavLink to={path} className={index === 0 ? 'text-decoration-none mt-3' : 'text-decoration-none ms-3 mt-3'} key={index}>
                        {name}
                    </NavLink>
                ))
            }
            
        </div>
    </div>
  )
}

export default SectionOneHomePage