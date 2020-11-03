import React from 'react'
import gm from '../img/General_Motors_logo.png'
import sig from '../img/General-Motors-Signature.png'

export default function SimpleTabs() {
  return (
    <React.Fragment>
      <div>
        <p>
          <img
            src={gm}
            height="100px"
            width="100px"
            alt="General Motors logo"
          />
          <img
            src={sig}
            height="50px"
            alt="General Motors"
          />
        </p>
      </div>
    </React.Fragment>
  )
}
