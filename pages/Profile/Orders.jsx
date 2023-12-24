import Image from 'next/image'
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaHome } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import Myphotos from "@/pages/imagess/admin.png"
import Title from '../components/Navbar/Title';
import Link from 'next/link';
import { useSession,signOut } from "next-auth/react";
import axios from "axios";

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
function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const status = ["preparing", "on the way", "delivered"];
console.log(orders);
  const { data: session } = useSession();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/Orders`
        );
        setOrders(
          res.data.filter((order) => order.customer === currentUser?.fullName)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/User`);
        setCurrentUser(
          res.data.filter((user) => user.email === session.user.email)[0]
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [session]);
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
            <Image className='rounded-[100%] mt-5 ImageResponsiveProfileAdmin' src={Myphotos} alt='' width={150}/>
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

            <div className='hover:bg-yellowMe w-full '>
            <Link href="/linkPages/passwordProfile">
            <button className=' flex py-3 items-center text-[20px]'> <RiLockPasswordFill className='mx-3'/>Şifre</button>
            </Link>
            <hr  />
            </div>

            <div className='hover:bg-yellowMe w-full bg-yellowMe'>
              <Link href="/linkPages/order">
            <button className=' flex py-3 items-center text-[20px]'> <BiSolidShoppingBags className='mx-3'/> Siparişler</button>
            </Link>
            <hr  />
            </div>
           
            <div className='hover:bg-yellowMe w-full  ' onClick={handleSignOut}>
            <button className=' flex py-3 items-center text-[20px]'> <IoLogOut className='mx-3'/> Çıkış Yap</button>
            </div>
        </div>
        </div>
        <div className='ml-20 responsiveProfileOrders1'>
            <div>
                <Title searchClasname="text-black font-bold text-[40px] ml-20 my-10">Siparişler</Title>
            </div>
            <div className='flex flex-col mx-20 w-[100vh] responsiveProfileOrders1 ' >
      <div className=" flex justify-center  ">
      <TableContainer className='w-full responsiveProfileOrders2'>
  <Table variant='simple'  >
    
    <Thead className=''>
      <Tr className='bg-darkMe  '>
        <Th>ID</Th>
        <Th>İSİM</Th>
        <Th>ADRES</Th>
        <Th isNumeric>TOPLAM FİYAT</Th>
       
      </Tr>
    </Thead>
    <Tbody className='bg-gray-600 text-white'>

    {orders.map((order) => (
              <Tr
                className= " transition-all bg-yellowMe border-gray-700 hover:bg-darkMe"
                key={order?._id}
              >
                <Td className=" py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center  ">
                {order?._id.substring(0, 6)}...
                </Td>
                <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                {order?.customer}
                </Td>
                <Td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                {order?.address}
                </Td>
                <Td isNumeric className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                {order?.total} TL
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

export default Orders