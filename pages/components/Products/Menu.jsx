import {useState,useEffect} from 'react'
import Title from '../Navbar/Title'
import MenuItems from './MenuItems'

function Menu({ categoryList, productList }) {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3) //daha fazla göster butonu ile syafaya ürün getirme (3=syafada 3 tane ürün göster)

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category === categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);
  return (
    
    <div className='container mx-auto flex flex-col items-center mb-16 menüResponsive'>
        <div className='flex flex-col items-center w-full'>
        <Title searchClasname="text-center text-[50px] font-bold mt-[80px] menüResponsive3 ">Menümüz</Title>
    <div className="mt-10"> 
    {categoryList &&
            categoryList.map((category, index) => (
              <button type='button'
                className={`px-6 py-2  rounded-3xl ${
                  index === active && "bg-darkMe text-white"
                }`}
                key={category._id}
                onClick={() => {
                  setActive(index)
                  setProductLimit(3);}}  //diğer categorilerde butona tıklanınca orda arttırma işlemi yapılmasın
              >
                {category.title}
              </button>
            ))}
        </div>
        </div>
        
        <div className='mt-[80px] z-0  grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[150px] menüResponsive1'>
        {filter.length > 0 &&
          filter
          .slice(0,productLimit)
          .map((product) => (
            <MenuItems product={product}  key={product._id}/>
           
            ))}
           
        </div>
        <div className="flex items-center justify-center w-full mt-8">
           <button                                                              
          
          className='  hover:bg-darkMe hover:text-white border hover:border-darkMe transition-all text-white bg-yellowMe md:inline-block !px-4  !rounded-[12px]  p-2  mt-0'
          onClick={() => setProductLimit(productLimit + 3)}      //butona tıklayınca 3 er 3 er sayfaya ekle
        >
          Daha fazla göster
        </button>
           </div>
    </div>
  )
}

export default Menu
