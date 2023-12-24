import React from 'react'
import Carousel from '../components/Order/Carousel'
import Menu from '../components/Products/Menu'
import About from '../components/Products/About'
import BookATable from '../components/Products/BookATable'
import Customers from '../components/Products/Customers'



function Home({ categoryList, productList }) {
  return (
    <div >
        
        <Carousel/>
        <Menu categoryList={categoryList}  productList={productList}/>
        <About/>
        <BookATable/>
        <Customers/>
       
    </div>
  )
}

export default Home