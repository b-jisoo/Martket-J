# Market J

![logo](https://user-images.githubusercontent.com/48309309/198953532-66ccad4c-4aee-4701-bdb3-69fa9f36906d.PNG)

**Team JS의 쇼핑몰 Market J 입니다.**

<br>

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

![sign](https://user-images.githubusercontent.com/48309309/198955254-950ef979-c4e6-4a5c-8a6c-ce45358f9407.PNG)

![login](https://user-images.githubusercontent.com/48309309/198956350-df6f7609-f258-4c6f-90bb-67c10885c91c.PNG)

**3.  상세 페이지**

![02](https://user-images.githubusercontent.com/48309309/198954601-51afca54-9141-4100-866b-3a6da8ca4a94.PNG)

**4.  장바구니 페이지**

![03](https://user-images.githubusercontent.com/48309309/198954633-9496c91d-e4c5-4267-b90b-89e09a98c54a.PNG)

**5. 커뮤니티 페이지**

![commu2](https://user-images.githubusercontent.com/48309309/198956528-11f8042c-0b61-4dff-852d-b5095173f5ec.PNG)

![commu1](https://user-images.githubusercontent.com/48309309/198956534-4fc646dd-7d87-4133-aef6-65b988473247.PNG)

## ⚒️ 기술 스택

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

#### 라이브러리

![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Axios](https://img.shields.io/badge/axios-%23323330.svg?style=for-the-badge)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

<br>
### 📁 디렉토리 구조

```
📦client
    📦src
    ┣ 📦components
    ┃ ┣ 📂admin
    ┃ ┃ ┣ addForm.tsx
    ┃ ┃ ┗ FileUpload.tsx
    ┃ ┣ 📂auth
    ┃ ┃ ┗ auth.tsx
    ┃ ┣ 📂cart
    ┃ ┃ ┗ items.tsx
    ┃ ┣ 📂community
    ┃ ┃ ┣ board.tsx
    ┃ ┃ ┣ boarditem.tsx
    ┃ ┃ ┣ detail.tsx
    ┃ ┃ ┗ writeform.tsx
    ┃ ┣ 📂gnb
    ┃ ┃ ┣ leftForm.tsx
    ┃ ┃ ┗ rightForm.tsx
    ┃ ┣ 📂login
    ┃ ┃ ┣ login.tsx
    ┃ ┃ ┗ logout.tsx
    ┃ ┣ 📂product
    ┃ ┃ ┣ detail_product.tsx
    ┃ ┃ ┣ index.tsx
    ┃ ┃ ┗ products.tsx
    ┃ ┣ 📂slide
    ┃ ┃ ┗ slideItem.tsx
    ┃ ┣ 📂slider
    ┃ ┃ ┣ footer.tsx
    ┃ ┃ ┗ gnb.tsx
    ┣ 📦pages
    ┃ ┣ 📂admin
    ┃ ┃ ┗ index.tsx
    ┃ ┣ 📂cart
    ┃ ┃ ┗ index.tsx
    ┃ ┣ 📂community
    ┃ ┃ ┣ [id].tsx
    ┃ ┃ ┣ index.tsx
    ┃ ┃ ┗ writeBoard.tsx
    ┃ ┣ 📂login
    ┃ ┃ ┣ login.tsx
    ┃ ┃ ┗ signup.tsx
    ┃ ┣ 📂products
    ┃ ┃ ┣ [id].tsx
    ┃ ┃ ┗ index.tsx

📦server
    ┣ 📂middleware
    ┃ ┣ 📜auth.js
    ┣ 📂models
    ┃ ┣ 📜Board.js
    ┃ ┣ 📜Counter.js
    ┃ ┣ 📜Product.js
    ┃ ┗ 📜User.js
    ┣ 📂routes
    ┃ ┣ 📜board.js
    ┃ ┣ 📜product.js
    ┃ ┗ 📜user.js
    ┣ 📜index.js
```

## 🗓️ 개발 기간

9월 30일 ~ 10월 31일

## 🧑‍💻 팀원

| 황준선 | 방지수 |
