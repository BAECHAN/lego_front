import React, { forwardRef } from 'react'
import { useRecoilValue } from 'recoil'
import { passwordEyeSelector } from 'state/atoms'

import FontAwesomeEye from '@components/common/fontawesome/FontAwesomeEye'

function InputPassword(
  props: {
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
  },
  passwordRef: React.LegacyRef<HTMLInputElement> | undefined
) {
  const passwordType = useRecoilValue(passwordEyeSelector)

  return (
    <label>
      비밀번호
      <br />
      <input
        type={passwordType}
        title="비밀번호 입력란"
        name="password"
        id="password"
        value={props.password}
        onChange={(e) => props.setPassword(e.currentTarget.value)}
        ref={passwordRef}
        autoComplete="off"
      />
      <FontAwesomeEye />
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

export default forwardRef(InputPassword)
