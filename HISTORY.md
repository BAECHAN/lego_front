# 프로젝트 개발 일지
 
## 1. 주제 : Lego 
 
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
### prettier 추가
prettier 적용 - 코드 포맷터  



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

### sitemap 추가
```
yarn add -D next-sitemap
```

### React-query 추가

https://tanstack.com/query/v4
```
yarn add -D @tanstack/react-query
```

### ※ 주의
페이지경로로 직접 이동 시 useRouter의 query를 가져오는 것보다 fetch해서 데이터를 가져오는게 빨라서 api/getProductInfo?product_number=NaN 이런식으로 경로가 넘어가서 데이터를 못불러오고 있었기 때문에 

기존에는 useEffect를 써서 데이터가 변경되면 렌더링을 다시하는 식이였는데 useQuery도 데이터를 보고 있다가 변경이 되면 렌더링을 하는 방식이기 때문에 
getServerSideProps에서 context를 이용하여 현재 경로를 가져와 fetch 처리하도록 함

```
# [product_number].tsx
export async function getServerSideProps(context: any){
 
  return {
    props: context.query
  }
}

export default function Product(props: any) {
  const { data: product } = useQuery<ProductT>(['http://localhost:5000/api/getProductInfo'], async () => {
    const res = await fetch(`http://localhost:5000/api/getProductInfo?product_number=${Number(props.product_number)}`);
    return res.json();
  },
  {
    onSuccess: data => console.log(data),
    onError: e => console.log(e),  
  });
```

### font-awesome regular와 solid 같이 쓰고싶은데 변수명이 같을 경우

```
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
// 하나를 alias 주면 됨
```

---

### 캐러셀 이미지 웹크롤링
lego_insert_detail_img.py 파일 참고

### 회원가입 

유효성검사 RegExp 추가  
회원가입 시 form 전송

#### ※ 이메일 중복 onchange 발생 시 마다 검사
회원가입 시 이메일 중복 체크 시 타이핑할때 ( input onchange ) 중복검사 api를 날려서 실시간으로 중복에 대한 상태값을 보여주고 싶었지만  
서버에 부담이 되는 것을 감안할 정도인가 생각하였을 때는 좋지 않아보임.  
모든 타이핑이 아닌 정규표현식을 통과하였을 경우에만 api 전송시키지만  
다른 상황에선 계속 api요청을 보내게 될 수 있기 때문에 onchange 혹은 oninput으로 api 요청을 계속 보내기보다는 onBlur 시 처리하는게 합리적으로 보임

#### 비밀번호 암호화
Crypto 라이브러리 추가  
<code>npm install -D @types/crypto-js</code>
비밀번호 암호화 시 관리자도 확인할 수 없도록 해야하므로 단방향 알고리즘인 hmacSHA512를 사용

```
const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY

if (secretKey !== undefined) {
	hashedPw = crypto.HmacSHA512(pw, secretKey).toString()
	
} else {
	alert('secretKey is undefined')
	return false
}


const userInfo = {
	email,
	pw : hashedPw,
	pwChk,
	nickname,
}
```

#### 로그인 시 비밀번호 보임 추가 및 회원가입 시에는 비밀번호 보임 추가하지 않음

=> 로그인시 password 보임버튼 추가, 회원가입시 input type=password 면 복붙 할 수 없게끔 처리해주기 때문에 회원가입할 경우에는 password 보임버튼을 추가하지 않음

### Next-Auth

OAuth로 카카오와 구글을 채택  
<code>yarn add next-auth</code>

#### JWT_SESSION_ERROR - 로그인이 안될 경우
https://stackoverflow.com/questions/71385330/next-auth-jwedecryptionfailed

#### Oauth로 ㄴ이버, ㅋ카오, ㄱ글 로그인 시 callbackUrl 사용하기
https://stackoverflow.com/questions/65034405/redirect-after-successful-sign-in-or-sign-up-for-credentials-type-in-next-auth

#### ※ 주의. 구글 OAuth 작업 중 
<b>액세스 차단됨: 이 앱의 요청이 잘못되었습니다</b>  
=> 에러 발생하여 구글클라우드 콘솔창에서 redirect url을 추가함

https://console.cloud.google.com/apis/credentials?project=lego-377701

※ useSession에 저장되는 data의 key가 한정되어있음( email , name, image )  
GoogleProvider 같은 OAuth 기반의 Provider는 Profile라는 속성으로 custom 가능해보임

https://next-auth.js.org/v3/configuration/providers#credentials-provider

근데 나한테 필요한건 CredentialsProvider인데 찾아보니useSession으론 안되고 jwt ( next-auth/jwt )를 사용해서 token으로는 전달가능

---

#### ⧭ 로그인 후 유저의 state( 휴면계정, 잠금계정, 탈퇴계정 등.. )로 UI로 response 던져주기

이해를 돕기 위해 “일반 유저 계정”과 “사용자 계정”을 예로 들면 admin인 경우 /admin 으로 redirect시키는 등의 작업을 하고 싶음 ( Spring으로 따지면 Interceptor 역할을 하는 )

1. [...nextauth].ts에서 user 객체에 role 이라는 key를 추가함 
```
authorize: async (credentials, req) => {
        let url = process.env.SERVER_URL + '/api/login-chk'
       
        let res: any = await axios
          .get(url, {
            params: {
              email: credentials?.email,
              password: credentials?.password,
            },
          })
          .then((response) => {
            const user = response.data.result


            if (user) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: 7
              }
            } else {
              return null
            }
          })
```

2. [...nextauth].ts에서 config도 수정 ( session:  , callbacks: )
하지만 callbacks: jwt 의 params 에서 user타입이 이미 정해져있어서 아래와 같이 에러 발생
사진에 보이는 params.user타입에 role을 추가하여 에러를 없앰

```
session: {
    maxAge: 24 * 60 * 60, // 1 days,
    strategy: "jwt"
  },
  pages: {
    signIn: '/login',
    error: '/signin',
  },


  callbacks: {
    async session({ session, token, user }) {
      return session
    },
    async jwt(params){
      if(params.user?.role) {
        params.token.role = params.user.role;
      }
      return params.token
    }
  },
```
3. middleware.ts 에서 페이지 호출 시 interceptor같은 역할을 해주고 있으므로 이 곳에서 redirect 처리함

참고 : https://www.youtube.com/watch?v=ollnut-J47s

나는 잘 안되서 custom해서 코드 작성
```
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest, response: NextResponse) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })


	// session 체크할때마다 
  if( request.nextUrl.pathname == '/'){


    if(session?.state){


      if(session.state != 1){
        const url = request.nextUrl.clone()
        url.pathname = '/notice/login_notice';
        url.searchParams.set('state',String(session.state));	// url parameter 작성
        return NextResponse.redirect(url)
      }
    }
  }
