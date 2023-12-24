import  {useState} from 'react'
import Logo from '../Navbar/Logo'
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Search from '../Navbar/Search';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from "react-redux";


function Header() {
    const [searchClick, setSearchClick] = useState(false)
    const cart = useSelector((state) => state.cart);
    
    const searchIcons=()=>{
        setSearchClick(true);
    }
    const router=useRouter()
  return (
    <>
   
    <div className={`h-[5.5rem] z-40 relative Headers headerResponsive ${router.asPath === "/" ? "bg-transparent" : "bg-darkMe"} `}>
        <div className='mt-[0.5rem] ml-5  headerResponsive1'>
            <Link href="/">
            <Logo/>
            </Link>
            </div>
        <nav className='HeadersUl headerResponsive2 '>                                                                       {/*sm:statik absolute :sayfa küçülünce li leri yok edelim hamburger menü içerisine atalım*/}
            <ul >
                <li className='hoverHeaders'>
                    <Link href="/">ANASAYFA</Link>
                    </li>
               
                    <li className='hoverHeaders'>
                    <Link href="/linkPages/menu">MENÜ</Link>
                    </li>
                    <li className='hoverHeaders'>
                    <Link href="/linkPages/about">HAKKIMIZDA</Link>
                    </li>
                    <li className='hoverHeaders'>
                    <Link href="/linkPages/bookTable">REZERVASYON  </Link>
                    </li>
                
            </ul>
        </nav>
        <div className='flex gap-4 text-white items-center  headerResponsive3' >
       <Link href="/components/Auth/login">
        <FaUser className='hoverHeaders'/>
        </Link>
        <Link href="/Basket" >
            <FaShoppingCart className='hoverHeaders '/>
            <span className='absolute top-0 mt-[25px] ml-[10px]  text-xs bg-yellowMe rounded-full px-[5px] font-medium '>
            {cart.products.length === 0 ? "0" : cart.products.length}
            </span>
            </Link>
            <button onClick={searchIcons}>
                <FaSearch className='hoverHeaders'/>

            </button>
            
            <button 
            className='m-5  buttonHeaders'>
                Sipariş Ver
                </button> {/* md:inline-block hidden :sayfa boyutu küçülünce butonu yok et */}
               {/* <button>
               <GiHamburgerMenu />
               </button> */}
        </div>
        
           
        
        </div>
         {searchClick && (
          <Search setSearchClick={setSearchClick} />
        ) }
         
       </>
    
  )
}

export default Header

//sayfanın tamamına kaplatmak için yazdığım kod .Eğer anasayfada ise sayfayı kapla yan sekmelere gince navbar moduna dön
//1.adım)=>{`h-[5.5rem] z-40 relative Headers ${router.asPath === "/" ? "bg-transparent" : "bg-darkMe"} `}
//2.adım)=>'h-screen w-full container mx-auto -mt-[88px]' Carousel.jsx de ana dive yazmamız lazım