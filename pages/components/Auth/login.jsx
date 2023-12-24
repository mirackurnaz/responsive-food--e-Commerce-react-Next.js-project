import { useEffect, useState } from "react";
import Title from '../Navbar/Title'
import axios from 'axios';
import { useFormik } from 'formik';
import { SchemaLogin } from './Validations';
import Link from 'next/link';
import { signIn, getSession,useSession   } from "next-auth/react"

import { useRouter } from "next/router";
function Login() {
  const [currentUser, setCurrentUser] = useState();
  const { data: session } = useSession();
  const { push } = useRouter(); //sayfa yönlendirmesi yapmak için kullancaz
  
    const onSubmit=async(values,actions)=>{
      const { email, password } = values;
      let options = { redirect: false, email, password };

      try {                                                  //hızlı geçişler ver girilmişse logout olmamışsa giriş yap sayfasına yönlendirmeyi engelleme
        const res = await signIn("credentials", options);
        actions.resetForm();
        
      } catch (err) {
        console.log(err);
      }
    }
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/User`);
          setCurrentUser(
            res.data?.find((user) => user.email === session?.user?.email)
          );
          session && push("/Profile/profile/" + currentUser?._id);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [session, push, currentUser]);

    
    const {errors,touched,handleBlur,handleSubmit,handleChange,values} = useFormik({
        initialValues: {
          email: '',
          password:"",
          
        },
        
        onSubmit,
        validationSchema:SchemaLogin,
        
      });
     
 
      
  return (
    <div className='mt-[10%] loginAdminResponsive '>
        <div className='flex justify-center'>
        <Title searchClasname="font-bold text-[50px] ">Giriş Yap <span className='text-yellowMe mx-2'>/</span></Title>
         
        <Link href="/components/Auth/adminLogin" className='hover:text-yellowMe'>
        <Title searchClasname="font-bold text-[50px]">Yönetici</Title>
        </Link>
        </div>
        <div className='flex justify-center '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6' >
            
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
            <button type='submit' 
           className=' w-full hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] mt-0'
           >

              Giriş Yap</button>
            
            <button  type='button'
            onClick={()=>signIn("github")}
            className=' w-full hover:bg-yellowMe hover:text-darkMe border hover:border-yellowMe transition-all text-white bg-darkMe md:inline-block  p-2 rounded-[1.3rem] mt-0'>
                Github</button>
                
                
                <Link href="/components/Auth/register">
                <span className='underline opacity-75'>
                Hesabınız yok mu?

                </span>
                </Link>
              
                
               
               
            </form>
            

        </div>
    </div>
  )
}
export async function getServerSideProps({ req }) { //hızlı geçişler ver girilmişse logout olmamışsa giriş yap sayfasına yönlendirmeyi engelleme
  const session = await getSession({ req });
  const res =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/User`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  console.log(user);
  if (session && user) {
    return {
      redirect: {
        destination: "/Profile/profile/" + user._id,
        permanent: false,
      },
    };
  }

  return {
    props: {},
    
  };
}

export default Login