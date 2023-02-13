import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import { redirect } from 'next/dist/server/api-utils'

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
        let url = process.env.SERVER_URL + '/api/getLoginChk'

        console.log(credentials)

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
              return user
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
  ],
  session: {
    maxAge: 30 * 60, // 30 min,
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/signin',
  },
})
