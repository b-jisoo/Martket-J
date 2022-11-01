# Market J

![logo](https://user-images.githubusercontent.com/48309309/198953532-66ccad4c-4aee-4701-bdb3-69fa9f36906d.PNG)

**Team JS의 쇼핑몰 Market J 입니다.**

<br>

## ⚒️ 기술 스택

#### 프레임워크

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

#### 라이브러리

![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Axios](https://img.shields.io/badge/axios-%23323330.svg?style=for-the-badge)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

## 📃 실행 환경 및 방법

node.js와 npm이 설치되어있어야 합니다.

```
$node --version
v16.15.0
$npm --version
8.13.2
```

프로젝트 clone 후 서버를 실행합니다.

```
npm install
```

기본 주소는 [http://localhost:5173](http://localhost:4000)으로, 서버 실행 후 해당 주소로 접속하시면 됩니다.

### 개발 서버 실행

```bash
npm run dev
    or
npm run start
```

### 프로덕션 빌드 후 실행

```bash
npx run dev
```

## ✨ 프로젝트 결과물

**1.  메인 페이지**

![01](https://user-images.githubusercontent.com/48309309/198954428-c5fd0200-63a2-4f02-a07d-88540285fd29.PNG)

**2.  로그인/회원가입 페이지**

![sign](https://user-images.githubusercontent.com/48309309/198956741-8766e204-75ed-447c-aa4c-b3c00cd5b4c2.PNG)

![login](https://user-images.githubusercontent.com/48309309/198956350-df6f7609-f258-4c6f-90bb-67c10885c91c.PNG)

**3.  상세 페이지**

![02](https://user-images.githubusercontent.com/48309309/198954601-51afca54-9141-4100-866b-3a6da8ca4a94.PNG)

**4.  카테고리 페이지**

**- 전체 상품**

![cate01](https://user-images.githubusercontent.com/48309309/199021375-d1730700-bdb3-462f-922f-f0a1ec030de5.PNG)

**- ETC 상품**

![cate02](https://user-images.githubusercontent.com/48309309/199021380-0d6d5e32-55bc-4560-8532-7b565c91830a.PNG)

**5.  장바구니 페이지**

![03](https://user-images.githubusercontent.com/71222288/199019929-75046ec3-91a3-4338-826e-0fe48e09b9d3.PNG)

**6. 커뮤니티 페이지**

![commu1](https://user-images.githubusercontent.com/48309309/198956534-4fc646dd-7d87-4133-aef6-65b988473247.PNG)

![commu2](https://user-images.githubusercontent.com/48309309/198956528-11f8042c-0b61-4dff-852d-b5095173f5ec.PNG)


<br>

## 📁디렉토리 구조

```
📦client
    📦src
    ┣ 📦components
    ┃ ┣ 📂admin
    ┃ ┃ ┣ addForm
    ┃ ┃ ┗ FileUpload
    ┃ ┣ 📂auth
    ┃ ┃ ┗ auth
    ┃ ┣ 📂cart
    ┃ ┃ ┗ items
    ┃ ┣ 📂community
    ┃ ┃ ┣ board
    ┃ ┃ ┣ boarditem
    ┃ ┃ ┣ detail
    ┃ ┃ ┗ writeform
    ┃ ┣ 📂gnb
    ┃ ┃ ┣ leftForm
    ┃ ┃ ┗ rightForm
    ┃ ┣ 📂login
    ┃ ┃ ┣ login
    ┃ ┃ ┗ logout
    ┃ ┣ 📂product
    ┃ ┃ ┣ detail_product
    ┃ ┃ ┣ index
    ┃ ┃ ┗ products
    ┃ ┣ 📂slide
    ┃ ┃ ┗ slideItem
    ┃ ┣ 📂slider
    ┃ ┃ ┣ footer
    ┃ ┃ ┗ gnb
    ┣ 📦pages
    ┃ ┣ 📂admin
    ┃ ┃ ┗ index
    ┃ ┣ 📂cart
    ┃ ┃ ┗ index
    ┃ ┣ 📂community
    ┃ ┃ ┣ [id]
    ┃ ┃ ┣ index
    ┃ ┃ ┗ writeBoard
    ┃ ┣ 📂login
    ┃ ┃ ┣ login
    ┃ ┃ ┗ signup
    ┃ ┣ 📂products
    ┃ ┃ ┣ [id]
    ┃ ┃ ┗ index

📦server
    ┣ 📂middleware
    ┃ ┣ 📜auth
    ┣ 📂models
    ┃ ┣ 📜Board
    ┃ ┣ 📜Counter
    ┃ ┣ 📜Product
    ┃ ┗ 📜User
    ┣ 📂routes
    ┃ ┣ 📜board
    ┃ ┣ 📜product
    ┃ ┗ 📜user
    ┣ 📜index
```

## 🗓️ 개발 기간

9월 30일 ~ 10월 31일

## 🧑‍💻 팀원

<table>
  <tr>
    <td align="center"><b><a href="https://github.com/hjs926">황준선</a></b></td>
    <td align="center"><b><a href="https://github.com/b-jisoo">방지수</a></b></td>
  </tr>
</table>
