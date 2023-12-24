import Head from "next/head";

import Home from "./Home/Home";
import axios from "axios";

export default function Index({ categoryList , productList}) {
  return (
    <div className="">
      <Head>
        <title>Miraç KURNAZ</title>
        <link rel="icon" href="/mk.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      
      <Home  categoryList={categoryList} productList={productList}/>
     
      
    </div>
  );
}
export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );

  return {
    props: {
      categoryList: res.data ? res.data : [],
      productList: product.data ? product.data : [],
    },
  };
};