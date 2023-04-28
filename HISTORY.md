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
	pw = crypto.HmacSHA512(pw, secretKey).toString()
	
} else {
	alert('secretKey is undefined')
	return false
}


const userInfo = {
	email,
	pw,
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

⧭ next/router

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













