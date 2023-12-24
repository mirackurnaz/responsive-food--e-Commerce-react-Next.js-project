import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";
import CarouselImage from "../../imagess/hero-bg.jpg"
import Title from '../Navbar/Title';


function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,       //iconları kaldırma
        autoplay:true,          //otomatik ilerleme
        autoplaySpeed:4000,         //otomatik ilerleme hızı
        appenDots: (dots) => (            //appenDots,customPaging=>metotları ile carauselin altındaki noktaları oluşturmak için
            <div>
              <ul>{dots}</ul>
            </div>
          ),
          customPaging: (i) => (
            <div className="w-2 h-2  border bg-white rounded-full mt-10"></div>
          ),
      };
  
  return (
    <div className='h-screen w-full container mx-auto -mt-[88px]  ImageCarouselresponsive1'>
        <div className='absolute top-0 left-0 w-full h-full'> 
        <div className='relative h-[1050px] w-full ImageCarouselresponsive'>
        <Image 
        src={CarouselImage} 
        layout='fill'
        objectFit='cover'
        alt='' />
        
        </div>
        </div>
        <Slider {...settings}>
            <div>
            <div className='ml-[100px]  mt-48 text-white top-48 flex flex-col items-start '>
        <Title searchClasname="text-[48px] ">Miraç KURNAZ Restorant</Title>
        <p className='w-[600px] mt-[25px] '>
        Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente
          ad mollitia laborum quam quisquam esse error unde. Tempora ex
          doloremque, labore, sunt repellat dolore, iste magni quos nihil
          ducimus libero ipsam.
        </p>
        <button className='text-white buttonHeaders mt-[20px] w-[120px]'> Sipariş ver
        </button>
       </div>
       
            </div>
            <div>
            <div className='ml-[100px]  mt-48 text-white top-48 flex flex-col items-start'>
        <Title searchClasname="text-[48px]">Miraç KURNAZ Restaurant</Title>
        <p className='w-[600px] mt-[25px]'>
        Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente
          ad mollitia laborum quam quisquam esse error unde. Tempora ex
          doloremque, labore, sunt repellat dolore, iste magni quos nihil
          ducimus libero ipsam.
        </p>
        <button className='text-white buttonHeaders mt-[20px] w-[120px]'>Sipariş ver</button>
       </div>
       
            </div>
            <div>
            <div className='ml-[100px]  mt-48 text-white top-48 flex flex-col items-start'>
        <Title searchClasname="text-[48px]">Miraç KURNAZ Restaurant</Title>
        <p className='w-[600px] mt-[25px]'>
        Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente
          ad mollitia laborum quam quisquam esse error unde. Tempora ex
          doloremque, labore, sunt repellat dolore, iste magni quos nihil
          ducimus libero ipsam.
        </p>
        <button className='text-white buttonHeaders mt-[20px] w-[120px]'>Sipariş ver</button>
       </div>
       
            </div>
            
      
       </Slider>
    </div>
  )
}

export default Carousel