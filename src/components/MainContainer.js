import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
// import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='col-span-11'>
        <ButtonList/>
        <VideoContainer/>
        {/* <div>hello</div> */}
    </div>
  )
}

export default MainContainer