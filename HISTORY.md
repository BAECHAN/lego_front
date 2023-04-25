# 프로젝트 개발 일지
 
## 1. 주제 : Lego (가제)
 
## 2. 개발환경

Spring boot /
IntellJ Ultimate /
Java 8 /
Gradle /
MariaDB /
Mybatis
 
HTML5 /
CSS3 /
ES6 + Typescript /
React /
recoil - 클라이언트 상태 관리 /
react-query - 서버 상태 관리 /
Next.js
<br />

Styled JSX /
tailwindcss /
Font Awesome / 
Flex

## 3. 구현 페이지 목록

* 회원가입
* 로그인
* 아이디 / 비밀번호 찾기
<br />

* 마이페이지
* 마이페이지 - 주문 내역 조회
* 마이페이지 - 장바구니
* 마이페이지 - 회원정보
* 마이페이지 - 배송지 관리
* 마이페이지 - 최근 본 상품
* 마이페이지 - 좋아요
<br />

* 레고 테마 목록 페이지
* 레고 상품 목록 페이지
* 레고 상품 상세 페이지
<br />

* 주문페이지
<br />

* 홈화면
<br />

* 탈퇴계정 / 휴면계정 / 잠긴계정 안내 페이지
<br />

## 4. 구현 기능 목록
* 페이지네이션 && 더보기
* 결제하기 ( PG )
* 배너 - '오늘 하루 보지 않기'
* OAuth 로그인 연동
* 최근 본 상품
* 아이디 찾기 & 비밀번호 찾기
* 상품 목록 정렬 & 필터
* 좋아요
* 모달창
* 파일첨부
* 배포 ( CloudType )

## 5. 진행 과정

Next JS typescript 로 프로젝트 생성
<br />
<code>npx create-next-app@latest --typescript</code>

Material UI NPM 추가
<br />
<code>npm install @mui/material @emotion/react @emotion/styled </code>

