import React from 'react'
import Image from "next/image";
import Title from '../components/Navbar/Title';
import axios from 'axios';
import {reset} from "@/pages/redux/CartSlice"
import { useSelector, useDispatch } from "react-redux";

import { useSession } from "next-auth/react";
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

function İndex({ userList }) {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "Adres yok",
    total: cart.total,
    method: 0,
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Sipariş vereceğinizden emin misiniz?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/Orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/Profile/Orders`);
            dispatch(reset());
            toast.success("Sipariş başarıyla oluşturuldu", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Lütfen önce giriş yapın.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className='flex  container profileResponsive'>
     
      <div className='w-[70%] ml-[200px] mt-[10%] profileResponsive1' >
      
      <TableContainer className='w-full '>
  <Table variant='simple' >
    
    <Thead>
      <Tr className='bg-yellowMe '>
        <Th>ÜRÜN</Th>
        <Th>EKSTRALAR</Th>
        <Th>ÜCRET</Th>
        <Th >MİKTAR</Th>
        <Th isNumeric>İŞLEM</Th>
      </Tr>
    </Thead>
    
    <Tbody className='bg-darkMe text-white' >
    {cart.products.map((product) =>(
      
      <Tr className='hover:bg-yellowMe hover:text-darkMe ' key={product._id}>
      <Td className='flex gap-2'>

        <Image priority className='h-[40px] w-[40px]' src={product?.img} alt='' width={40} height={40}/>
        {product.name}
        
        </Td>
      <Td>{product.extras.map((item,index) => (                               //sos seçimi
                      <span key={index}>{item.text}, </span> //key={item.id}
                    ))}</Td>
      <Td>{product.price} TL</Td>
      <Td >{product.quantity}</Td>
      <Td isNumeric>
        <button className='adminCatagoryButton' >Sil</button>
      </Td>
    </Tr>
    
    ))}
    </Tbody>
    
    </Table>
      
      
  
   
  
</TableContainer>
    
    
    
    
    </div>
    <div className='bg-darkMe rounded-sm text-white w-[40%] h-full ml-20 flex flex-col mt-[10%] profileResponsive1-1-1'>
      <div className='flex justify-center'>
      <Title searchClasname=" text-[30px] my-10">Sepet Toplamı</Title>
      </div>
      <div className='flex flex-col justify-center gap-10 ml-5'>
      <p className='text-[20px] '>
      Toplam Ürün Fiyatı: {cart.total} TL
      </p>
      <p className='text-[20px] '>
      İndirim : 0 TL
      </p>
      <p className='text-[20px] ' >
      Toplam : {cart.total} TL
      </p>
      <button onClick={createOrder} 
       className='basketResponsiveButton w-[150px] border-yellowMe hover:bg-white hover:text-darkMe border hover:border-white transition-all text-white bg-yellowMe md:inline-block  p-2 rounded-[1.3rem] my-5  '

      >Satın al</button>
      </div>
      </div>
    </div>
  );
};
  
export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/User`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default İndex