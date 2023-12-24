import Image from 'next/image'
import React from 'react'
import { useFormik } from "formik";
import { FaHome } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { passwordSchema } from './passwordSchema';
import Myphotos from "@/pages/imagess/admin.png"
import Title from '../components/Navbar/Title';
import Link from 'next/link';
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
function Password({ user }) {

    const onSubmit = async (values, actions) => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/User/${user._id}`,
          values
        );
        actions.resetForm();
      } catch (err) {
        console.log(err);
      }
      };

      const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        
        password: "",
        confirmPassword: "",
        
      },
      onSubmit,
      validationSchema: passwordSchema,
    });
    const { push } = useRouter();
    const handleSignOut = () => {
      if (confirm("Oturumu kapatmak istediğinizden emin misiniz?")) {
        signOut({ redirect: false });
        push("/components/Auth/login");
      }
    };
  return (
    <div className='flex profileResponsive'>
        <div className='border w-[400px] h-[457px]   justify-center ml-20 profileResponsive1'>
        <div className='flex flex-col items-center'>
            <Image className='ImageResponsiveProfileAdmin rounded-[100%] mt-5' src={Myphotos} alt='' width={150}/>
            <h2 className='font-bold text-[30px] mb-5'>ali veli</h2>
        </div>
        <hr  />
        <div className='flex flex-col items-start '>
            
            <div className='hover:bg-yellowMe w-full '>
            <Link href="/components/Auth/login">
            <button className=' flex py-3 items-center text-[20px]'> <FaHome className='mx-3' />  Hesap</button>
            </Link>
            <hr  />
            </div>

            <div className='hover:bg-yellowMe w-full bg-yellowMe'>
            <button className=' flex py-3 items-center text-[20px]'> <RiLockPasswordFill className='mx-3'/>Şifre</button>
            <hr  />
            </div>

            <div className='hover:bg-yellowMe w-full '>
              <Link href="/Profile/Orders">
            <button className=' flex py-3 items-center text-[20px]'> <BiSolidShoppingBags className='mx-3'/> Siparişler</button>
            </Link>
            <hr  />
            </div>
           
            <div className='hover:bg-yellowMe w-full  ' onClick={handleSignOut}>
            <button className=' flex py-3 items-center text-[20px]'> <IoLogOut className='mx-3'/> Çıkış Yap</button>
            </div>
        </div>
        </div>
        <div className='ml-20 responsiveTabPassword'>
            <div>
                <Title searchClasname="text-black font-bold text-[40px] my-10">Şifre Ayarı</Title>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='grid grid-rows-1 grid-flow-col gap-8 w-full profileResponsiveInputPasword'>

                <div className=''>
                    <label className='flex flex-col text-[18px]  ' > Şifre
                <input 
                name='password'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput' 
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                 
                />
                {errors.password && touched.password && <div className='text-red-500 mt-2 ml-2'>{errors.password}</div>}
                </label>
                </div>


                <div>
                <label className='flex flex-col text-[18px]  ' > Şifre Tekrarı
                <input 
                name='confirmPassword'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}/>
                {errors.confirmPassword && touched.confirmPassword && <div className='text-red-500 mt-2 ml-2'>{errors.confirmPassword}</div>}
                </label>
                </div>
            
          
            </div>
            <button 
            className='  hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] mt-10 w-[150px]'
            > Güncelle</button>
            </form>
        </div>
    </div>
  )
}

export default Password