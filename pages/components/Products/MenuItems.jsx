import Image from 'next/image'
import React from 'react'
import Imagess from "../Navbar/images/burger.png"
import { MdAddShoppingCart } from "react-icons/md";
import Link from 'next/link';
function MenuItems({ product }) {
  return (
    <Link href={`/productDetails/${product._id}`}>
    <div className='border rounded-[4px]  bg-darkMe h-[430px] '  >
        <div className='w-full  ImageMenu  bg-gray-100 flex  justify-center'>
        <div className='relative  z-40  h-[200px] items-center flex'>
            <Image 
            className='imageMenuItem ' 
            src={product.img} 
            alt=''
            priority 
            sizes='10'
            width={160}
            height={160}
            />
        </div>
        </div>


            <div className='mt-[20px] text-white ml-[10px] h-[180px] flex flex-col gap-4 ' >
            <h4 className="text-xl font-semibold">{product.title}</h4>
        <p className="text-[15px] text-white ml-[10px]">{product.desc}</p>
            <div className="flex justify-between items-center mt-4">
            
                <p  className='text-white ml-[10px]'>
                {product.prices[0]} TL
                </p>
                    <button  className="ButtonCardMenu bg-yellowMe  !w-10 mr-[10px] !h-10 !rounded-full !p-0 grid place-content-center">
                    <MdAddShoppingCart />

                    </button>
            
            </div>
           
            </div>
        
        <div>

        </div>
    </div>
    </Link>
  )
}

export default MenuItems