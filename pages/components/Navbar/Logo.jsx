import React from 'react'
import Logoo from "./images/logoo.png"
import Image from "next/image"; 
  
function Logo() {
  return (
    <div className='ml-[80px] logoResponsive'>
        <Image 
        src={Logoo} 
        height="100"
        width="300"
        alt=''/>

           

        </div>
  )
}

export default Logo