import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Detail_product from "../../components/product/detail_product";
import { QueryKeys, restFetcher } from "../../queryClient";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery([QueryKeys.PRODUCTS, id], () =>
    restFetcher({
      method: "GET",
      path: `/api/product/products_by_id`,
      params: {
        id,
      },
    })
  );
  if (!data) return null;
  console.log(data);
  console.log("호출했습니다ㅣ");
  console.log(data.product[0]);

  return (
    <div>
      <br />
      <Detail_product {...data.product[0]} />
    </div>
  );
};

export default ProductDetailPage;
