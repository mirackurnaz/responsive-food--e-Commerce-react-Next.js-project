import React from 'react'
import Title from '../Navbar/Title'
import { useFormik  } from 'formik';
import {Schema} from "./Validations"
function BookATable() {
  const onSubmit=async(values,actions)=>{
    await new Promise ((resolve)=>setTimeout(resolve,3000))
    actions.resetForm();                     //form submit olunca 4sn sonra inputların içini boşalt,values de ise değerlerimiz tutuluyor
  }
  const {errors,touched,handleBlur,handleSubmit,handleChange,values} = useFormik({
    initialValues: {
      firstName: '',
      numberPhone: "",
      email: '',
      person:"",
      date:""
    },
    
    onSubmit,
    validationSchema:Schema,
    
  });
  
  return (
    <div className='bookAtableResponsive2'>
        <div className='mt-[50px] ml-[280px] bookAtableResponsive '>
        <Title searchClasname="font-bold text-[50px] bookAtableResponsive1">Rezervasyon</Title>
        </div>
        <div className='flex justify-center gap-20 bookAtableResponsive3 items-center my-12'>
        <div>
        
          <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-6 bookAtableResponsiveForm'  >
            
          <label >
            <input 
            type="text" 
            name='firstName'
            className=   
              {`border  rounded-md  h-[50px] w-[580px] bookAtableResponsiveInput
              ${errors.firstName ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
            placeholder='İsim ve soyisiminizi giriniz*'
            onChange={handleChange}
            value={values.firstName}
            onBlur={handleBlur}
            
            />
        {errors.firstName && touched.firstName && <div className='text-red-500 mt-2 ml-2'>{errors.firstName}</div>}
          </label>
          
          <label >
            <input type="number"
            name='numberPhone'
            className=   
            {`border  rounded-md  h-[50px] w-[580px] bookAtableResponsiveInput
            ${errors.numberPhone ? "border-red-500 İnputtErrors " :"border-yellowMe İnputt"}`}
              
             placeholder='Telefon numaranızı giriniz*'
             onChange={handleChange}
             value={values.numberPhone}
             onBlur={handleBlur} />
         {errors.numberPhone && touched.numberPhone && <div className='text-red-500 mt-2 ml-2'>{errors.numberPhone}</div>}
          </label>
         
          <label >
            <input 
            type="email" 
            name='email'
            className=   
            {`border  rounded-md  h-[50px] w-[580px] bookAtableResponsiveInput
            ${errors.email ? "border-red-500 İnputtErrors" :"border-yellowMe İnputt"}`}
            required 
            placeholder='Email giriniz*'
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}/>
         {errors.email && touched.email && <div className='text-red-500 mt-2 ml-2'>{errors.email}</div>}
          </label>
         
          <label >
            <input 
            type="text" 
            name='person'
            className=   
            {`border  rounded-md  h-[50px] w-[580px] bookAtableResponsiveInput
            ${errors.person ? "border-red-500 İnputtErrors" :"border-yellowMe İnputt"}`}
            required 
            placeholder='Kaç kişi*'
            onChange={handleChange}
            value={values.person}
            onBlur={handleBlur} />
        {errors.person && touched.person && <div className='text-red-500 mt-2 ml-2'>{errors.person}</div>}
          </label>
          
          <label >
            <input 
            type="date" 
            name='date'
            className=   
            {`border  rounded-md  h-[50px] w-[580px] bookAtableResponsiveInput
            ${errors.date ? "border-red-500 İnputtErrors" :"border-yellowMe İnputt"}`} 
            required 
            placeholder=''
            onChange={handleChange}
            value={values.date}
            onBlur={handleBlur}/>
        {errors.date && touched.date && <div className='text-red-500 mt-2 ml-2'>{errors.date}</div>}
          </label>
          
          <button 
          className='buttonHeaders border w-[150px]'
          type='submit'> Rezervasyon Yap</button>
          
          </form>
          
        </div>
          <div className='bookAtableResponsiveMap '>
          <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12038.52108764022!2d29.091060266454882!3d41.0333441777445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8f76d1706ed%3A0xd630fb5e3d1e2cf8!2zw5xtcmFuaXllLCBFbG1hbMSxa2VudCwgMzQ3NjQgw5xtcmFuaXllL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1701502062989!5m2!1str!2str" 
          width=""  height="" className="border-0 w-[600px] h-[450px] bookAtableResponsiveMap"  loading="lazy"  ></iframe>
          </div>
          <div>

          </div>
        </div>
    </div>
  )
}

export default BookATable