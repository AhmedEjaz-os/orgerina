import React from 'react'

function SectionTwo({heading, description}) {
  return (
    <div className='SectionTwoOrganizer d-flex flex-column justify-content-center align-items-center'>
        <h3 className='text-center text-white text-uppercase'>{heading}</h3>
        <p className='text-center text-white pt-4 w-75'>{description}</p>
    </div>
  )
}

export default SectionTwo