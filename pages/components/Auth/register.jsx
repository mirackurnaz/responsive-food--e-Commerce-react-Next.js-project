import React from 'react'
import Title from '../Navbar/Title'
import axios from "axios";
import { useFormik } from 'formik';
import Link from 'next/link';
import { SchemaRegister } from './ValidationsRegister';
import { toast } from "react-toastify";

import { useRouter } from "next/router";


function Register() {

  const { push } = useRouter();

    const onSubmit=async(values,actions)=>{
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/User/register`,
          values
        );
        if (res.status === 200) {          //sayfa basarılı ise olumlu mesajı göster
          toast.success("Kullanıcı başarıyla oluşturuldu");
          push("/components/Auth/login");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message); //sayfa basarılı degil ise olumsuz mesajı göster
      }
          actions.resetForm();                     //form submit olunca 4sn sonra inputların içini boşalt,values de ise değerlerimiz tutuluyor
      }
    const {errors,touched,handleBlur,handleSubmit,handleChange,values} = useFormik({
        initialValues: {
          fullName:"",
          email: '',
          password:"",
          passwordConfirm:""
          
        },
        
        onSubmit,
        validationSchema:SchemaRegister
        
      });
     
  return (
    <div className='mt-[10%]  loginAdminResponsive'>
        <div className='flex justify-center'>
        <Title searchClasname="font-bold text-[50px]">Kayıt Ol</Title>
        </div>
        <div className='flex justify-center '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6' >
        <label >
              <input 
              type="text" 
              name='fullName'
              className=   
                {`border  rounded-md  h-[50px] w-[580px]
                ${errors.fullName ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              placeholder='İsim ve Soyisminizi giriniz*'
              onChange={handleChange}
              value={values.fullName}
              onBlur={handleBlur}
              
              />
          {errors.fullName && touched.fullName && <div className='text-red-500 mt-2 ml-2'>{errors.fullName}</div>}
            </label>  
            <label >
              <input 
              type="email" 
              name='email'
              className=   
                {`border  rounded-md  h-[50px] w-[580px]
                ${errors.email ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              placeholder='Email giriniz*'
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              
              />
          {errors.email && touched.email && <div className='text-red-500 mt-2 ml-2'>{errors.email}</div>}
            </label>
            <label >
              <input 
              type="password" 
              name='password'
              className=   
                {`border  rounded-md  h-[50px] w-[580px]
                ${errors.password ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              placeholder='Şifrenizi giriniz*'
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              
              />
          {errors.password && touched.password && <div className='text-red-500 mt-2 ml-2'>{errors.password}</div>}
            </label>
            <label >
              <input 
              type="password" 
              name='passwordConfirm'
              className=   
                {`border  rounded-md  h-[50px] w-[580px]
                ${errors.passwordConfirm ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              placeholder='Şifre tekrarını giriniz*'
              onChange={handleChange}
              value={values.passwordConfirm}
              onBlur={handleBlur}
              
              />
          {errors.passwordConfirm && touched.passwordConfirm && <div className='text-red-500 mt-2 ml-2'>{errors.passwordConfirm}</div>}
            </label>
            <button 
            className=' w-full hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] mt-0'
            type='submit'>Kayıt Ol</button>
            
                <Link href="/components/Auth/login">
                <span className='underline opacity-75'>
                Hesabın var mı?

                </span>
                </Link>
            </form>
            

        </div>
    </div>
  )
}

export default Register