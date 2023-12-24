import Image from 'next/image'
import React ,{ useState,useEffect } from 'react'
  import { CiViewList } from "react-icons/ci";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import AdminImages from "@/pages/imagess/admin.png"
import Title from '@/pages/components/Navbar/Title';
import ImagesF1 from "@/pages/imagess/pizza1.png"
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from 'next/link';
import AddProduct from '../AddProduct';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
   
    TableContainer,
  } from '@chakra-ui/react'

function AdminProduct() {
  const [isProductModal, setIsProductModal] = useState(false);
  const { push } = useRouter();
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    try {
      if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Product Deleted!");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const closeAdminAccount = async () => {
    try {
      if (confirm("Yönetici Hesabınızı kapatmak istediğinizden emin misiniz?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/components/Auth/adminLogin");
          toast.success("Yönetici Hesabı Kapatıldı!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

 //const [adminProduct, setAdminProduct] = useState([])

  return (
    <div className='flex profileResponsive profileResponsive1-1-1'>
        <div className='border w-[400px] h-[456px]   justify-center ml-20 profileResponsive1 profileResponsive1-1'>
        <div className='flex flex-col items-center'>
            <Image className='ImageResponsiveProfileAdmin rounded-[100%] mt-5' src={AdminImages} alt='' width={150}/>
            <h2 className='font-bold text-[30px] mb-5'>Yönetici</h2>
        </div>
        <hr  />
        <div className='flex flex-col items-start '>
            
            <div className='hover:bg-yellowMe w-full cursor-pointer justify-between  flex  bg-yellowMe'>
            
            <div>
            <button className=' flex py-3 items-center text-[20px]'> <GrArticle className='mx-3' />  Ürünler</button>
            </div>
            
         <div>
         {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
         <button
        className="bg-white rounded-[10px] text-green-500 hover:bg-green-500 hover:text-white  !w-12 !h-10  !p-0 absolute ml-[90px] mt-2  text-4xl profileResponsiveAddButton tableResponsiveAddButton"
        onClick={() => setIsProductModal(true)}
      >
        +
      </button>
         </div>
            <hr  />
            </div>
        
            <div className='hover:bg-yellowMe w-full  cursor-pointer'>
            <Link href="/admin/adminOrders">
            <button className=' flex py-3 items-center text-[20px]'> <BiSolidShoppingBags className='mx-3'/>Siparişler</button>
            </Link>
            
            <hr  />
            </div>
            <div className='hover:bg-yellowMe w-full cursor-pointer'>
            <Link href="/admin/adminCatagories">
            <button className=' flex py-3 items-center text-[20px]'> <CiViewList className='mx-3'/> Kategoriler</button>
            </Link>
            <hr  />
            </div>
           
            

            <div className='hover:bg-yellowMe w-full  cursor-pointer' onClick={closeAdminAccount}>
            <button className=' flex py-3 items-center text-[20px]' type='button' > <IoLogOut className='mx-3'/> Çıkış Yap</button>
            
            </div>
        </div>
        </div>
        <div className='ml-20 responsiveProfileOrders1'>
            <div>
                <Title searchClasname="text-black font-bold text-[40px] ml-20 my-10">Ürünler</Title>
            </div>
            <div className='flex flex-col mx-20 w-[100vh] responsiveProfileOrders1 tableResponsive2' >

      <div className="overflow-auto max-h-[400px] w-full mt-5 responsiveProfileOrders4 tableResponsive1 ">
      <TableContainer className='responsiveProfileOrders2 w-full'>
  <Table variant='simple' className="tableResponsive text-sm text-center text-gray-500 min-w-[1000px] " >
    
    <Thead className=''>
      <Tr className='bg-darkMe  '>
        <Th>RESİM</Th>
        <Th>ID</Th>
        <Th>İSİM</Th>
        <Th>FİYAT</Th>
        <Th isNumeric>AKSİYON</Th>
      </Tr>
    </Thead>
    <Tbody className='bg-gray-600 text-white '>

    {products.length > 0 &&
              products.map((product) => (
                <Tr
                  className="transition-all   border-gray-700 hover:bg-yellowMe"
                  key={product._id}
                >
                  <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={70}
                      height={70}
                    />
                  </Td>
                  <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product._id.substring(0, 5)}...
                  </Td>
                  <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.title}
                  </Td>
                  <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                     {product.prices[0]} TL
                  </Td>
                  <Td isNumeric className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <button
                      className="bg-red-500 p-2 rounded-md hover:bg-white hover:text-red-500 px-4"
                      onClick={() => handleDelete(product._id)}
                    >
                      Sil
                    </button>
                  </Td>
                </Tr>
              ))}

    </Tbody>
   
  </Table>
</TableContainer>

    </div>
   
   
    
    </div>
        </div>
       
   
    </div>
  )
}
export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination:"/components/Auth/adminLogin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default AdminProduct