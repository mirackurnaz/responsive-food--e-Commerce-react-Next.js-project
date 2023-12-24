import Image from 'next/image'
import React from 'react'
import { useFormik } from "formik";
import { FaHome } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { profileSchema } from '../profileSchema';
import Myphotos from "@/pages/imagess/admin.png"
import Title from '@/pages/components/Navbar/Title';
import Link from 'next/link';
import { signOut,useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile({user}) {

 const{data:session}=useSession()
  const { push } = useRouter();
  
  

  const handleSignOut = () => {
    if (confirm("Oturumu kapatmak istediğinizden emin misiniz?")) {
      signOut({ redirect: false });
      push("/components/Auth/login");
    }
  };
  
  useEffect(() => {
    if(!session){
      push("/components/Auth/login");
    }
    
  }, [session, push]);



    const onSubmit = async (values, actions) => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/User/${user._id}`,
          values
        );
      } catch (err) {
        console.log(err);
      }
        actions.resetForm();
      };

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        address: user?.address,
        job: user?.job,
        bio: user?.bio,
      },
      onSubmit,
      validationSchema: profileSchema,
    });
   
  return (
    <div className='flex profileResponsive'>
        <div className='border w-[400px] h-[457px]   justify-center ml-20 profileResponsive1'>
        <div className='flex flex-col items-center'>
            <Image className='ImageResponsiveProfileAdmin rounded-[100%] mt-5' src={user.image ? user.image : Myphotos} alt='' width={150}/>
            <h2 className='font-bold text-[30px] mb-5'>{user.fullName}</h2>
        </div>
        <hr  />
        <div className='flex flex-col items-start '>
            
            <div className='hover:bg-yellowMe w-full cursor-pointer bg-yellowMe'>
            
            <button className=' flex py-3 items-center text-[20px]'> <FaHome className='mx-3' />  Hesap</button>
            
            <hr  />
            </div>
        
            <div className='hover:bg-yellowMe w-full  cursor-pointer'>
            <Link href="/linkPages/passwordProfile">
            <button className=' flex py-3 items-center text-[20px]'> <RiLockPasswordFill className='mx-3'/>Şifre</button>
            </Link>
            
            <hr  />
            </div>
            <div className='hover:bg-yellowMe w-full cursor-pointer'
            >
            <Link href="/Profile/Orders">
            <button className=' flex py-3 items-center text-[20px]'> <BiSolidShoppingBags className='mx-3'/> Siparişler</button>
            </Link>
            <hr  />
            </div>
           
            <div className='hover:bg-yellowMe w-full  cursor-pointer' onClick={handleSignOut}>
            <button type='button' className=' flex py-3 items-center text-[20px]'> <IoLogOut className='mx-3'/> Çıkış Yap</button>
            </div>
        </div>
        </div>
        <div className='ml-20 profileResponsive profileResponsiveTab'>
            <div>
                <Title searchClasname="text-black font-bold text-[40px] my-10 profileResponsiveTab1">Hesap Ayarı</Title>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='grid grid-rows-3 grid-flow-col gap-8 w-full profileFormResponsive'>

                <div className=''>
                    <label className='flex flex-col text-[18px]  ' > İsim Soyisim
                <input 
                name='fullName'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput' 
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                 
                />
                {errors.fullName && touched.fullName && <div className='text-red-500 mt-2 ml-2'>{errors.fullName}</div>}
                </label>
                </div>


                <div>
                <label className='flex flex-col text-[18px]  ' > Telefon numaran
                <input 
                name='phoneNumber'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput'
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}/>
                {errors.phoneNumber && touched.phoneNumber && <div className='text-red-500 mt-2 ml-2'>{errors.phoneNumber}</div>}
                </label>
                </div>


                <div>
                <label className='flex flex-col text-[18px]  ' > İşin
                <input 
                name='job'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput'
                value={values.job}
                onChange={handleChange}
                onBlur={handleBlur}/>
                {errors.job && touched.job && <div className='text-red-500 mt-2 ml-2'>{errors.job}</div>}
                </label>
                </div>


                <div>
                <label className='flex flex-col text-[18px]  ' > Email Adresin
                <input 
                name='email'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput' 
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}/>
                {errors.email && touched.email && <div className='text-red-500 mt-2 ml-2'>{errors.email}</div>}
                </label>
                </div>


                <div>
                <label className='flex flex-col text-[18px]  ' >Adres Bilgilerin
                <input
                name='address'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput'
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}/>
                {errors.address && touched.address && <div className='text-red-500 mt-2 ml-2'>{errors.address}</div>}
                </label>
                </div>


                <div>
                <label className='flex flex-col text-[18px]  ' > Açıklama
                <input 
                name='bio'
                type="text" 
                className='border w-[550px] border-yellowMe profileResponsiveInput'
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}/>
                {errors.bio && touched.bio && <div className='text-red-500 mt-2 ml-2'>{errors.bio}</div>}
                </label>
                </div>
            
          
            </div>
            <button type='submit'
             className='  hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] mt-10 w-[150px]'
             > Güncelle</button>
            </form>
        </div>
    </div>
  )
}

export async function getServerSideProps({ req , params}) {  //hızlı geçişler ver girilmişse logout olmamışsa giriş yap sayfasına yönlendirmeyi engelleme


  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/User/${params.id}`
  );

  return {
    props: {
      user:user?user.data:null
    },
  };
}


export default Profile