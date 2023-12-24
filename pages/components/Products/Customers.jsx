import React from 'react'
import Title from '../Navbar/Title'
import Image from 'next/image'
import Slider from "react-slick";
import Client1 from "../../imagess/client1.jpg"
import Client2 from "../../imagess/client2.jpg"
function Customers() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,       //iconları kaldırma
        autoplay:true,          //otomatik ilerleme
        autoplaySpeed:4000,         //otomatik ilerleme hızı
       
      };
  return (
    <div className='my-[150px] customerResponsive'>
        <div className='flex justify-center'>
            <Title searchClasname="font-bold text-[50px] mt-20">Müşterilerimizin Yorumları</Title>
        </div>
       
        <Slider {...settings}>
   
   <div>
   <div className='flex justify-center my-20 gap-20 customerResponsive2'>

<div className='bg-darkMe text-white w-[30%] p-8 customerResponsive1'>
<div className='flex gap-6'>
<div className='bg-yellowMe w-[100px] rounded-[100%]  '>
<Image src={Client1} className='rounded-[100%] p-2' alt='' />
</div>
<div> 
<p className='mt-5 text-yellowMe'>Ayşe FATMA</p>
<p>asdfg@gmail.com</p>
</div>
</div>
<p className='mt-[10px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, aliquam dolor. Illum adipisci atque perferendis blanditiis quasi minima, veritatis architecto asperiores magnam error esse amet expedita laudantium reiciendis eos tempore? </p>

</div>

<div className='bg-darkMe text-white w-[30%] p-8  customerResponsive1'>
<div className='flex gap-6'>
<div className='bg-yellowMe w-[100px] rounded-[100%]  '>
<Image src={Client2} className='rounded-[100%] p-2' alt='' />
</div>
<div> 
<p className='mt-5 text-yellowMe'>Miraç KURNAZ</p>
<p>asdfg@gmail.com</p>
</div>
</div>
<p className='mt-[10px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, aliquam dolor. Illum adipisci atque perferendis blanditiis quasi minima, veritatis architecto asperiores magnam error esse amet expedita laudantium reiciendis eos tempore? </p>

</div>






</div>
   </div>
        
        </Slider>
    </div>
  )
}

export default Customers