```

### next/router

javascript에서 회원가입 후 로그인 페이지로 이동 시
location.href = ‘/login’ 을 써왔는데 NextJS로 SPA 프레임워크에서는 새로고침 발생 시 기존에 참고하고 있던 데이터도 다시 재로딩 해야되기 때문에 
Router.push를 이용한다.

onSuccess: () => {
        alert('회원가입되었습니다.\r로그인 페이지로 이동합니다.')
        Router.push("/login");
        //location.href = '/login'
      },


---

### Dropdown

사이드바 필터 시 드롭다운이 필요해서 만드는데 드롭다운 버튼과 체크박스 영역을 컴포넌트를 어떻게 나누어야할 지 
고민이였다.  

일단 둘을 하나의 컴포넌트로 빼두고 드롭다운 버튼 클릭 시 useState로 isOpen 이라는 state를 만들어서 false면 닫고 true면 열게 끔 처리  

그러던 와중 체크박스 클릭 시 드랍다운 버튼도 같이 눌려서 ( 이벤트 버블링 ) 발생하여 
이벤트 전파를 막기 위해 모든 li 태그에 event.stopPropagation() 적용  

드롭다운에서 애니메이션 추가 관련

애니메이션을 굳이 추가할 필요 없이 transition으로만 처리하려고함
transition은 숫자의 증감으로 변화를 인식하기 때문에 갑자기 바뀌는 display: hidden 같은 속성은 transition이 안되기 때문에 height 를 0 에서 특정 px 까지 하는거로 변경함

### 화면 이동 시 ( 닌자고 카테고리에서 디즈니 카테고리로 이동하였는데 선택된 필터가 안풀리는 상황이 발생하여 theme에 접근할 때마다 recoilReset 처리함

```
// [theme_title_en].tsx
const recoilReset = useResetRecoilState(selectedFilterSelector);

useEffect(()=>{
  recoilReset();
},[])
```

### React에서 Object를 key value 반복문 처리하여 element로 보여줄 때

```
// Navbar.tsx
const mypageObj: ObjT_Str = {
    viewed_products: '최근 본 상품',
    orders: '주문 내역 조회'
  }

return (
{
        Object.keys(mypageObj).map(key => {
          return (
            router.pathname.indexOf(`/mypage/${key}`) > -1
            ? <p key={key} className='inline'>
                <FontAwesomeAngleRight />
                <Link href={`/mypage`}>
                  <a>{mypage}</a>
                </Link>
       
                <FontAwesomeAngleRight />
                <span>{mypageObj[key]}</span>
            </p>
            : null
          )
        })
      }
)
```

### 최근 본 상품 

1) DB에 저장
2) 쿠키에 저장
3) 로컬스토리지에 저장

이 정도 방법을 떠올릴 수 있었는데 

db에 저장하기에는 1. 비회원의 경우에도 제공했으면 좋겠기도했고 2. db에 저장하기에는 리소스를 너무 많이 잡아먹겠다는 생각도 있었으며 3. 서버로 계속 통신을 보내는 것도 비효율적으로 보임

쿠키에 저장하기에는 
1. request 시 최근 본 상품을 같이 보내줘야하는데 굳이 보낼 필요 없음 나중에 진짜 필요할 때만 보내주면 됨 
2. 만료기한이 있다.( 오랜 시간이 지난 후 상품을 다시 봤을 때 살 수도 있으니 냅두면 사용자에게 더 많은 물건을 판매할 수 있지 않을까 생각 )

로컬스토리지에 저장하기에는 1. 만료기한이 없어 오랫동안 클라이언트의 자원을 잡아먹는다.

**<<로컬스토리지에 저장하는거로 결정>>**

배열 중복 제거는 new Set( 배열 ) 로 처리하여 중복제거하는게 효율적

최근 본 상품 오픈 시

로컬스토리지의 배열객체로 for문 돌려서 화면에 출력

로컬스토리지 아예 없으면 = localstorage.getItem == null 이면
=> 현재 데이터만 setItem

로컬스토리지 있는데 localStorage.getItem에 내 번호가 있으면
=> getItem으로 가져오고 JSON.parse로 배열화 시킨 후 
현재 데이터를 unshift함수로 맨앞에 추가 후 new Set()으로 중복 제거 후 JSON.stringify로 JSON화
setItem(JSON화한 데이터)

로컬스토리지 있는데 localStorage.getItem에 내 번호가 없으면
=> 위와 동일하게 처리해도 될 것 같아서 viewedProductsJSON의 null 유무만 체크하여 처리

```
const viewedProductsJSON:string | null = localStorage.getItem('viewed_products');
let viewedProductsArr: string[] = [];

if(viewedProductsJSON){
	viewedProductsArr = JSON.parse(viewedProductsJSON)

	viewedProductsArr.unshift(props.product_number)

	const viewedProductsSet = new Set<string>(viewedProductsArr)
	const viewedProductsSetJSON = JSON.stringify(Array.from(viewedProductsSet))

	localStorage.setItem('viewed_products',viewedProductsSetJSON)
}else{
	localStorage.setItem('viewed_products',JSON.stringify([props.product_number]))
}

```


#### ※ 주의. 만약 localstorage is not defined 에러 발생 시
Next js는 서버에서 렌더링 후 클라이언트에서 렌더링 되기 때문에 
서버 렌더링 시에는 window객체가 없어 오류가 발생 ( document.getElement 등의 객체 선택도 안되는 건 이러한 이유때문임 ) 때문에 아래 와 같이 분기 처리하여 
클라이언트 렌더링 시 해당 코드가 실행되도록 처리합니다.
```
// viewed_products.tsx

let viewedProductsArr = useRef([]);

if(typeof window !== 'undefined'){

const viewedProductsJSON:string | null =localStorage.getItem('viewed_products');

viewedProductsJSON
    ? viewedProductsArr.current = JSON.parse(viewedProductsJSON)
    : null
  }

const { data: data } = useProductsViewedList(viewedProductsArr.current)
		
		
// useProductsViewedList.ts

const useProductsList = (props: string[]) => {

  const [page, setPage] = useState(0)
  let url = 'http://localhost:5000' + '/api/getProductViewedList?page=' + page

  return useQuery(
    ['getProductViewedList', page],
    async () => {
      const res = await axios.post(
        url,
        {
          product_number_arr: props,
        },
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      //getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
      keepPreviousData: true,
      enabled: props.length > 0
    }
  )
}
```
#### ※ 주의. 위에서는 Post 메서드로 api를 요청하였지만, Restful API를 생각하면 Get 메서드로 요청하는게 맞을 거 같아 수정하려했더니 배열 직렬화가 필요해서 처리함

```
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import qs from 'qs'


const useProductViewedList = () => {

  const queryKey = queryKeys.productViewedList

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  let viewedProductsJSON: string[] = []

  if (typeof window !== 'undefined') {
    viewedProductsJSON = JSON.parse(localStorage.getItem('viewed_products') as string)
  }

  const params = {
    product_number_arr: viewedProductsJSON,
  }

  return useQuery(
    [queryKey],
    async () => {
      const res = await axios.get(
        url,
        {
          params,
          paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: 'repeat'})
          },
          headers: { 'Content-Type': `application/json; charset=utf-8` }
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
      keepPreviousData: true,
    }
  )
}

