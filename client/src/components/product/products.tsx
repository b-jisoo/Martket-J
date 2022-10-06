import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { Product } from "../../type";
import ProductItem from "./product-Item";

const Products = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Product_Image = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const Product_Image2 = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
`;

const Product_Name = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  line-height: 0px;
  color: black;
`;

const Sub = styled.div`
  .price {
    font-size: 24px;
    font-weight: bold;
    line-height: 10px;
    color: #000000;
  }
`;

const PRODUCTMORE_URL = "/api/product/products";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body: any) => {
    axios.post(PRODUCTMORE_URL, body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          console.log("상품목록: ", response.data);
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품 불러오기 실패");
      }
    });
  };

  const handleProductMore = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const convertPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderCards = products.map((product: Product, index) => {
    return (
      <Products>
        <Product_Image>
          <Link to={`/products/${product._id}`}>
            <Product_Image2
              key={index}
              src={`http://localhost:4000/${product.images[0]}`}
            />
            <Product_Name>
              <p>{product.title}</p>
            </Product_Name>
            <Sub>
              <p className="price">{convertPrice(product.price)}원</p>
            </Sub>
          </Link>
        </Product_Image>
      </Products>
    );
  });

  return (
    <>
      {renderCards}
      {postSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleProductMore}>더보기</button>
        </div>
      )}
    </>
  );
};
export default ProductPage;
