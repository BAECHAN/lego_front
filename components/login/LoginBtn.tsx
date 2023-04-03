import { useSession, signIn, signOut } from 'next-auth/react'

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button title="로그아웃 버튼" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  } else {
    return (
      <>
        Not signed in <br />
        <button title="로그인 버튼" onClick={() => signIn()}>
          Sign in
        </button>
      </>
    )
  }
}
