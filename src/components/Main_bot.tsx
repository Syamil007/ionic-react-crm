import React from 'react'
import Main_bot_route from './Main_bot_route'

function Main_bot() {
  return (
    <div className='mb'>
          {/* left side */}
          <div className='mb-1'>
                <div className='box1'></div>
                <div className='box2'></div>
                <div className='box3'></div>
                <div className='box4'></div>
          </div>
          {/* right side */}
          <div className='mb-2'>
                <Main_bot_route/>
          </div>
    </div>
  )
}

export default Main_bot