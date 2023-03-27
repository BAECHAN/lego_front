import React, { ChangeEvent } from 'react'

export function CommonHandleChangeValue(
  option: string,
  e: ChangeEvent<HTMLInputElement>,
  inputs: any,
  setInputs: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value, checked } = e.currentTarget

  console.log('흠')
  if (option == 'maxLength20') {
    value.length < 21 ? setInputs({ ...inputs, [name]: value }) : null
  } else if (option == 'maxLength30') {
    value.length < 31 ? setInputs({ ...inputs, [name]: value }) : null
  } else if (option == 'number3') {
    value.length < 4
      ? setInputs({ ...inputs, [name]: value.replace(/[^0-9]/g, '') })
      : null
  } else if (option == 'number4') {
    value.length < 5
      ? setInputs({ ...inputs, [name]: value.replace(/[^0-9]/g, '') })
      : null
  } else if (option == 'check') {
    setInputs({ ...inputs, [name]: checked ? true : false })
  }
}

export function timeFormat(date: Date) {
  date.setHours(date.getHours() + 9)
  return date.toISOString().replace('T', ' ').substring(0, 19)
}