export default useProductViewedList
```

최근 본 순서대로 select 결과가 뿌려주었으면 싶었는데 배열 값들만 넘어가서 순서가 내가 원하는 바와 다르게 나와서  
mybatis에서 foreach로 in절에 값을 넣은 순서대로 order by 처리해주었음
최근 본 상품 개수 제한하기  
=> 나는 10개로 제한 함  

```
if (viewedProductsJSON) {
   viewedProductsArr = JSON.parse(viewedProductsJSON)
 
   viewedProductsArr.unshift(props.product_number)
   viewedProductsArr.length = 10		// 배열.length = 10으로 고정
```

### 상품 상세보기 클릭했다가 상품 목록으로 다시 이동했을 때 스크롤바 기억하기

무슨 방법이 있을까 하여 
1. store에 저장  
2. session storage에 저장 ( 브라우저 창이 켜져있는 상태에서 목록 페이지 url 입력 시 session이 남아 초기 화면에서도 스크롤이 이동되어진 상태가 되어버림 => 분기처리해서 뒤로가기 버튼으로 접근했는지 판단하여 처리하게끔 함 )
https://selfish-developer.com/entry/nextjs-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%A0%80%EC%9E%A5-%EA%B8%B0%EC%96%B5%ED%95%98%EA%B8%B0
3. cookie에 저장
4. next js에서 제공하는 게 있지 않을까 생각 -> 제공한다고는 하는데 버전에 따라 다른듯? 저는 안되었음
5. parameter로 넘겨준다 ( mpa 프레임워크에서 사용했던 방법 )

https://nookpi.tistory.com/38 에 작성된 내용을 따르면

CRA 프로젝트를 진행하면서는 스크롤 상태 유지(scroll restoration)를 하기 용이했다.
근데 next로 넘어오면서 자체 라우팅 시스템을 사용함에 따라 react-router-dom을 사용한 기존 방식
(router에서 넘어온 history객체 내에 action을 감지해서 pop 식별 후 처리)을 사용할 수 없게 되었다.
 Next 내부에서 기본적으로 스크롤 복원 기능을 제공하기는 한다.

=> REACT로만 스크롤 상태 유지 하는 방법과 NEXT JS로 유지하는 방법이 다름
NEXT 에서 제공하는 기능이 있나 봄

=> 처리방법

상품목록페이지에서 상품상세페이지 클릭 시 현재스크롤바 위치를 sessionStorage에 저장하고
상품상세페이지 이동하는거도 next/link 사용하고 있었는데 바로 이동시키지 않고 
onclick태그를 사용하여 sessionStorage에 저장 하고 router.push로 페이지 이동

( localStorage를 안쓰고 sessionStorage를 한 이유는 localStorage는 화면을 닫아도 남아있기 때문 
=> 근데 어차피 removeItem으로 지울 거 같긴한데 
=> 목록페이지로 와서 지우는거지 상세페이지에서 닫으면 안지워짐 )

onClick 속성은 
<Link href=’/’>
	<a onClick>
</Link>
로 주었다가 onClick 후 router.push 와 Link href=’/’ 가 충돌할 수 있겠다 싶어서
Link태그 없애고 <a onClick> 으로만 처리
	
```
const handleClick = (path: string) => {
    sessionStorage.setItem('scrollY', `${window.scrollY}`)
    router.push(path)
  }

return (
    ...
          <a
            onClick={() =>
              handleClick(`/products/${props.product.product_number}`)
            }
          >
)
```
상품의 상세페이지로 이동 후 뒤로가기 버튼 감지( useRouter.beforePopState 메서드 활용 ) 하면 sessionStorage에 뒤로가기버튼으로 목록페이지를 접근했는지를 알기 위해 
( 뒤로가기버튼으로 접근했는지 분기처리 안하면 목록페이지를 새로 접근해도 계속 스크롤바를 들고 있기 때문에 ) 
sessionStorage에 추가  
		  
```
useEffect(() =>
    router.beforePopState((state) => {
      sessionStorage.setItem('isHistoryBack', 'true')
      // state.options.scroll = false	// 이건 beforePopState의 속성으로
							// false면 스크롤 최상단으로 , true면 스크롤 유지		
      return true
    })
  )
```
뒤로가기 버튼 클릭하여 다시 상품 목록페이지로 오면 useEffect로 sessionStorage에서 뒤로가기버튼으로 접근했는지 저장해둔 sessionStorage를 꺼내서 true면 scrollY값을 sessionStorage에서 또 꺼내가지고 지정

근데 지정이 안되길래 setTimeout(()=>{ window.scrollTo(0, sessionStorage에서 꺼낸 값 } , 0)  하면 된다는데 안되가지고 확인해보니 0이 아니라 시간이 늘리면 setTimeout 잘 되면서 이동하긴 함 
렌더링 문제인 것 같아보이는데 useEffect는 렌더링이 다 끝나고 실행되는 부분인데도 이렇게 됨
아마 하위컴포넌트의 useEffect라서 상위컴포넌트의 렌더링은 덜 끝난 상태에서 하위컴포넌트의 렌더링만 끝났다 판단해가지고 이런 현상이 발생한 것 같음=> _app.tsx에서 했는데도 안되네..

아무튼 scrollTo 처리 하고 sessionStorage.removeItem 으로 sessionStorage 제거 ( 안그러면 기록이 남아서 스크롤바가 나중에도 처리 될 수 있음 )

또한 setTimeout도 컴포넌트 위에서 사용했다보니 clearTimeout도 써줌

만약 뒤로가기버튼으로 접근 안하고 그냥 접근했을 경우에는 원래대로 처리
		  
```
useEffect(() => {
    if (sessionStorage.getItem('isHistoryBack') === 'true') {
      let scrollRestoration = setTimeout(() => {
        window.scrollTo(0, Number(sessionStorage.getItem('scrollY')))
        sessionStorage.removeItem('scrollY')
      }, 100)

      sessionStorage.removeItem('isHistoryBack')
     
      return () => clearTimeout(scrollRestoration)

    } else {
      recoilReset()
      setTheme(props)
    }
  }, [props, recoilReset, setTheme])
```
		  
### Wish List (좋아요 혹은 찜하기)
		  
하나의 id에 여러 product_id를 담을 수 있도록 서버에 저장하여 처리  
client_side에 저장할지 server_side에 저장할지 고민했었는데   
처음에는 client_side에 저장하려고 했었음 ( 사용자 UI에만 영향을 주지 않을까 하여.. )  
그런데 생각보다 자주 api 요청을 보낼 수 있지 않을까 싶어 server_side에 저장하기로 정함  
  
물론 나중에 좋아요로 다른 사람들에게도 보여질 수 있는 경우 ( 예를들어 상품 정보에서 좋아요 수가 보인다던가 ) 하게 될 수도 있으니 더더욱 server_side에 저장하도록하여 react_query로 저장
		  
**좋아요 한 리스트 가져오려고 /api/getProductWishList api 에**  
**useSession으로 가져온 session.user.email을 react-query로 api 요청할 때**  
**session이 안가져온 상태에서 api요청을 날리다보니 에러가 발생하여 enabled로 처리하니까 됨**  

```
const useProductsWishList = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()


  let url = 'http://localhost:5000' + '/api/getProductWishList?page=' + page + 
'&email=' + session?.user?.email
 
  return useQuery(
    ['getProductWishList', page],
    async () => {
      const res = await axios.get(url)
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email
    },
  )
}
```

상품 목록 리스트에서 좋아요 버튼 클릭되어있는 상품이 있는 상태에서 filter 혹은 sort 시

좋아요 버튼이 이전 위치에 계속 유지되는 경우가 발생함 ( 상품은 바뀌었지만 button눌러짐은 유지되는 중 )
=> 상품 목록 리스트를 가져오는 react-query에 option으로 keepPreviousData: true 를 주면
다음 데이터가 fetch 되기전 까지 이전 데이터를 유지하게 되어 이를 풀어주니까 해결됨


ButtonWish.tsx파일에서 useProductWishList.ts 파일의 return은 react-query인데

좋아요 눌려진 상품들의 목록을 가져와서 보여지는 상품 목록들과 product_id가 일치하는 경우가 있으면
useState에 있는 wishInfo를 setWishInfo로 값을 세팅하여 wish가 1이면 좋아요가 눌러진 버튼으로 처리

만약 좋아요 버튼 클릭하여 handleClickLike 함수를 실행 시 session 없으면 login화면으로
session 있으면 좋아요 반영하고 email과 product_id를 파라미터로 update 처리합니다

만약 좋아요가 안되어있었으면 addWishAPI로 데이터 갱신해주는데 기존에 user_wish 테이블에 있었으면
update wish = 1로 처리, 없었으면 insert 처리
해당 쿼리는 insert into ~ on duplicate key update 문법을 사용 ( 오라클의 merge 문법과 비슷 )

```
insert into user_wish(wish_id, email, product_id)
        values(
            (   select wish_id
                from user_wish a
                where a.email = #{email} and a.product_id = #{product_id}
            ), #{email}, #{product_id}
        ) on duplicate key update date_updated = now(), wish = 1;
