import React, { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import Title from '../Navbar/Title';
import { IoIosCloseCircle } from "react-icons/io";
import Image from 'next/image';
import axios from "axios";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
function Search({setSearchClick}) {
    const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
        setFiltered(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };
  return (
    <div className='searchModal searchModalResponsive'> 
        <OutsideClickHandler onOutsideClick={() =>setSearchClick(false)}>  
    <div className="w-full h-full grid place-content-center relative" > 
    <div className="relative z-50 w-[370px] md:w-[600px]   bg-white border-2 p-5 rounded-md">    {/*  butona tıklayınca searchClicki true yaptık burdada true ise istenlen işlemleri yap emri veriyorum */}
    
    <button 
    className='absolute top-4 right-4'
    onClick={()=>setSearchClick(false)}
    >
        <IoIosCloseCircle className='hover:text-yellowMe w-5 h-5'/>
        </button>
    
       <Title searchClasname="font-bold text-center font-dancingScript text-[2.65rem]"> 
       Ürün Ara
           </Title>
          <input 
          type="text" 
          placeholder='Ara' 
          className='İnputt w-full h-10 mt-8 border  rounded-md border-yellowMe shadow-3xl ' 
          onChange={handleSearch}/>
         <div>
         {products.length > 0 ? (    //search fitreleme 
              <ul className="mt-4">
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <li
                      className="flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer"
                      key={product._id}
                      onClick={() => {
                        router.push(`/productDetails/${product?._id}`);
                        setSearchClick(false);
                      }}
                    >
                      <div className="relative flex">
                        <Image
                          src={product?.img}
                          alt={product?.title}
                          width={48}
                          height={48}
                        />
                      </div>
                      <span className="font-bold">{product?.title}</span>
                      <span className="font-bold">{product.prices[0]} TL</span>
                    </li>
                  ))
                ) : (
                  <p className="text-center font-semibold">Sonuç bulunamadı!
                  </p>
                )}
              </ul>
            ) : (
              <div className="flex justify-center items-center mt-3">
                <BeatLoader color="#fca311" />
              </div>
            )}
            </div>  
   </div>
   </div>
   </OutsideClickHandler>
   </div>
  )
}

export default Search


//OutsideClickHandler kullanarak boşluğa tıklayınca açılan pencereyi kapatma işlemi yaptım
//bize gereken setSearchClick i props olarak gönderip burdanda props olarak yakaladık
//absolute top-4 right-4 iconu sağ üstüne koymak için kullandığım css 