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
