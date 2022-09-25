import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { QueryKeys, restFetcher } from "../../queryClient";
import { Product } from "../../type";
import ProductItem from "./product-Item";

const ProductContainer = styled.ul`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
`;

// category: "men's clothing"
// description: "great outerwear jackets for Spring/Autumn/Winter.......
// id: 3
// image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
// price: 55.99
// rating: {
//   count: 500,
//   rate: 4.7
// title: "Mens Cotton Jacket"
// }

const ProductList = () => {
  // const { data, isLoading } = useQuery<Product2[]>([QueryKeys.PRODUCTS], () =>
  //   restFetcher({
  //     method: "GET",
  //     path: "/api/product",
  //   })
  // );
  // if (isLoading) return <h2>Loding...</h2>;
  // if (!data) return null;

  // console.log(data);

  return (
    <ProductContainer>
      {/* {data.slice(0, 7)?.map((product) => (
        <ProductItem {...product} key={product._id} />
      ))} */}
    </ProductContainer>
  );
};

export default ProductList;
