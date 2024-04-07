import { AbsoluteCenter, Box, Image } from '@chakra-ui/react'
import React from 'react'
import loader from '../assets/img/logo2.png'

import {PropagateLoader, BarLoader} from 'react-spinners'
const Logo = () => {
  return (
      <div style={{width: "100%", textAlign:"center"}}>
            <div className='w-full flex justify-center'>
            <img src={loader} className='w-6/12 animate-pulse'/>
            </div>
            <div className='w-full flex justify-center mt-4'>
            <BarLoader
            color="#281308"
            speedMultiplier={1}
          />
            </div>
      </div>
  )
}

export default Logo