```
여기서 wish_id는 auto_increment라 위와 같이 처리

insert하려는 테이블의 pk가 중복되면 update처리 pk가 없으면 insert 처리

좋아요가 되어있었으면 delWishAPI로 update wish = 0으로 처리

고민이 되는 부분은 wishInfo를 list형식으로해서 react-query로 관리하였다면 더 쉽게 처리할 수 있었을 것 ( oldData도 활용하기 가능한데 아래의 코드에서는 임의로 지정하여 불안정 해보임 )

아래와 같이 한 이유는 좋아요 목록 리스트를 한번 더 활용하려고 억지로 짜둔 코드인데 
	return data를 관리하기가 어려울줄 몰랐음

작업 중 좋아요 버튼 클릭 시 api는 바로바로 요청이 가지만 return 받아오는데 시간이 걸려 useState가 바로바로 반영이 안되는 현상이 발생하여
useMutation에서 제공하는 옵션 중 Optimistic update라는 기능이 있는데 이 기능은
api 요청 후 response를 받기 전에 미리 완료 처리되었다고 판단하여 UI에 미리 적용하는 방식이 있어서
적용함
대신 실패 시에는 rollback 처리해 주어야함 ( 이마저도 react-query로 data를 다루었다면 데이터의 안정성이 높아졌을거라 보인다. )
참고 : https://velog.io/@raverana96/react-query-Optimistic-Update 블로그의 스크롤 35% 지점부터 보면됨

참고 : https://tanstack.com/query/v4/docs/react/guides/optimistic-updates

delWishAPI는 useMutation 시 Optimistic update 안하였는데 addWishAPI가 오래 걸림
```
const [wishInfo, setWishInfo] = useState({
    product_id: props.product?.product_id,
    wish: false,
  })


  const { data: session } = useSession()


  const router = useRouter()


  const { data } = useProductWishList()


  useEffect(() => {
    if (data?.wishList.length > 0) {
      for (let wish of data.wishList) {
        wish.product_id == props.product?.product_id
          ? setWishInfo({
              product_id: wish.product_id,
              wish: true,
            })
          : null
      }
    }
  }, [data?.wishList, props.product?.product_id])


  const addWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      const res = await axios.post(
        'http://localhost:5000/api/add-wish',
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onMutate: () => {
        setWishInfo({
          ...wishInfo,
          wish: !wishInfo.wish
        })


        return () => {
          setWishInfo({
            ...wishInfo,
            wish: !wishInfo.wish
          })
        }
      },
      onSuccess: (data) => {
        // setWishInfo({
        //   product_id: data.product_id,
        //   wish: data.wish,
        // })
      },
      onError: (error, values, rollback) => {
        if(rollback){
          rollback()
        }else{
          console.log(error)
        }
      },
    }
  )


  const delWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      const res = await axios.patch(
        'http://localhost:5000/api/del-wish',
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => {
        setWishInfo({
          product_id: data.product_id,
          wish: data.wish,
        })
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )


  const handleClickLike = () => {
    if (session) {
      let param: ProductWishSubmitT = {
        email: session.user?.email,
        product_id: props.product?.product_id,
      }


      if (!wishInfo.wish) {
        // wish 등록 - 만약 wish 이력 있으면 patch 처리 , wish 이력 없으면 post 처리
        addWishAPI.mutate(param)
      } else {
        // wish 취소 - wish 이력 있을거니까 patch 처리
        delWishAPI.mutate(param)
      }
    } else {
      signIn()
    }
  }


  return (
    <button
      type="button"
      name={String(props.product?.product_id)}
      className="flex justify-start cursor-pointer"
      onClick={handleClickLike}
    >
      {wishInfo?.wish == true ? (
        <FontAwesomeIcon
          icon={faHeartSolid}
          className="ml-5 w-4 text-blue-700"
        />
      ) : (
        <FontAwesomeIcon icon={faHeart} className="ml-5 w-4 text-blue-700" />
      )}
```



좋아요 페이지에서 좋아요 취소해도 바로바로 상품이 목록에서 안보여지게 처리하지는 않았는데
혹시 좋아요를 다시 누를수도 있으니 바로 지워지게끔은 하지 않았습니다.
물론 데이터상으론 처리된 상태이고 새로고침하거나 페이지에 재진입 시에는 좋아요 취소한 상품은 보이지 않게 됩니다.

### 아이디찾기 & 비밀번호찾기
아이디찾기는 회원가입 시 회원을 구분을 할 수 있는 unique한 데이터는 이메일이고  
이메일은 아이디 이기 때문에 이메일 체크하는 입력란으로 대체해야할 듯  

아이디찾기 페이지
비밀번호찾기 페이지

아이디찾기 & 비밀번호찾기 toggle 버튼은 컴포넌트로 따로 분리

#### 아이디찾기
아이디 찾기 시 사용자가 직접 아이디를 검색하여 회원가입되어있는지 체크
회원가입되어있지 않다면 회원가입페이지 이동 링크를 화면에 띄워줌

#### 비밀번호찾기
비밀번호 찾기 시에는 이메일(아이디)를 검색하여 아이디가 존재하면 해당 이메일로 이메일 send
이때 send는 next-auth email에서도 사용되는 nodemailer 라이브러리 사용할 예정
	    
```yarn add nodemailer```

ts파일에서 import 에러나서
```npm i --save-dev @types/nodemailer```

하고 import다시 걸어주면 에러없어짐


아이디가 존재하지않으면 회원가입 혹은 로그인 링크를 화면에 띄워줌


nodemailer 에서 gmail계정을 사용하여 이메일 보내기

### 장바구니
react-query에 저장할지 recoil에 저장할지 고민..

recoil에도 초기값에 react-query의 초기 데이터를 저장시켜둠
장바구니에 있는 상품들 중 결제페이지 까지 가져갈 상품들은 체크박스의 유무에따라 처리하는데

체크박스 onInput 이벤트 발생 시 체크박스 되어있으면 recoil의 atom에 추가
체크박스 안되어있으면 atom에서 빼기

cart 화면 처음 페이지로 갈 때 재렌더링이 발생하다보니 selectedOrder의 값이 계속 늘어남
( 상품은 원래 7개 인데 6개만 체크한 상태로 화면을 이동했다가 다시 돌아오면 +7이 또 되서 13개가 됨 )
	    
```
useEffect(()=>{
    if(isFetched){
      data.cartList.map((item: ProductCartT, index: number) => {
        setSelectedOrder((selectedOrder) => [...selectedOrder, item.cart_id])
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isFetched])
```
그래서 아래와 같이 useResetRecoilState를 사용
```
const { data, isFetched } = useProductCartList()
const [selectedOrder,setSelectedOrder] = useRecoilState(selectedOrderSelector)

const handleClickRecoilReset = useResetRecoilState(selectedOrderSelector)

useEffect(()=>{
    if(isFetched){
      handleClickRecoilReset()

      data.cartList.map((item: ProductCartT, index: number) => {
        setSelectedOrder((selectedOrder) => [...selectedOrder, item.cart_id])
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isFetched])
```

### useMutation 후 useQuery의 데이터를 refetch처리하기
	    
장바구니에서 삭제 시 장바구니 목록 을 refetch 하고 싶었음
useMutation onSuccess 후 useQuery를 refetch 처리함

useMutation하여 update하는 patch api 요청 후 refetch() 함수 실행하여 해당 장바구니 화면에서 바로 삭제시킴
```
const { data, refetch } = useProductCartList()

const handleClickDelete =(e: React.MouseEvent<HTMLButtonElement>) => {
    if (session?.user?.email) {
      let param: ProductUpdateCartSubmitT = {
        email: session.user.email,
        cart_id: Number(e.currentTarget.name.substring(15))
      }
      delCartAPI.mutate(param)
    }
  }

  const delCartAPI = useMutation(
    async (param: ProductUpdateCartSubmitT) => {
      const res = await axios.patch(
        'http://localhost:5000/api/del-cart',
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => {
        console.log(data)
        if(data.result == 1){
          refetch()
        }
      },
      onError: (error) => console.log(error)
    }
  )
```
### React-cookie
```yarn add react-cookie```

공식문서 - https://www.npmjs.com/package/react-cookie

예제 - 로그인에 쿠키 붙이는건 레퍼런스 많으니까 저는 Banner 로 “ 오늘 하루 보지 않기 “ 버튼 구현

1) useEffect로 cookie가 있으면 isClose라는 useState<boolean> true로 주고 없으면 false로 줌
2) 배너에서 “오늘 하루 보지 않기” 닫기 버튼을 클릭하면 handleClickClose함수가 실행되어
isClose 스위치 시키고 setCookie로 expires를 new Date로 계산한 후 하루를 저장시켜
만료되면 쿠키가 삭제되게끔 함
```
// 1. 최상단 Root에 추가
// _app.tsx

import { CookiesProvider } from 'react-cookie'

return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
        </QueryClientProvider>
      </CookiesProvider>
    </SessionProvider>
  )

// 2. 쿠키 생성 및 쿠키 판별( setCookie, getCookie )
//component/Banner.tsx
	    
import { useCookies } from 'react-cookie'

export default function Banner() {

  const [cookies, setCookie] = useCookies(['lego-cookie'])	// 1. useCookies 훅 선언
  const [isClose, setIsClose] = useState(false)			// 닫기버튼 state

  useEffect(()=> {
    cookies['lego-cookie'] ? setIsClose(true) : setIsClose(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleClickClose = () => { // 닫기 버튼 클릭 시 실행 될 코드

    setIsClose(!isClose)		// 닫기 버튼 클릭하여 state 전환

    let after1d = new Date();	// new Date로 현재 시간 가져옴
    after1d.setDate(after1d.getDate() + 1)	// setDate로 1일 추가

    // 2. setCookie 사용하여 cookie 생성
    setCookie(						// setCookie( name, value, option? )
'lego-cookie', 					// name
'banner',						// value ( JWT Token 코드를 넣거나 함 )
 { 							// option
    path: '/', 					// path : 쿠키 경로 ( 모든 페이지에서 쿠키에 
                                        // 액세스할 수 있도록 하려면 ‘/’ 경로로 사용
    expires: after1d, 				// expires : 쿠키 기한 만료 날짜
    sameSite: 'strict', 			// sameSite : 자세한 내용은 하단의 samesite참고
    /** httpOnly: true */			// httpOnly : 브라우저에서 쿠키 못읽게
})


  }

  return (
    <div>
    {
      !isClose ?
        <button
          id="bannerClose"
          className="mr-5 -ml-5 text-gray-500 hover:cursor-pointer hover:text-black"
          onClick={handleClickClose}
          title="오늘 하루 보지 않기"
        >
        </button> : null
    }
    </div>
  )
}
```
	    
#### ※ 주의 발생할 수 있는 에러 
Error : Hydration failed because the initial UI does not match what was rendered on the server.
=> Next js는 서버사이드 와 클라이언트 사이드 둘다 실행되기 때문에 클라이언트 사이드에서 실행될때만
처리해줘야함 ( 원래 isClose라는 useState에 초기값으로 바로 주었다가 에러 나서 useEffect 안에서 처리 )
	   
###  HttpOnly
*tip. 서버에서 생성한 쿠키가 개발자도구 – Application에는 있지만 document.cookie에는 읽히지 않는 이유
console.log(document.cookie); // ‘’
=> 개발자도구 – Application에서 해당 쿠키가 HttpOnly인 경우는 읽히지 않음

### SameSite

2020년 초부터 chrome에서는 samesite default값을 samesite=none에서 samesite=Lax로 변경하였습니다. 비어있으면 samesite=Lax 되어있는 것임
 
samesite 옵션
1) none : 현 주소의 url과 다른 url을 가진 리소스를 화면에서 보여주고 있을 때 현 주소의 url에 해당하는 쿠키를 다른 url에 모두 전송
 
2) strict : 내가 접속한 사이트의 주소 표시창을 봤을 때 이와 동일한 사이트의 경우에만 쿠키가 전송됩니다.
 
3) Lax : Strict와 같이 동일한 사이트의 경우에만 쿠키가 전송되는데 추가적으로 a태그 등으로
링크를 눌러서 다른 사이트의 url로 이동하는 경우 쿠키값을 붙여서 넘겨줍니다.
 
same site의 이점 :
1) 예전에는 모든 HTTP 요청에서 브라우저에 쿠키가 저장되어 있다면 그 쿠키값을 활용하여 고객(클라이언트) 맞춤광고 식으로도 가능하였고 또 어떠한 서버들은 그 쿠키를 활용하지 않고 버리는 서버가 있을 터 인데
유저입장에서 내 쿠키가 일단 전송은 되고, 어떤 서버에서 어ᄄᅠᇂ게 활용되는지는 알 방법이 없었지만
지금은 samesite값이 어떤지에 따라 쿠키값이 어ᄄᅠᇂ게 활용되는지 고객이 확인할 수 있음
2) 보안적인 관점에서의 이점도 있는데 사이트가 다를 경우 쿠키값을 보내지 않으니ᄁᆞ CSRF같은 공격도 방어가 되고 samesite가 none인 경우 secure 플래그를 사용하라고 기본 설정으로 바뀌게 되면서
cross site간의 쿠키 전송할 때는 무조건 HTTPS로 전송해야함 ( 쿠키 생성 시 httpOnly 옵션 true로 )
 
samesite 활용하기 :
SameSite를 default값으로 Lax를 설정해야하며 None인 경우 secure 플래그를 붙여서 쿠키를 넘겨주어야함
=> 현재 속성값이 바뀌긴 하나 localhost 주소로 생성되는 쿠키의 samesite를 바꿔야 하는게 아닌 youtube ( 외부링크 ) 에 대해서 samesite 설정을 바꿔줘야하기에 로컬에서는 되지 않을 것으로 보임

### 특정 페이지에서 로그인 페이지로 이동 시 로그인 성공하면 이전 페이지로 routing하기
next/router에서 next/auth으로 로그인 시 이전페이지 ( callbackUrl ) 경로를 받아올 수 있다.
http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fthemes
router.back 객체를 사용하면 뒤로가기를 바로 사용할 수 있지만 url이 뭔지 까지는 모름
그렇기 때문에 routing할때 callbackUrl을 같이 보냄
받은 callbackUrl은 외부링크에서 로그인페이지로 직접 이동했을 경우 로그인 후 router.back하게되면
외부링크로 다시 돌아가게 되므로 callbackUrl의 값으로 외부링크인지 구분하여 처리함

router.query에서 쿼리스트링 형식으로 적은 파라미터 꺼내기
router.query.파라미터_key


언제 쓰이냐면 보고 있던 페이지에서 로그인을 하고 싶을 경우 로그인페이지로 이동하는데
로그인이 성공하면 보고 있던 페이지로 이동하게 해주고 싶음

이 경우 next-auth에서는 이전페이지를 queryString형식으로 callbackUrl을 로그인페이지로 이동 시 같이 담아서 전달

http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fthemes
이 상황에서 router.query 객체를 사용하게 되면 URI를 불러오며, router.query.callbackUrl로 URI에 있는 callbackUrl이라는 key를 가져와 그 값을 꺼내 쓸 수 있음


```
	import { useRouter } from next/router
	const router = useRouter()


	console.log(router.query) 	
// { callbackUrl : http%3A%2F%2Flocalhost%3A3000%2Fthemes }
        if(router.query.callbackUrl != undefined){
          router.back()
        }else{
          router.push('/')
        }
```

### 로그인 시 middleware에서 message 전달하기

로그인 후 잠금계정이나 탈퇴계정이면 message를 가지로 response를 return 해주는 방법을 생각하고 있었는데
nextjs 공식문서에서 그렇게하지말고, routing하여 안내하는 페이지를 보여주라고 함 ( 하단 링크 참고 )
https://nextjs.org/docs/messages/returning-response-body-in-middleware

### 배송지 등록 처리

onChange에 정규표현식을 적용 ( 숫자만 입력 )

value.length를 이용하여 length가 넘어가지않을 경우에만 setState 처리 ( 길이 제한 ) 

※ 추가로, maxLength를 쓰면 간단했겠지만 애초에 입력 단계에서 부터 막고 싶어서 maxLength를 사용하지 않았고 또한, 입력 후 onChange 시 적용되는 타입이라 javascript 영역에서 처리

### 모달창 열기

React 컴포넌트 위에서 모달창을 열어도 최상위 Root에서 열어야 하기 때문에 모달창이 제대로 동작하지 않을 수 있다.

그렇기 때문에 우리는 어떤 컴포넌트에서 호출하여도 최상위 ROOT로 Modal창을 보내는 방법을 사용하여 Modal창을 구현해야한다.

React Portal과 React Modal 을 참고하기 바란다.

최상위 ROOT 단계로 이동할 수 있는 포탈 ( Portal )을 열고 이동한다.

> yarn add react-portal

이 때 사용할 파일은
Portal.tsx 			- Modal.tsx 파일을 최상위 Root 옆에 위치시키기 위한 포탈
_document.tsx			- Portal.tsx와 Modal.tsx를 최상위 Root 옆에 위치시킨다.
Modal.tsx			- Modal Open 시 보여질 Modal UI이다.
[모달이 보여질 페이지].tsx	- 이름은 아무거나 하시고, 모달 오픈 버튼 클릭 시 해당 페이지 위에 Modal을 띄울 예정

```
	Portal.tsx
import ReactDOM from 'react-dom'
import { ReactNode } from 'react'


type Portal = {
  children: ReactNode
  selector: string
}


export default function Portal({ children, selector }: Portal) {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector)


  return element && children ? ReactDOM.createPortal(children, element) : null
}


	_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="portal" />		// Portal.tsx의 selector에 해당하는 element이다.
        <NextScript />
      </body>
    </Html>
  )
}


	delivery.tsx			// Modal창을 띄울 페이지
import Modal from '@components/Modal'
import Portal from '@components/Portal'


export default function Delivery() {
  const [modalOpen, setModalOpen] = useState(false)


  const handleClickModalOpen = () => {
    !modalOpen ? setModalOpen(true) : setModalOpen(false)
  }


   return (
<button
            type="button"
            className="btn-add-address"
            onClick={handleClickModalOpen}
          >
            배송지 등록
          </button>
          {modalOpen && (			// 여기서 Portal과 Modal 컴포넌트 선언,
            <Portal selector="#portal">	// selector로 넘겨지는 값은 _document.tsx와 일치시켜야
              <Modal onClose={handleClickModalOpen} />
            </Portal>
          )}
        </div>




	Modal.tsx


	// props로 넘겨받는 onClose로 모달창을 닫을 수 있다.
export default function ModalDelivery({ onClose }: any) {		


	// 또한 Javascript 영역에서도 onClose 사용가능
	axiosRequest('post', `http://localhost:5000/api/add-shipping`, param)
        .then((response) => {
          if (response?.status === 200) {
            alert('배송지를 등록하였습니다.')
            setDisabledSubmit(false)
            onClose()
            return true
          }
        })


	
	return (
		<div>
          <button
            id="bannerClose"
            className="btn-modal-close"
            onClick={onClose}
            title="창 닫기"
          >버튼</button>
```

### PostCode 우편주소 api 가져오기 ( feat. 다음카카오 주소찾기 API )
```yarn add react-daum-postcode```
라이브러리 설치 후 가져다 쓰기만하면됨

컴포넌트는 총 2개만 있으면 되는데
PostCode.tsx					- 다음카카오 주소찾기 API 소스가 들어 있음
PostCode사용할 페이지.tsx			- PostCode.tsx 컴포넌트를 추가하면 됩니다.
			
```
PostCode.tsx
import React from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { DeliverySubmitT } from 'types'


export default function Postcode(props: {
  inputs: DeliverySubmitT
  setInputs: React.Dispatch<React.SetStateAction<DeliverySubmitT>>
  postButtonRef: React.RefObject<HTMLButtonElement>
}) {
  const open = useDaumPostcodePopup()


  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''


    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }


    props.setInputs({
      ...props.inputs,
      shippingZipCode: data.zonecode,
      shippingAddress1: fullAddress,
    })


    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }


  const handleClick = () => {
    open({ onComplete: handleComplete })
  }


  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn-search ml-2"
      ref={props.postButtonRef}
    >
      검색
    </button>
  )
}




	[주소찾기 기능 추가할 페이지].tsx ( Lego App에서는 ModalDelivery.tsx )
	// 여기서 사용되는 props들은 선택으로, PostCode.tsx에서 callback처리하여 
// 기존 화면에 적용시키기 위함
<Postcode
         inputs={inputs}
         setInputs={setInputs}
         postButtonRef={postButtonRef}
      />
```
#### ※ 주의. recoil Duplicate key 에러 발생 시 해결방법
			
1) key에다가 UUID 넣어서 중복되지 않도록 ( 이 경우 recoil-persist 안될 것으로 보임) 
2) RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false 선언
3) node-module/recoil 폴더 들어가서 에러메세지 띄우는 부분 주석처리하기

1번의 경우로 원래는 작업을 해왔지만 새로고침 recoil 전역 변수가 초기화되는 상황이 발생함( 장바구니에 담고 주문하기 페이지로 이동 후 새로고침 시 )

그래서 새로고침 시에도 recoil의 데이터를 유지하고 싶었음

3번도 해보았는데 우회할 뿐이므로 근본적인 해결책이 아닌 와중에 recoil 0.7.6버전에서 ( 레고앱이 0.7.6 버전임 )
```
// .env.local
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
```
최상위 env 파일에서 위와 같이 선언하면 key가 중복되어도 괜찮았음
그럼으로 인해 recoil-persist도 사용 가능해짐
	
```
const themeAtom = atom<ThemeT>({
  key: `themeAtom`, // 원래는  key: `themeAtom/${v1()}` 이렇게 선언,
  default: {
    theme_id: 0,
    theme_title: '',
    theme_title_en: '',
    thumbnail_link: '',
    theme_dscrp: '',
  },
})
```

#### ※ 주의. Hydration failed because the initial UI does not match what was rendered on the server 에러 발생 시

일단 위 에러의 대중적인 원인은 SWR에서 클라이언트 사이드와 서버 사이드가 둘다 돌아가므로 window 객체 호출 시 서버사이드의 경우 window 객체가 없어서 undefined되니까 useEffect위에서 사용해라인거고
두번째 원인은 <p> <div>~</div></p> 와 같이 p태그 안에 div 태그를 넣을 수 없다 이런 에러이긴한데
			
나의 경우에는 아래와 같이 바로 꺼냈을 경우 새로고침하니까 react-hydration-error가 발생
```
  let selectedOrder = useRecoilValue(selectedOrderSelector)

  return (
	{selectedOrder}
  )
```
			
해결방법은 그냥 직접 호출하지 않고 selectedOrder가 [ 51,52,50 ] 이런식으로 cart_id 라는 react-query에 들어있는 데이터와 비교해서 값을 가져오는 형식이였기 때문에 아래의 반복문으로 호출하니까 에러가 없어짐
```
{
	cartData && cartData.cartList ? (
	<div>
	  {
	    cartData.cartList && cartData.cartList.map((item: ProductCartT, index:number) => {
	      return (
		selectedOrder.some(select => select == item.cart_id)
		? (
		    <li key={item.cart_id}>
		      {item.cart_id}
		    </li>
		) : null
	      )
	    })
	  }
	</div>
	) : null
}
```
### 결제 - iamport cdn 연동
### 클라이언트 배포 시 계속 [...nextauth].ts 파일에서 session.user.state 의 타입이 존재하지 않는다고 에러가 발생
Property `state` does not exist on type `User | AdapterUser` in NextAuth

=> 그래서 아래와 같이 types/next-auth.d.ts 파일을 생성후 아래와 같이 소스 작성한 후에 yarn build 후 github에 push
```
// types/next-auth.d.ts
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    id: string
    state: number
  }

  interface User {
    id: string
    state: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    state: number
    provider: string
    oauthConnect: string
  }
}
```
			
### prefetchInfinityQuery 적용하려는데 첫 렌더링 시에는 1페이지 기준이니까 미리 2페이지까지 가져오지만  
그 이후인 2페이지로 넘어가면 2페이지는 가져오지만 미리 3페이지를 못가져옴( prefetching 안됨 )

=> 해결 : useQueryClient() -> new QueryClient()로 변경
```
import { QueryClient } from 'react-query'  
const queryClient = new QueryClient();
```

### SidebarFilter 코드 중복 제거하여 반복문 처리
input checkbox 변경 시 setPage(1) 처리 해주기 위해 setPage를 props로 하위 컴포넌트에 전달하였지만 그럴 필요 없이,  
변경 발생 시 selectedFilterSelector라는 recoil selector 변경 시 setPage(1) 처리함
			
```
const filter = useRecoilValue(selectedFilterSelector)

  useEffect(()=>{
    setPage(1)
  },[filter])
```
하지만 더보기 클릭 후 page가 2가 되었지만 filter를 체크했다가 풀면 page가 1로 초기화 되지만 실제적으로 화면에 보이는 상품들은 2페이지까지 보여지는 상태임
이 때 더보기 클릭 하면 2페이지 데이터를 다시 가져오는 경우가 발생

=> 더보기 클릭 시 데이터의 길이를 체크하여 setPage를 다시 지정함
```
const handleClickMoreProduct = () => {
    if(productList && productList?.pages.length){
      fetchNextPage({ pageParam: productList.pages.length + 1 })
      setPage(productList.pages.length + 1)
    }
  }
```
			
그렇기 때문에 ‘필터 삭제 버튼’ 클릭 시 selectedFilter라는 recoil 데이터를 
input checkbox 영역에서 useEffect로 감시하다가 변경되면 checkbox를 풀어주려고 해서 아래와 같이 수정함

```
	// SidebarFilterItem.tsx
  const [isChecked, setIsChecked] = useState(false);


  useEffect(()=>{
    selectedFilter[props.filterObj.id] == 0 ? setIsChecked(false) : setIsChecked(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedFilter[props.filterObj.id]])		
// selectedFilter가 한번 바뀌어도 필터에 있는 체크박스를 포함한 모든 컴포넌트가 바뀌지 않도록 
selectedFilter 내 현재 컴포넌트에 해당하는 id를 가진 key가 바뀔 경우에만 setIsChecked 처리함 


 	// SidebarFilterSelected.tsx
  const handleClickRecoilReset = useResetRecoilState(selectedFilterSelector)


  const handleClickDeleteTag = (filter: string) => {
    setSelectedFilter({
      ...selectedFilter,
      [filter]: 0,
    })
  }
```

굳이 useRef로 input checkbox 를 다른 컴포넌트에 넘기지 않아도
input checkbox를 가지는 컴포넌트에서 useEffect의 의존성 배열로 할당하여 
변경됨을 감지하여 state 값을 바꾸는 방식으로 고려해야 한다.

### 상품 상세 페이지 캐러셀(슬라이드 영역)에서 이미지 드래그 시 깔끔하게 슬라이드 넘기기가 안됨 ( 이미지가 드래그 되는 현상이 발생 )

Next/Image 컴포넌트에서 onDragStart 속성에 event.preventDefault() 처리함
```
<Image
      key={index}
      src={img}
      alt={String(index)}
      width="700px"
      height="400px"
      ...
      onDragStart={(e) => e.preventDefault()}
    />
```
	
### 정규표현식 같은 잘 바뀌지 않고 전역적으로 쓰는 경우 client side state로 분류해두지 않고 module로 따로 빼서 관리한다.
1) regexp 모듈화
2) useRef 를 자식 컴포넌트로 전달 시 forwardRef를 사용하려던 중에 전달 후 자식 컴포넌트에서 current속성을 사용하려고 할때 TypeError가 발생하였다.
useRef의 타입에 따라 사용할 수 없다고 하는데
https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref

> 나의 경우 자식 컴포넌트로 전달 후 자식 컴포넌트에서만 current요소로 접근하여 핸들링 했기 때문에 ref를 전달하지 않고 자식 컴포넌트에서 useRef를 생성하여 직접 핸들링함

3) useRef 불필요한 부분들 제거
리렌더링이 발생하여도 state값을 유지하고 싶을 때 useRef를 사용할 수 있는데

const plusOrMinus  = useRef(‘’) 로 유지할 수 있음

물론 나의 경우 필요없어서 let plusOrMinus = ‘’로 변경

### 배송지 목록에서 페이지 이동 시 깜빡하는 현상이 발생
원인 : 데이터를 가져오는 동안 null이였다가 데이터를 가져오면 렌더링하기 때문에 크기가 줄었다가 늘었다가 하는 과정때문에 깜빡이는 거처럼 보였음
```
{
	isFetching
	? <div>{data}</div>
	: null
} 
```
로 코딩해놔서 fetching 해오는 동안 null로 보여졌기 때문에 isFetching을 뺌
해결 :  isFetching 제거

### 회원정보에서 닉네임 변경 시 header에도 변경되게 보여지게하는법

Button save 시 useSession update로 sesison update 후 보여지도록 처리
	
```
  // 1. next-auth 4.20 이후 버전으로 변경 ( 기존 프로젝트는 4.18이여서 npm install 처리하여 4.22로 )
  // package.json
  "next-auth": "^4.22.1",
 
  // 2. useSession 훅 선언 후 이름 변경 작업 후 변경 완료처리하면 update 속성으로 name 변경
  // ButtonSave.tsx
  import { useSession } from "next-auth/react"	// 0. 의존성 주입


  const { data: session, update } = useSession()   // 1. useSession 훅 선언


  const handleClickButton = (type: string) => {
    ... 검증 후 api 요청 과정 생략
    alert('변경되었습니다.')
                      
     update({							// 2. update 속성으로 name 변경
      name: props.newValue
     });


  // 3. [...nextauth].ts 파일에서 callbacks.jwt trigger===”update” 시 name 수정하는 코드 추가


  // [...nextauth].ts
  callbacks: {
    async jwt(params) {
      ... 다른 코드 생략 
     
 	// 1. params.trigger로 update가 발생하였는지 체크 후 session.name을 token.name으로 전달
      if(params.trigger === "update" && params.session?.name){
        params.token.name = params.session.name
      }


      return params.token
    },
  },


  // 4. 따로 Header.tsx파일에선 해줄 게 없었음
```
	
### 파라미터로 가져온 변수를 state로 관리 vs 변수 그대로 관리

해답 :  가져온 변수가 페이지 내에서 변경되어야 하거나 여러 컴포넌트 간에 공유되어야 하는 경우, 상태 관리를 고려한다.

만약 상태변경이 필요하지 않거나, 간단한 컴포넌트 간 데이터 전달만 필요한 경우에는 가져온 변수 그대로를 사용하는 것도 괜찮다.

### 해야할 일
1. ~~sort 처리 시 db 접근할 필요없이 처리~~ -> 페이지네이션으로 인해 전체 데이터를 한번에 들고 있는 것이 아니라 정렬 및 페이지 이동 시 api 요청을 하게 됨
2. mobile UI 제공 - media query로 처리할 수 있는 부분들은 최대한 처리하고 컴포넌트 구조가 바뀌는 경우에는 useMediaQuery를 사용하여 모바일컴포넌트와 웹컴포넌트를 분리할 예정
	
### 모바일 인지 판단 하는 useMediaQuery 훅 사용
```
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function useIsMobile(): boolean {
  const isMobile_ = useMediaQuery({ query: '(max-width: 768px)' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobile_)
  }, [isMobile_])

  return isMobile
}
```
전반적인 화면은 flex 디자인으로 css를 작성해놓았지만 모바일 UI가 필요한 경우가 발생 ( 메뉴바, 필터 등 )  
mobile 페이지를 따로 추가 ( 주로 마이페이지 )
headerMobile 화면 구성 시 Menubar 는 라우팅 발생 시 isOpenBars State를 초기화 해주어야 하여 아래 코드로 처리
	
```
const [isOpenBars, setIsOpenBars] = useState(false)

const router = useRouter()

useEffect(() => {
    // 라우팅 발생 시 함수 실행
    router.events.on('routeChangeComplete', () => {
      setIsOpenBars(false) // 라우팅이 발생하면 isOpenBars를 초기화
    })
}, [router.events])
```
타 사이트 모바일 화면을 참고해보니 사이드바 오픈 시 새로운 화면을 제공하는 경우가 있는데 일단 임시로 드롭다운 박스로 처리 ( 23-06-14 )

### 주문내역조회 order_group과 order 컴포넌트 분리

기존 주문내역조회 페이지에서는 order 컴포넌트로만 목록을 보여주었었는데 몇가지 문제점이 있었다.  
1. 환불처리나 배송지보기 같은 경우 하나의 주문에 한번만 보여줘야 할 필요성이 있다.
2. 사용자가 같은 주문인지 파악하기에 시간이 걸린다. ( 물론 개발자도 단번에 하나의 주문인지 파악하기 힘들었다. )

위와 같은 이유로 order_group 컴포넌트로 order 컴포넌트를 한번 감싸주어 처리하려고 함.

그렇다면 API로 데이터 요청 시 서버에서 데이터를 어떻게 전달해줄 것인가?  
원래대로는 order_group과 order 데이터를 SQL 한번에 가져왔었지만 그 마저도 order 데이터 기준으로 페이지네이션 되어있었으나

1. order_group과 order 테이블을 따로 조회하여 가져와야 할지
2. 기존처럼 order_group과 order 데이터를 하나의 데이터 포맷을 만들어 가져와야 할지

1번의 경우 따로 가져온다면 자원관리가 용이하겠으나 DB에 2번접근하게 된다.
2번의 경우 한번에 가져와 DB에 1번 접근하지만 주문내역 데이터가 여러번 사용되게 된다면 해당 데이터 포맷을 깨야 되고,  
order_group과 order가 1:N 구조이기 때문에 order_group 데이터는 중복된 데이터를 가져올 수 있게 된다.

1번의 경우 2번과 같이 서버에서 데이터를 한번에 가져오고 서버 로직으로 분리하여 처리할 수 있겠지만  
현재 해당 프로젝트는 프론트엔드가 주가 되는 프로젝트이므로 1번으로 진행하기로 결정하였다.

api 요청 한번에 order_group과 order 데이터를 map에 담아 response로 받은 후 order_group 컴포넌트를 추가로 생성하여 order_group이 컨테이너 역할로써
order 컴포넌트를 감싸서 처리하였다.(23-06-23)

### 배포 시 에러 발생 ( 23-06-28 )  

로컬에서는 상관없었지만 배포하였을 때 두가지 종류의 에러가 발생하였다.
1. 하나는 배너 신제품 출시 날짜를 계속 수정해주는게 귀찮아서 new Date().getMonth()로 가져왔었지만  
이 경우 배포 시 클라이언트의 시간과 서버의 시간이 맞지 않기 때문에 발생하는 거 같아
아래의 링크를 참고하였습니다. 
https://github.com/vercel/next.js/issues/37489

2. 나머지 하나는 TypeError로 React에서는 흔하게 발생하는 .focus() 에러였는데 로컬에서는 문제가 없었지만 배포 시 에러가 발생

#### Uncaught TypeError: Cannot read properties of undefined (reading 'focus')
 
```
useEffect(() => {
    if (directOpen && inputsRef) {
      inputsRef.current[0].focus()
    }
  }, [directOpen])

아래 코드와 같이 inputsRef.current[0] 값 체크 후 focus() 처리하여

useEffect(() => {
    if (directOpen && inputsRef && inputsRef.current[0]) {
      inputsRef.current[0].focus()
    }
  }, [directOpen])
```

### 배송요청사항 옵션들 state로 구분하지 않고 공통변수로 처리 & 장바구니 페이지 선택한 상품이 없어도 주문하기 버튼 클릭 시 다음 프로세스로 이동되는 이슈처리

1. 페이지 관련 state들 묶어서 처리
2. 장바구니페이지에서 주문하기 버튼 클릭 시 체크한 상품이 없어도 다음 페이지로 넘어가고 있어서 이를 alert처리하여 페이지 이동을 막아둠
3. 배송요청사항 옵션을 recoil로 state처리 하였었는데 그럴필요없이 queryKey때 처럼 파일로 따로 구분해서 변수를 따로 선언하여 export하는 식으로 처리  
4. < 3번 항목 관련 > 다음 commit 시 해당 파일이름을 commonFunction.ts 파일때 처럼 공통화 처리 하고 꺼내 쓰는 방식으로 바꾸려고함
   
## 코딩테스트 하다보니 알고리즘 공부를 다시 하게 되었는데 이와 관련하여 소스를 조금 수정하려함

### 이미지 관련 성능개선 필요
저작권때문에 이미지를 저장할 수 없는 상황이라  
cdn 서버에서 format=webp 형식으로 변경해서 이미지를 가져오는 것으로 db를 수정하여 개선하려는데 크게 바뀌는 건 없어보인다.  
일단 webp 파일로 받아오는 것으로 변경, 개발자도구 network 탭에서 Response Headers - Content Type에 webp로 받아오는 것을 확인  
=> **Next.js에서 Image 태그 사용시 webp 확장자로 자동으로 변환하여 이미지를 가져오고 있었음**

### CSS 일부를 SCSS로 변경, 공통된 css 모듈화하여 import 해서 가져오도록 처리
### 환불요청 시 confirm메서드로 확답받은 후 환불처리
