![port-0-lego-front-nx562olfs8ljco sel3 cloudtype app_themes](https://user-images.githubusercontent.com/54573684/230388894-fe5b46e2-000b-478b-9d76-4b432953d6c8.png)

## Demo : https://port-0-lego-front-nx562olfs8ljco.sel3.cloudtype.app/
 
## 주제 : 레고 사이트

## 기술 스택
### FrontEnd : 
### HTML5 / CSS3 / ES6+ / Typescript / React / React-query / Recoil / Next.js 
### SCSS / TailwindCSS / Font Awesome 
<hr />

### BackEnd : 
### Spring Boot / Java / MariaDB / Mybatis / Gradle
<hr />

## 개요
* 레고 사이트를 벤치마킹하여 해당 프로젝트를 진행하였습니다. ( 일부 UI는 수정하여 구현하였습니다 )
* 해당 프로젝트는 개인 프로젝트입니다.( 1인 프로젝트 )
* 배포는 CloudType 서비스를 이용하였습니다.
* 해당 프로젝트에서 보여지는 레고 이미지는 https://www.lego.com 사이트의 cdn 이미지 서버 주소를 활용하였습니다.


## Advanced Feature

### 1. 상품 목록
![port-0-lego-front-nx562olfs8ljco sel3 cloudtype app_themes_technic_theme_title=%ED%85%8C%ED%81%AC%EB%8B%89 theme_id=13](https://user-images.githubusercontent.com/54573684/230398990-68578886-f5d0-49ae-bbcb-e3ecda491114.png)

* [상품 목록] 은 React-query의 useInfiniteQuery로 구현하였습니다.
* 사이드바의 필터 항목은 Sticky와 Scroll을 추가하여 상품 목록 스크롤이 길어지더라도 충분히 반영할 수 있도록 처리하였습니다.
* 왼쪽 사이드바의 필터와 오른쪽 상단의 정렬 선택 을 추가하여 사용자의 Needs에 적합한 상품을 찾을 수 있도록 하였습니다.

### 2. 상품 상세
![port-0-lego-front-nx562olfs8ljco sel3 cloudtype app_products_42143](https://user-images.githubusercontent.com/54573684/230402918-4674c046-f118-463e-b120-d259c88c2c90.png)

* 상품 구매 가능 수량은 장바구니에 담는 수량과 동기화해두어, 결제 시 구매 가능 수량이 감소 되는 것이 아니라
장바구니에 담을 경우 상품 구매 가능 수량이 줄게 됩니다.<br />
https://www.lego.com 에서 [인당 구매 가능 수량]을 제한해두었기 때문에 해당 프로젝트에서도 비슷하게 구현하였습니다.
* 구매 가능 수량이 0이 될 경우 [일시품절] 상태로 변경되며, [파란색 하트 버튼]을 클릭 시 [마이페이지-좋아요] 항목에 추가됩니다.
* 제품상세정보는 Dump 데이터로 모든 상품의 제품상세정보는 같게 처리해 두었습니다.
* [상품 목록 페이지] 에서 [상품 상세 페이지] 으로 이동 시 이전 페이지의 스크롤 위치를 Session Storage에 저장해두어 [뒤로가기] 시 해당 스크롤 위치로 이동하도록 처리하였습니다.
* [상품 상세 페이지] 로 접근하는 경우 Local Storage에 해당 상품 고유 번호를 저장해두어 [마이페이지-최근본상품] 항목에서 보여지도록 처리하였습니다.

### 3. 주문 하기
![port-0-lego-front-nx562olfs8ljco sel3 cloudtype app_order](https://user-images.githubusercontent.com/54573684/230429093-41197c75-65bb-41f7-b9f1-568dd79c2abc.png)

* 원하는 상품을 장바구니에 담게 되면 [마이페이지-장바구니] 항목에서 보여지며, 해당 페이지에서 [주문하기 버튼] 클릭 시 [주문 페이지]로 이동하게 됩니다.
* [주문&배송 페이지] 에서 [배송정보], [상품정보], [결제금액] 을 확인 할 수 있으며, 배송지 등록 후 [결제]를 진행할 수 있도록 처리하였습니다.
* 배송지는 [기본배송지]가 우선이며, 가장 마지막으로 이용한 배송지를 그 다음 우선순위로 지정하였으며 그 이후는 등록순입니다.
* 배송지등록 시 React-Portal 을 활용하여 Modal화면을 구현하였습니다.
* PG는 Portone의 iamport API를 활용하였습니다.
* 현재는 테스트 사이트이기 때문에 iamport 모달 화면 오픈 후 결제 취소 시에도 주문이 되도록 처리하였으며, iamport에서 제공하는 테스트모드 이기 때문에 실제 결제시 환불이 어려울 수 있습니다. ( 참고 URL : https://faq.portone.io/7abcf899-0fd4-4568-b856-3d2f65643d8b )
* 주문 후 주문한 상품들은 장바구니에서 제외됩니다.
* [주문&배송 페이지] 에서 새로고침 시에도 recoil에 저장해둔 Client State를 유지하고 싶었는데 recoil-persist를 사용하여 해결하였습니다.

## 개선 사항
* 반응형 웹 디자인을 적용 x
* 이미지 로딩 속도 해결 및 Prefetching 필요
* 예외처리 시 HTTP Response Status에 따른 처리가 미흡