font awesome NPM 추가 ( 참고 : https://www.daleseo.com/react-font-awesome/ )
<br />
<code>npm i --save @fortawesome/fontawesome-svg-core </code>
<br />
<code>npm i @fortawesome/free-solid-svg-icons </code>
<br />
<code>npm i @fortawesome/react-fontawesome </code>

사용할 때는 fa-camera 면 faCamera로 import해옴
<br />
```
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default () => <FontAwesomeIcon icon={faCamera} />;
```


Next JS에 Typescript 적용하니  
Next JS에서는 Component에 Children 속성을 제공하는데  
children 속성은 Component의 자식 Component가 담겨 있으며   
이를 Typescript로 하려면 React.PropsWithChildren 타입으로 명시해줘야했음

---

### 덤프 데이터
덤프데이터 웹크롤링 후 파싱하여 DB에 저장  

lego 사이트 덤프데이터 생성  

백엔드 서버 생성 후 테스트 확인  
MariaDB + Spring  
```
   @Autowired
    HomeService service;

    @GetMapping("/index")
    public ResponseEntity home() throws Exception {

        List<HomeVO> resultList = service.selectList();
        for(int i=0;i<resultList.size();i++) {
            System.err.println(resultList.get(i).getTheme_id());
            System.err.println(resultList.get(i).getTheme_title());
        }
        return new ResponseEntity(resultList, HttpStatus.OK);

    }
}

Response > 

[{"theme_title":"겨울왕국","theme_id":1},{"theme_title":"닌자고","theme_id":2},{"theme_title":"디즈니","theme_id":3},{"theme_title":"마인크래프트","theme_id":4},{"theme_title":"배트맨","theme_id":5},{"theme_title":"브릭헤즈","theme_id":6},{"theme_title":"비디요","theme_id":7},{"theme_title":"스피드","theme_id":8},{"theme_title":"시티","theme_id":9},{"theme_title":"아이디어","theme_id":10},{"theme_title":"아키텍쳐","theme_id":11},{"theme_title":"크리에이터","theme_id":12},{"theme_title":"테크닉","theme_id":13},{"theme_title":"프렌즈","theme_id":14},{"theme_title":"해리포터","theme_id":15}]
```

서버에서 response 받아오는건 확인했으니 localhost:3000 에서 axios로 localhost:5000 response data 받아오기


### 배너 닫기
배너닫기버튼 만들어줄 예정으로 먼저 공통적으로 사용할 버튼 컴포넌트 생성  
버튼 컴포넌트 생성 - 클릭하면 부모요소 보이지 않도록 처리  
부모요소는 없을수도 있으니 optional chaining 걸고 innerHTML으로 undefined인지 체크하는 narrow 문법 적용  

```
function parentElmtClose(e:React.SyntheticEvent){
      if(e.currentTarget.parentElement?.innerHTML != undefined){
        e.currentTarget.parentElement.className += ' none';
      }
  }
<span onClick={ (event) => {parentElmtClose(event) }}></span>
```


### ※ 주의
next.js에서 서버사이드 렌더링을 할 때 가장 많이 하는 실수가  
window나 document객체가 없음에도 사용하다보니 document is undefined라는 에러 메시지를 많이 보는 것이다.

=> 서버사이드 렌더링과 클라이언트사이드 렌더링을 구분하자

https://velog.io/@lnhyen43/TIL-Next.js-useFormreact-Hook-%EC%9C%BC%EB%A1%9C-%ED%8F%BC-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC


### TailwindCSS 추가

참고 : https://tailwindcss.com/docs/guides/nextjs

<code>
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
</code>

---
### prettier
prettier 적용 - 코드 포맷터  
Dynamic Routes 적용 중 - 파일명과 router.query 명과 일치시켜야 되는거였는데 삽질하였음

### 쿼리스트링으로 한글타이틀 전달 후 Navbar 컴포넌트에 props로 전달하기

Navbar에 현재 페이지명 출력 시 한글로 테마명을 보여주고싶었음

해결방법
1. Link 클릭 시 현재 경로 뿐만아니라 쿼리스트링으로  title_ko라는 한글 테마명을 전달
```
# pages/themes/index.tsx
<Link href={`/themes/${item.theme_title_en}?title_ko=${item.theme_title}`}>
```
 
2. 쿼리스트링 값을 꺼내 Navbar 컴포넌트에 props로 전달, useRouter.query 에는 {title_ko: '닌자고', theme: 'ninjago'} 라는 Object 타입으로 존재

```
# pages/themes/[theme].tsx
export default function Theme(){
  const router = useRouter();
 
  return(
    <div>
      <Navbar currentPage={router.query.title_ko}/>
```
3. Navbar 컴포넌트에서 currentPage라는 props를 Navbar에서 출력함

typescript가 아니였으면 Navbar(prop)으로 끝났을텐데 
typescript여서 Props라는 타입을 생성하여 prop에 타입으로 지정함

```
# components/Navbar.tsx
// Props 타입 선언, 다른 곳에서 Navbar 사용 시 currentPage를 Prop으로 사용하지 않을 수 있으므로

type Props = {
  currentPage? : string | string[] | undefined;	
}

export default function Navbar(prop:Props) {	// Props타입 부착

const router = useRouter();
const [home, series, theme] = ['홈', '시리즈별', prop.currentPage];
```

---

### lint-staged & husky 설치

Git는 Hook이라는 기능을 가지고 있습니다. Git에서 특정 이벤트(add, commit, push 등)를 실행할 때, 그 이벤트에 Hook을 설정하여 Hook에 설정된 스크립트를 실행할 수 있습니다.

lint-staged
lint-staged란 내가 add한 파일들에 대해서 git 파일에 대해 lint와 우리가 설정해둔 명령어를 실행해주는 라이브러리다. pre-commit

(문법 오류나 스타일 오류를 분석하고 표시 및 수정해주는 도구이다.)

husky만 사용하면 프로젝트의 모든 코드를 검사히기 때문에 비효율적이지만,
lint-staged는 Git의 staged한 코드만 검사해서, 보다 효율적인 lint가 가능하다

git staged 상태의 파일들만 타겟으로 뭔가 할 수 있게 해줌

#### husky
husky란 Git Hook을 간편하게 사용할 수 있도록 도와주는 툴입니다.

git hook 동작에 대한 정의를 .git 파일이 아닌 .husky 에서 관리하여
repository 에서 공유가 가능하도록 함

https://velog.io/@jma1020/husky-lint-staged%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

```
yarn add -D lint-staged husky
```
```
yarn husky install
```
```
yarn husky add .husky/pre-commit "yarn lint-staged --no-stash"
```

입력하면 .husky 폴더에 pre-commit 파일 생성

이 상태에서 아래와 같이 코드를 입력하고 commit 하면 commit 하기전에 
eslint --fix와 prettier --write, git add 가 실행 한 다음 commit하게 된다.

```
	.prettierrc
{
  "semi": false,				// 세미콜론 안되도록 설정
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}


	components/Button.tsx
export default function Button() {
  return <div>Button</div>;
}


	package.json
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }


// 커밋하면 lint-staged에서 prettier –-write를 실행 시켜 
// Button.tsx파일에서 세미콜론이 빠진 상태로 commit을 하게 됨
```




