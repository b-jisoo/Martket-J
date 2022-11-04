import { QueryClient } from "@tanstack/react-query";

type AnyOBJ = { [key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            //staleTime과 cacheTime의 defaultValue는 0분과 5분
            //inactive 상태인 캐시 데이터가 메모리에 남아있는 시간
            //데이터 구조가 자주자주 변하는 어플리케이션이라면 지정하지 않는 편이 좋고 정적이라면 staletime을 지정해주고 요청하는 것이 서버의 부담을 경감시켜준다
            //refetchOnMount 는 데이터가 stale 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션
            refetchOnMount: false,
            //refetchOnReconnect 는 데이터가 stale 상태일 경우 재 연결 될 때 refetch를 실행하는 옵션
            refetchOnReconnect: false,
            //refetchOnWindowFocus 는 데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

const BASE_URL = "https://martket-j.herokuapp.com";

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }
    if (body) fetchOptions.body = JSON.stringify(body);

    const res = await fetch(url, fetchOptions);
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
  BOARDLIST: "BOARDLIST",
};
