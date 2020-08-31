import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'

export default props =>
  <div className='buttons fadein'>
    <div className='button'>
    <br></br>
      <input type='file' id='single' onChange={props.onChange} />
      <br></br>
    </div>
  </div>
