import axios from 'axios'
import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface JWT {
    user: {
      state: number | undefined | null
    } & DefaultSession['user']
  }
}

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
        const url = 'http://localhost:5000' + '/api/login-chk'

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
    async session({ session, token, user }) {
      return session
    },
    async jwt(params) {
      if (params.user && params.user.state) {
        params.token.state = params.user.state
      }
      return params.token
    },
  },
})
