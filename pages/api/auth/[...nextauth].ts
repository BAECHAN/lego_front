import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'email-password-credential',
      name: 'Email / Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login-chk`

        const param = {
          email: credentials?.email,
          pw: credentials?.password,
        }

        let res: any = await axios
          .post(url, JSON.stringify(param), {
            headers: { 'Content-Type': `application/json; charset=utf-8` },
          })
          .then((response) => {
            const user = response.data.result

            if (user) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                state: user.account_state,
              }
            } else {
              return null
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.log(res)
              console.log('에러 :: API경로가 잘못되었습니다.')
            }
            return error
          })

        if (res.email && res.name) {
          return res
        } else {
          return null
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // 1 days,
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/signin',
  },

  callbacks: {
    async session({ session }) {
      return session
    },
    async jwt(params) {
      if (params.user?.state as number) {
        params.token.state = params.user.state
      }

      if (params.account && (params.account?.provider as string)) {
        params.token.provider = params.account.provider
      }

      if (params.trigger === 'update' && params.session?.name) {
        params.token.name = params.session.name
      }

      return params.token
    },
  },
})
