## 🧑🏻‍💻👩🏻‍💻garbageCollector 프로젝트 Back-end 소개

---

![iscreen_shoter_-_20230215013656803_720](https://user-images.githubusercontent.com/114500319/220086298-de11084d-c857-4db2-95d5-f42e85ca8581.jpg)

- [배민문방구](https://brandstore.baemin.com/) 를 모티브로 한 프로젝트를 진행하였습니다.

### 👫👫👫개발 인원 및 기간

---

- 개발기간 : 2023/2/6 ~ 2023/2/17
- 개발 인원 : 프론트엔드 3명, 백엔드 3명
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/42-1st-GarbageCollector-backend)

### 프로젝트 선정이유

---

- 여러 웹페이지 중에서 깔끔해보이지만 '깔끔함' 안에 재미있는 컨텐츠를 담고 있어 흥미로움을 유발하는 웹이었다고 생각이 들었고,<br>
  프로젝트 팀원들도 서로 이번 프로젝트를 즐겁게 할 수 있는 컨텐츠라고 공감했습니다. 일하는 것도 노는것처럼 재미있게 '일놀놀일(일하듯 놀고 놀듯 일하는)'<br>
  할 수 있는 플랫폼을 만들어 보고 싶었고 그 성격이 내재된 배민문방구를 모티브 삼아 쓸모없는 선물로 보일지 몰라도 선물에 대한 부담스러움이나<br>
  무거움에 대해서 재미로 가볍게 승화시키기 위해 '소비에 대한 가치'를 놀이로 표현하여 즐거운 웹페이지로 만들어 보고 싶었습니다.<br>
  프로젝트 명은 garbageCollector 이지만, 프로젝트 명을 웹페이지의 서비스 명 그대로 쓰기에는 누군가에게는 다소 부정적인 인식을 줄 수 있어<br>
  유쾌함을 전달할 수 있는 '풉'이라고 짓게 되었습니다.

### 🎥데모 영상(이미지 클릭)

---

https://youtu.be/ujv99pNE0Fw

<br>

## 적용 기술 및 구현 기능

### ⌨️적용 기술🖥️

---
Front-End
<img src="https://img.shields.io/badge/Javscript-F7DF1E?style=flat&amp;logo=javascript&amp;logoColor=white">
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&amp;logo=React&amp;logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat&amp;logo=ReactRouter&amp;logoColor=white">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&amp;logo=styled-components-DB7093&amp;logoColor=white">
<img src="https://img.shields.io/badge/sass-CC6699?style=flat&logo=sass&logoColor=white"/>

Back-End
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&amp;logo=Node.js&amp;logoColor=white">
<img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&amp;logo=Nodemon&amp;logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=flat&amp;logo=Express&amp;logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&amp;logo=MySQL&amp;logoColor=white">
<img src="https://img.shields.io/badge/JWT-CC6699?style=flat&amp;logo=JSON&amp;logoColor=white">
<img src="https://img.shields.io/badge/Dbmate-009DC7?style=flat&amp;logo=Bcrypt&amp;logoColor=white">
<img src="https://img.shields.io/badge/Bcrypt-CA424?style=flat&amp;logo=Bcrypt&amp;logoColor=white">

Common
<img src="https://img.shields.io/badge/Git-F05032?style=flat&amp;logo=Git&amp;logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&amp;logo=prettier&amp;logoColor=white">
<img src="https://img.shields.io/badge/RestfulAPI-F7533E?style=flat&amp;logo=RestfulAPII&amp;logoColor=white">
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&amp;logo=Visual Studio Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&amp;logo=Postman Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat&amp;logo=AWS Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&amp;logo=AWS_EC2 Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS_RDS-527FFF?style=flat&amp;logo=AWS_RDS Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/AWS_S3-569A31?style=flat&amp;logo=AWS_S3 Code&amp;logoColor=white">

Communication
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&amp;logo=Slack&amp;logoColor=white">
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat&amp;logo=Trello&amp;logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=flat&amp;logo=Notion&amp;logoColor=white">


### 데이터베이스 ERD 모델링

---

![ERD](https://raw.githubusercontent.com/fromSYHwang/42-1st-GarbageCollector-backend/main/garbageCollector%20ERD%20modeling.png)

### 구현 기능

|                | 이홍열                                                                |                        황수영                         |                                                   박세희 |
| -------------- | :--------------------------------------------------------------------: | :---------------------------------------------------: | :-------------------------------------------------------: |
| 담당 구현 기능 | 회원가입 API<br> 로그인 API<br> 전역 에러핸들링<br> 상품검색 조회 API | 장바구니 CRUD(조회, 상품 추가, 수량 수정, 삭제)<br> 상품주문 작성 | 상품전체 및 카테고리 조회<br> 상품상세페이지 조회<br> 결제기능 |

---

#### 메인 페이지 (상품 리스트)

https://user-images.githubusercontent.com/114500319/220098727-f7bcc524-432e-49f9-b441-87888660fde8.gif

- query parameters과 검색 필터 기능을 이용한 카테고리 및 정렬(낮은 가격순, 높은 가격순, 최신순) 기능 구현.
- SELECT, INNER JOIN 을 이용한 상품 정보 및 이미지 데이터 조회 기능 구현.

#### 상품 상세 페이지

https://user-images.githubusercontent.com/114500319/220099526-2cfd6f84-b6c9-4152-baa6-3c12754114ba.gif

- SELECT, LEFT JOIN, INNER JOIN, JASON_ARRAYAGG, JSON_OBJECT, GROUP BY 을 이용해
  해당 상품에 대한 상품 정보, 옵션별 데이터 조회 기능 구현.

#### 상품검색 조회 기능

- main 페이지로 웹의 첫 화면에서 유저가 타겟팅하고있는 니즈의 제품이 있다면 그 제품에 대한 keyword로 제품을 찾아볼 수 있도록 기능 구현.<br>
  keyword의 검색 할당범위는 제품의 이름, description, 가격, 할인가격, 제품번호에 대하여 검색할 수 있도록 범위를 정해놓음.

#### 회원가입/로그인

https://user-images.githubusercontent.com/114500319/220098696-6d3d77d6-2d64-4305-a855-f630516f12d3.gif

- 회원가입 기능<br>
  - 사용자가 서비스를 이용하는데에 있어서 필수로 들어가야 하는 회원정보들에 대하여 누락되지 않도록 함.<br>
    대신 사용자에 대한 정보를 입력할때에 피로감을 덜기 위해 ID와 비밀번호를 구별하지 않게하여 ID가 email이 되도록 함.<br>
  - 회원가입 정보 입력시 필수로 email, password, phone-number, birthday에 각 항목별로 특성에 맞는 '정규표현식'으로<br>
    가입에 대한 정보의오기입 방지 및 데이터 보관을 획일화 하였음.<br>
  - 중복가입에 대해서 방지하기 위하여 email, phone-number의 정보로 중복검사.<br>
  - 사용자가 회원가입시 암호의 보안을 위하여 bcrypt를 활용하여 비밀번호를 추가적으로 암호화 시킴.

- 로그인 기능<br>

https://user-images.githubusercontent.com/114500319/220098577-4511046c-c863-4db5-92c9-f6557364d9ff.gif


  - 사용자가 로그인할때 사용자에 대한 정보가 옳지 않은 경우(ex.기입오류) 서버에서 잘못된 요청에 대한 error값을 반환 시킬 수 있도록 함.<br>
  - 로그인시 Token을 발행하도록 jwt을 사용하였으며 PC에 제3자가 이용할 수 있는 위험을 어느정도 예방할 수 있도록 Token을 발행로그인시<br>
    해당 유저가 로그인 상태로 지속되어 웹에 활동할 수 있는 시간을 정해주어 24시간으로 token이 expire될 수 있도록 설정 함.<br>
  - jwt를 통해서 발급한 토큰이 차후에 장바구니, 주문서, 결제의 기능에 해당 유저가 이용하기 위한 서비스인것을 인지하기 위해서 유효성 검사기능도 포함시킴.

#### 장바구니

https://user-images.githubusercontent.com/114500319/220099996-3a450f9d-8f85-48ea-bf8a-f9b4fc72fa46.gif

- 회원가입 기반 기능으로, 로그인 된 유저의 token 정보를 기반으로 해당 유저의 장바구니 정보를 데이터베이스에서 사용하도록 구현.
- 장바구니 조회 기능
  - sql raw query의 INNER JOIN과 SELECT 구문으로 장바구니에 담긴 상품을 조회하는 기능을 구현.
- 장바구니 수량 수정 기능
  - 유저의 장바구니 안의 상품별 갯수를 조회하여, 해당 상품의 재고보다 많이 담는 경우 에러를 반환하는 기능을 구현.
  - 장바구니에서 상품 수량 조절 중, 카트 내의 상품 갯수가 0보다 작아질 경우 에러를 반환하는 기능을 구현.
  - 유저의 장바구니 안의 상품 총 가격을 계산하여, 유저 장바구니 내의 총 가격과, 무료배송 여부를 계산하는 기능을 구현.
  - sql raw query의 ON DUPLICATE KEY UPDATE 기능으로 장바구니 안에 없는 상품은 INSERT, 이미 장바구니 안에 존재하는 상품은 UPDATE로 수량만 추가하도록 구현.
- 장바구니 상품 추가 기능
  - PATCH API의 함수 재사용, frontend에서 한번에 여러 상품 정보가 담긴 배열을 request로 받아 상품 종류 갯수만큼 상품을 수정/추가하는 함수를 반복하도록 구현.
- 장바구니 상품 삭제 기능
  - query parameter와 sql raw query의 WHERE IN ( ) 구문을 이용해 상품의 갯수와 상관없이 한번에 삭제 할 수 있는 기능 구현.

#### 주문서 작성 기능

https://user-images.githubusercontent.com/114500319/220100608-5ec601cc-1e18-4b38-8f3f-2094ab7f4e82.gif

- 회원가입 기반 기능으로, 로그인 된 유저의 token 정보를 기반으로 해당 유저의 포인트를 조회해 반환하는 기능을 구현.
- 주문 api로 요청된 상품의 id로 데이터베이스에서 각 상품의 정보를 조회하여 반환하는 기능을 구현.
- 주문 api로 요청된 상품의 id와 수량으로 데이터베이스에서 상품의 가격을 조회하여 실제 결제 예정 금액을 계산하고 반환하도록 구현.

#### 결제 기능

- 결제 시 발생 가능한 예외 핸들링
  - 회원가입 기반 기능으로, 로그인 된 유저의 token 정보를 기반으로 구현.
  - 받아온 주문 정보를 통해 유저의 포인트가 결제 금액보다 많은지 여부 확인 후, 작으면 에러 반환 설정.
  - 주문 수량 > 재고량 일 경우 에러 반환 설정.
  - 받아온 주문 총 가격(+ 배송비 포함)이 서버에 저장된 금액과 일치하는지 확인 후, 금액 불일치 시 에러 반환 설정.
- 트랜잭션을 이용한 결제 기능
  - 결제한 방법에 따른 분류 후, INSERT INTO 를 이용한 주문 정보 저장기능 구현.
  - UPDATE 를 이용해 결제 후 차감될 유저의 포인트 수정.
  - UPDATE 를 이용해 주문 후 차감될 상품 재고 수량 수정.
  - DELETE 를 이용해 상품 결제 완료 후 장바구니에서의 상품 삭제 기능 구현.
- uuid 를 이용해 결제 후 주문 번호 유저에게 반환.

<br>

## Reference

---

- 이 프로젝트는 [배민문방구](https://brandstore.baemin.com/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
