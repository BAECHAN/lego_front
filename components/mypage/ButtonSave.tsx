import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { InputTNotPwchk } from 'types'

import axiosRequest from 'pages/api/axios'
import { queryKeys } from 'pages/api/query/queryKeys'

import { checkOverlapInput, isPassRegExpInput } from '@components/common/event/CommonFunction'

export default function ButtonSave(props: {
  infoKey: string
  email: string
  isChange: boolean
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>
  setValue: React.Dispatch<React.SetStateAction<string>>
  newValue: string
  setNewValue: React.Dispatch<React.SetStateAction<string>>
  isEnter: boolean
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>
  uploadFile: File | undefined
  setUploadFile: React.Dispatch<React.SetStateAction<File | undefined>>
}) {
  const queryClient = useQueryClient()

  const { data: session, update } = useSession()

  useEffect(() => {
    if (props.isEnter) {
      handleClickButton('save')
      props.setIsEnter(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isEnter])

  const handleClickButton = (type: string) => {
    if (type === 'cancle') {
      props.setIsChange(!props.isChange)
      props.setNewValue('')
      props.setUploadFile(undefined)
    } else {
      if (props.infoKey === 'name') {
        if (isPassRegExpInput('nickname', props.newValue)) {
          checkOverlapInput('nickname' as InputTNotPwchk, props.newValue).then((response: boolean) => {
            if (!response) {
              axiosRequest('post', `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upd-nickname`, {
                email: props.email,
                nickname: props.newValue,
              })
                .then(async (response) => {
                  if (response?.status === 204) {
                    alert('변경되었습니다.')
                    props.setIsChange(!props.isChange)
                    props.setValue(props.newValue)
                    update({
                      name: props.newValue,
                    })
                  } else {
                    alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
                    console.error(`HTTP status : ${response?.status}`)
                  }
                })
                .catch((error) => {
                  console.log(error)
                  alert('닉네임 변경이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.')
                  return false
                })
            } else {
              alert('사용중인 닉네임입니다.\r다른 닉네임을 이용해주시기 바랍니다.')
              return false
            }
          })
        } else {
          alert('닉네임 양식이 맞지 않습니다.')
          return false
        }
      } else if (props.infoKey === 'image') {
        const formData = new FormData()

        if (props.uploadFile && props.newValue != '/default_profile.png') {
          formData.append('image', props.uploadFile)
          formData.append('isDefault', '0')
        } else {
          formData.append('isDefault', '1')
        }

        formData.append('email', props.email)
        updUserImageAPI.mutate(formData)
      }
    }
  }

  const updUserImageAPI = useMutation(
    async (formData: FormData) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/upd-user-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res.data
    },
    {
      onSuccess: async (data) => {
        if (data.result === 1) {
          alert('변경되었습니다.')
          queryClient.invalidateQueries([queryKeys.userInfo])
          props.setIsChange(!props.isChange)
        } else {
          alert('프로필 사진을 변경하는데 문제가 발생하였습니다.\r고객센터에 문의해주시기 바랍니다.')
          return false
        }
      },
      onError: (error) => console.log(error),
    }
  )

  return (
    <div className="flex justify-around relative -left-2">
      <button type="button" className="flex h-8 leading-5" title="정보 수정 취소 버튼" onClick={() => handleClickButton('cancle')}>
        취소
        <FontAwesomeIcon icon={faCancel} width="23px" height="23px" style={{ marginLeft: '3px' }} />
      </button>
      <button type="button" className="flex h-8 leading-5" title="정보 수정 저장 버튼" onClick={() => handleClickButton('save')}>
        저장
        <FontAwesomeIcon icon={faSave} width="23px" height="23px" style={{ marginLeft: '3px' }} />
      </button>
      <style jsx>{`
        button {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </div>
  )
}
