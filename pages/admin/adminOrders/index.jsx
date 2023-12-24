import Image from 'next/image'
import axios from "axios";
import { useEffect, useState } from "react";
import { RiPlayList2Line } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import AdminImages from "@/pages/imagess/admin.png"
import Title from '@/pages/components/Navbar/Title';
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
   
    TableContainer,
  } from '@chakra-ui/react'
function AdminOrders() {
  const { push } = useRouter();
  const [orders, setOrders] = useState([]);
  const status = ["preparing", "on the way", "delivered"];
  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/Orders`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/Orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSignOut = () => {
    if (confirm("Oturumu kapatmak istediğinizden emin misiniz?")) {
      signOut({ redirect: false });
      push("/components/Auth/login");
      toast.success("Yönetici Hesabı Kapatıldı!");
    }
  };

  return (
    <div className='flex profileResponsive profileResponsive1-1-1'>
        <div className='border w-[400px] h-[456px]   justify-center ml-20 profileResponsive1 profileResponsive1-1'>
        <div className='flex flex-col items-center'>
            <Image className='ImageResponsiveProfileAdmin rounded-[100%] mt-5' src={AdminImages} alt='' width={150}/>
            <h2 className='font-bold text-[30px] mb-5'>Yönetici</h2>
        </div>
        <hr  />
        <div className='flex flex-col items-start '>
            
            <div className='hover:bg-yellowMe w-full cursor-pointer '>
            <Link href="/admin/adminProduct">
            <button className=' flex py-3 items-center text-[20px]'> <GrArticle className='mx-3' />  Ürünler</button>
            </Link>
            <hr  />
            </div>
        
            <div className='hover:bg-yellowMe w-full  cursor-pointer bg-yellowMe'>
            
            <button className=' flex py-3 items-center text-[20px]'> <BiSolidShoppingBags className='mx-3'/>Siparişler</button>
           
            
            <hr  />
            </div>
            <div className='hover:bg-yellowMe w-full cursor-pointer'>
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
        <div className='ml-20 responsiveProfileOrders1'>
            <div>
                <Title searchClasname="text-black font-bold text-[40px] ml-20 my-10">Ürünler</Title>
            </div>
            <div className='flex flex-col mx-20 w-[100vh] responsiveProfileOrders1-1' >
      <div className=" flex justify-center responsiveProfileOrders4 ">
      <TableContainer className='w-full '>
  <Table variant='simple'  >
    
    <Thead className=''>
      <Tr className='bg-darkMe  '>
        <Th>ÜRÜN</Th>
        <Th>MÜŞTERİ</Th>
        <Th>TOPLAM</Th>
        <Th>ÖDEME</Th>
        <Th>DURUM</Th>
        <Th isNumeric>AKSİYON</Th>
      </Tr>
    </Thead>
    <Tbody className='bg-gray-600 text-white '>

    {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <Tr
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                    key={order?._id}
                  >
                    <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
                      {order?._id.substring(0, 6)}...
                    </Td>
                    <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.customer}
                    </Td>
                    <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                       {order?.total} TL
                    </Td>
                    <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.method === 0 ? "Cash" : "Card"}
                    </Td>
                    <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {status[order?.status]}
                    </Td>
                    <Td isNumeric className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        className="btn-primary !bg-success"
                        onClick={() => handleStatus(order?._id)}
                        disabled={order?.status > 1}
                      >
                        Next Stage
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

export default AdminOrders