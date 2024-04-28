import React from 'react'
import videoBg from './Background2.mp4'

const Video = () => {
  return (
    <div>
        <video src={videoBg} autoPlay loop muted />
    </div>
  )
}

export default Video