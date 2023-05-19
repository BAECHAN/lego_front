import React, { forwardRef } from 'react'

function InputEmail(
  props: {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
  },
  emailRef: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <label>
      이메일 주소
      <br />
      <input
        type="email"
        title="이메일 입력란"
        name="email"
        id="email"
        value={props.email}
        onChange={(e) => props.setEmail(e.currentTarget.value)}
        ref={emailRef}
        placeholder="예) lego@lego.co.kr"
        autoComplete="off"
      />
      <style jsx>{`
        label {
          position: relative;
          margin: 8px 0px;
        }

        input {
          width: 330px;
          height: 35px;
          border: solid gray 1px;
          display: inline-block;
          padding: 5px;
        }
      `}</style>
    </label>
  )
}

export default forwardRef(InputEmail)
