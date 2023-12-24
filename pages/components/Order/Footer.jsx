import Image from 'next/image'
import React from 'react'
import Logoo from "../../../public/mk.svg"
import { useRouter } from 'next/router';

function Footer() {
    const router=useRouter()
  return (
    <div className={`${router.asPath === "/" || router.asPath === "/linkPages/menu" ? "" :"fixed w-full bottom-0" } footerResponsive `}> 
    {/* ana sayfa ve menu sayfasında isen clasNameyi değişme ana sayfada değilsen footorı hep alta al sayfanın */}
        
      
<footer className="bg-white rounded-lg shadow dark:bg-darkMe m-4 footerResponsive ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Image src={Logoo} className="h-8 w-[50px]" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Miraç Kurnaz</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                
                    <li type="button" className="hover:underline me-4 md:me-6">Hakkımızda</li>
               
                <li>
                    <a href="" className="hover:underline me-4 md:me-6">Gizlilik Politikası</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Lisansımız</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">İletişim</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">MiraçKurnaz™</a>. Her hakkı saklıdır.</span>
    </div>
</footer>


    </div>
  )
}

export default Footer
