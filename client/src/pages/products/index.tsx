import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import ProductItem from "../../components/product";
import { getClient, QueryKeys, restFetcher } from "../../queryClient";
import { GetProduct } from "../../type";

const ProducListController = styled.div`
  width: 75%;
  min-width: 850px;
  border-radius: 1em;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); */
  margin: 100px 150px 0 250px;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
`;

type TypeCategory = { category: string };

const useFetcher = (category: string) => {
  return useQuery<GetProduct>([QueryKeys.PRODUCTS, category], () =>
    restFetcher({
      method: "POST",
      path: `/api/product/${category}`,
    })
  );
};

const ProductList = () => {
  const { category } = useParams<TypeCategory>();
  const [productItem, setProductItem] = useState<GetProduct>();
  if (!category) return null;

  const { data, isLoading } = useFetcher(category);

  return (
    <ProducListController>
      <br />
      Total : <b>{data?.postSize}</b> items
      <ul>
        {data?.productInfo.map((product) => (
          <ProductItem {...product} key={product._id} />
        ))}
      </ul>
    </ProducListController>
  );
};

export default ProductList;
