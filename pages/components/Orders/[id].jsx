import React from 'react'
import Image from "next/image";

import ImageBake from "../../imagess/bake.png"
import ImageBike from "../../imagess/bike.png"
import ImageDelivered from "../../imagess/delivered.png"
import ImagePaid from "../../imagess/paid.png"
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
 
  TableContainer,
} from '@chakra-ui/react'

function Order({ order }) {
  const status = order?.status;

  const statusClass = (index) => {
    if (index - status < 1) return "";
    if (index - status === 1) return "animate-pulse";
    if (index - status > 1) return "";
  };
  return (
    <div className='flex flex-col mx-20' >
      <div className=" flex justify-center mt-[10%] ">
      <TableContainer className='w-full '>
  <Table variant='simple'  >
    
    <Thead className=''>
      <Tr className='bg-darkMe  '>
        <Th>SİPARİŞ ID</Th>
        <Th>MÜŞTERİ</Th>
        <Th>ADRES</Th>
        <Th isNumeric>TOPLAM FİYAT</Th>
      </Tr>
    </Thead>
    <Tbody className='bg-gray-600 text-white'>
      <Tr className='hover:bg-yellowMe hover:text-darkMe ' >
        <Td className='flex gap-2 '>

         
          {order?._id.substring(0, 5)}
          
          </Td>
        <Td> {order?.customer}</Td>
        <Td> {order?.address}</Td>
        <Td isNumeric> ${order?.total}</Td>
      </Tr>
      <Tr className='hover:bg-yellowMe hover:text-darkMe '>
        <Td className='flex gap-2'>

          
        {order?._id.substring(0, 5)}
          
          </Td>
        <Td> {order?.customer}</Td>
        <Td> {order?.address}</Td>
        <Td isNumeric> ${order?.total}</Td>
      </Tr>
      <Tr className='hover:bg-yellowMe hover:text-darkMe '>
        <Td className='flex gap-2'>

          
        {order?._id.substring(0, 5)}
          
          </Td>
        <Td> {order?.customer}</Td>
        <Td> {order?.address}</Td>
        <Td isNumeric> ${order?.total}</Td>
      </Tr>
      <Tr className='hover:bg-yellowMe hover:text-darkMe '>
        <Td className='flex gap-2'>

          
        {order?._id.substring(0, 5)}
          
          </Td>
        <Td> {order?.customer}</Td>
        <Td> {order?.address}</Td>
        <Td isNumeric> ${order?.total}</Td>
      </Tr>
      <Tr className='hover:bg-yellowMe hover:text-darkMe '>
        <Td className='flex gap-2'>

         
        {order?._id.substring(0, 5)}
          
          </Td>
        <Td> {order?.customer}</Td>
        <Td> {order?.address}</Td>
        <Td isNumeric> ${order?.total}</Td>
      </Tr>
      
      
    </Tbody>
   
  </Table>
</TableContainer>
    </div>
    <div className='flex justify-between w-full p-10 bg-yellowMe mt-6   '>
     
    <div className={`relative flex flex-col ${statusClass(0)}`}>
    <Image 
    src={ImageDelivered} 
    alt='' 
    width={40}
    height={40}
    objectFit="contain"></Image>
    <span>ÖDEME</span>
    </div>
    
    <div className={`relative flex flex-col ${statusClass(1)}`}>
    <Image 
    src={ImageBake} 
    alt='' 
    width={40}
    height={40}
    objectFit="contain"></Image>
    <span>HAZIRLANIYOR</span>
    </div>

    <div className={`relative flex flex-col ${statusClass(2)}`}>
    <Image 
    src={ImageBike} 
    alt='' 
    width={40}
    height={40}
    objectFit="contain"></Image>
    <span>YOLDA</span>
    </div>

    <div className={`relative flex flex-col ${statusClass(3)}`}>
    <Image 
    src={ImagePaid} 
    alt='' 
    width={40}
    height={40}
    objectFit="contain"></Image>
    <span>Teslim edilmiş</span>
    </div>

    </div>
   
    
    </div>
  )
}
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/Orders/${params.id}`
  );

  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};
export default Order