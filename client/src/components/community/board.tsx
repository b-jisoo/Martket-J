import { useMutation, useQuery } from "@tanstack/react-query";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "../../axios/axios";
import { QueryKeys, restFetcher } from "../../queryClient";
import { boardItem, GetBoardItem, userInfo } from "../../type";
import Auth from "../auth/auth";
import BoardItem from "./boarditem";

// -----------------css 시작-----------------

const BoardContainer = styled.div`
  width: auto;
  height: auto;
  min-width: 830px;

  .writeBtnContainer {
    display: flex;
    justify-content: end;
    margin-top: 40px;

    button {
      width: 150px;
      color: #fff;
      background: #6c757d;
      border-color: #6c757d;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #5c636a;
        border-color: #565e64;
      }
      &:focus {
        box-shadow: 0 0 0 2px rgba(130, 138, 145);
      }
      &:active {
        color: #fff;
        background-color: #565e64;
        border-color: #51585e;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      }
    }
  }
  .board-header {
    width: 100%;
    display: flex;
    .title {
      width: 60%;
    }

    div {
      padding: 14px 0 13px;
      border-bottom: 1px solid #e9e9e9;
      color: #999;
      vertical-align: middle;
      font-weight: normal;
      background: #fff;
      padding-left: 20px;

      width: 20%;
    }
  }
`;

const CommunityBoard_List = styled.ul`
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  .current {
    color: #1890ff;
    border: 1px solid #1890ff;
    font-weight: 500;
  }
  button {
    margin: 0 15px;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
    min-width: 32px;
    height: 32px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    &:hover {
      color: #40a9ff;
      border: 1px solid #40a9ff;
    }
  }
`;

// -----------------css 끝-----------------

const GETBOARDLIST_URL = "/api/board/getBoardList";

/*
content: "내용입니다."
createdAt: "2022-09-23T10:54:29.397Z"
id: "0cbdcbe-fa7b-83d7-8cde-764168fd3f26"
title: "제목입니다."
updatedAt: "2022-09-23T10:54:29.397Z"
__v: 0
_id: "632d90658ddd2d67dcac7957"
*/

//----------------------분리된 함수----------------------
// 현재 페이지 게시글의 데이터 가져오는 함수
const useBoardList = ({ page, limit }: { page: number; limit: number }) => {
  const [data, setData] = useState<GetBoardItem>();

  const { mutate: GetBoardList } = useMutation(
    ({ page, limit }: { page: number; limit: number }) =>
      restFetcher({
        method: "GET",
        path: GETBOARDLIST_URL,
        params: {
          page,
          limit,
        },
      }),
    {
      onSuccess: (response) => {
        setData(response);
      },
    }
  );

  // page와 limit가 바뀔때마다 리렌더링
  useEffect(() => {
    GetBoardList({ page, limit });
  }, [page, limit]);

  if (!data?.results) return null;
  return data;
};

// 최대 페이지 수를 구해 그 만큼 pageBtn에 버튼 저장하는 함수
const Pagination = (
  {
    boardList,
    limit,
  }: {
    boardList: GetBoardItem;
    limit: number;
  },
  setPage: any
) => {
  // 최대 페이지 수를 구하는 함수
  const handleGetMaxPage = (e: SyntheticEvent) => {
    e.preventDefault();
    const count = parseInt((e.target as HTMLInputElement).value);
    setPage(1 * count);
  };

  // 최대 페이지 구해서 그만큼 버튼 생성
  const maxPage = Math.ceil(boardList.totalIndex / limit);
  const result = [];
  for (let i = 1; i <= maxPage; i++) {
    result.push(
      <button key={i} value={i} onClick={handleGetMaxPage}>
        {i}
      </button>
    );
  }
  return result;
};
//----------------------분리된 함수 끝----------------------

export const CommunityBoard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  // 현재 페이지 게시글의 데이터 가져오기
  const boardList = useBoardList({ page, limit });
  if (!boardList?.results) return null;

  // 최대 페이지 수를 구해 그 만큼 pageBtn에 버튼 저장
  const pageBtn = Pagination({ boardList, limit }, setPage);

  return (
    <BoardContainer>
      <div className="board-header">
        <div>번호</div>
        <div className="title">제목</div>
        <div>작성자</div>
        <div>작성일</div>
      </div>
      <CommunityBoard_List>
        {boardList?.results.map((board) => (
          <BoardItem {...board} key={board._id} />
        ))}
      </CommunityBoard_List>
      <div className="writeBtnContainer ">
        <Link to="/community/write">
          <button>글작성</button>
        </Link>
      </div>
      <PaginationContainer>{pageBtn}</PaginationContainer>
    </BoardContainer>
  );
};

export default CommunityBoard;

// 핸들링 함수----------------------------------------------------

// //다음 페이지 이벤트
// const handleNextPage = (e: SyntheticEvent) => {
//   e.preventDefault();
//   GetBoardList(data.next);
// };
// //이전페이지 이벤트
// const handlePreviousPage = (e: SyntheticEvent) => {
//   e.preventDefault();
//   GetBoardList(data.previous);
// };
