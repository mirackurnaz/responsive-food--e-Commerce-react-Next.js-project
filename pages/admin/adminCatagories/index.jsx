import Image from 'next/image'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { CiViewList } from "react-icons/ci";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import AdminImages from "@/pages/imagess/admin.png"
import { toast } from "react-toastify";

import Link from 'next/link';
import Title from '@/pages/components/Navbar/Title';
function İndex() {

  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("")


  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleCreate = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      setCategories([...categories, res.data]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(categories.filter((cat) => cat._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { push } = useRouter();
  const handleSignOut = () => {
    if (confirm("Oturumu kapatmak istediğinizden emin misiniz?")) {
      signOut({ redirect: false });
      push("/components/Auth/login");
      toast.success("Yönetici Hesabı Kapatıldı!");
    }
  };
        
  return (
    <div className='flex profileResponsive'>
        <div className='border w-[400px] h-[456px]   justify-center ml-20 profileResponsive1'>
        <div className='flex flex-col items-center'>
            <Image 
            className='ImageResponsiveProfileAdmin rounded-[100%] mt-5' 
            src={AdminImages} alt='' width={150}
            />
            <h2 className='font-bold text-[30px] mb-5'>Yönetici</h2>
        </div>
        <hr  />
        <div className='flex flex-col items-start '>
        
            <div className='hover:bg-yellowMe w-full cursor-pointer '>
            <Link href="/admin/adminProduct">
            <button className=' flex py-3 items-center text-[20px]'> <GrArticle className='mx-3' /> Ürünler</button>
            </Link>
            <hr  />
            </div>
        
            <div className='hover:bg-yellowMe w-full  cursor-pointer'>
            <Link href="/admin/adminOrders">
            <button className=' flex py-3 items-center text-[20px]'> <BiSolidShoppingBags className='mx-3'/>Siparişler</button>
            </Link>
            
            <hr  />
            </div>
            <div className='hover:bg-yellowMe w-full cursor-pointer bg-yellowMe'>
            <Link href="/admin/adminCatagories">
            <button className=' flex py-3 items-center text-[20px]'> <CiViewList className='mx-3'/> Kategoriler</button>
            </Link>
            <hr  />
            </div>
           
            

            <div className='hover:bg-yellowMe w-full  cursor-pointer' onClick={handleSignOut}>
            <button className=' flex py-3 items-center text-[20px]'> <IoLogOut className='mx-3'/> Çıkış Yap</button>
            
            </div>
        </div>
        </div> 
        <div className='ml-20 responsiveProfileOrders1-2'>
            <div>
               <Title searchClasname="text-black font-bold text-[40px] my-10">Kategoriler</Title>
            </div>
            <div >
            <div className=''>

                <div className=' flex-1 items-center justify-center'>
                    
                <input 
                type="text" 
                className='border w-[100vh]  border-yellowMe mt-4 adminCategoryResponsiveInput' 
                placeholder='Yeni Bir Kategori Ekle
                '
                onChange={(e)=>setInputText(e.target.value)}
                value={inputText}
                 
                />
                
               <button 
              className='adminCategoryResponsiveButton ml-[28px] hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] mt-10 w-[150px]'

               onClick={handleCreate}
               > Ekle</button>
                </div>
              <div className='flex flex-col gap-5 mt-10'>

              {categories.map((category) => (
            <div className="flex justify-between mt-4 catagoryListResponsive" key={category._id}>
              <div className="text-xl">{category.title}</div>
              <button
                className=" adminCatagoryButton" 
                      //click(tıklanan) catagory nin içindeki index ile eşit ise sil
                onClick={(e) => handleDelete(e, category._id)}
              >
                Sil
              </button>
            </div>
          ))}
 
                
                
              </div>

                
            
          
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default İndex