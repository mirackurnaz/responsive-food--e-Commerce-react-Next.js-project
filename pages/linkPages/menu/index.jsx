import React from 'react'
import Menu from "../../components/Products/Menu"
import axios from 'axios';
function index({ categoryList, productList  }) {
  return (
    <div>
        <Menu categoryList={categoryList}  productList={productList} />
    </div>
  )
}
export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default index