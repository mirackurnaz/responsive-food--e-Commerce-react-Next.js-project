import Image from 'next/image'
import React from 'react'
import AboutImg from "../Navbar/images/aboutİmg.png"
import Title from '../Navbar/Title'
function About() {
  return (
    
    <div className='bg-darkMe py-[66px] mt-2 aboutResponsive '>
        <div className='container mx-auto flex items-center aboutResponsive3'>
        <div className='relative w-[445px] h-[600px] aboutResponsive1' > 
        <Image 
        src={AboutImg} 
        className='' 
        layout='fill'
        alt=''
        />
        </div>
        <div className='  max-w-[50%] text-[20px]   relative w-[100%] pr-[15px] pl-[150px] aax' >
        <Title searchClasname="text-white font-bold text-[40px] aboutResponsive2">Görevlerimiz </Title>
        <p  className='text-white mt-5 aboutResponsive2'>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dnt look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there  anything embarrassing hidden in the middle of text. All
        </p>
        <button className='buttonHeaders mt-5 w-[180px]'>Devamını Oku</button>
        </div>
    </div>
    </div>
  )
}

export default About