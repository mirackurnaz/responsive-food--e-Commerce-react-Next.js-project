import React from 'react'
import Title from '../Navbar/Title'
import axios from 'axios';
import { useFormik } from 'formik';
import { SchemaAdmin } from './ValidationsAdmin';
import Link from 'next/link';

import { toast } from "react-toastify";
import { useRouter } from "next/router";

function AdminLogin() {
    
  const { push } = useRouter(); //giriş yapıldı ise sayfa yönlendirmesi yapmak için gerekli

    const onSubmit=async(values,actions)=>{
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin`,
          values
        );
        if (res.status === 200) {
          console.log(res.data);
          actions.resetForm();       //inputları boşalt submit olunca
          toast.success("Yönetici Girişi Başarılı!"); //olumlu ise mesaj ver sağ üstten
          push("/admin/adminProduct");        //herşey doğru ise admin panel sayfasına yönlendir
        }
      } catch (err) {
        console.log(err);
      }
      
      }
    const {errors,touched,handleBlur,handleSubmit,handleChange,values} = useFormik({
        initialValues: {
          username: '',
          password:"",
          
        },
        
        onSubmit,
        validationSchema:SchemaAdmin,
        
      });
  return (
    <div className='mt-[10%]  loginAdminResponsive'>
        <div className='flex justify-center'>
        <Title searchClasname="font-bold text-[50px]">Yönetici<span className='text-yellowMe mx-2'>/</span></Title>
        <Link href="/components/Auth/login" className='hover:text-yellowMe'>
        <Title searchClasname="font-bold text-[50px]">Giriş Yap</Title>
        </Link>
        </div>
        <div className='flex justify-center '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6' >
            
            <label >
              <input 
              type="text" 
              name='username'
              className=   
                {`border  rounded-md  h-[50px] w-[580px]
                ${errors.username ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              placeholder='Kullanıcı adınız*'
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
              
              />
          {errors.username && touched.username && <div className='text-red-500 mt-2 ml-2'>{errors.username}</div>}
            </label>
            <label >
              <input 
              type="password" 
              name='password'
              className=   
                {`border  rounded-md  h-[50px] w-[580px]
                ${errors.password ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              placeholder='Şifreniz*'
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              
              />
          {errors.password && touched.password && <div className='text-red-500 mt-2 ml-2'>{errors.password}</div>}
            </label>
            <button type='submit' 
            className=' w-full hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] mt-0'
            >Giriş Yap</button>
            
                <Link href="/">
                <span className='underline opacity-75'>
                Ana Sayfa
                </span>
                </Link>
               
            </form>
            

        </div>
    </div>
  )
}

export const getServerSideProps = (ctx) => {  //eğer benim cookie açıksa ve bir kullanıcının admin paneline girmesini bu kodlarla engelliyoruz
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/adminProduct",  //bekleme süresini kaldırır direkt geçiş yaparız ve çıkış yapmadığın sürece açık kalır
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

 


export default AdminLogin