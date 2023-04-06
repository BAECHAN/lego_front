import React, { ChangeEvent } from 'react'

export function CommonHandleChangeValue(
  option: string,
  e: ChangeEvent<HTMLInputElement>,
  inputs: any,
  setInputs: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value, checked } = e.currentTarget

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

export function TimeFormat(date: Date) {
  date.setHours(date.getHours() + 9)
  return date.toISOString().replace('T', ' ').substring(0, 19)
}
export function RandomPasswordIssuance() {
  let ranValue1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  let ranValue2 = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]
  let ranValue3 = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  let ranValue4 = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')']

  let temp_pw = ''

  for (let i = 0; i < 2; i++) {
    let ranPick1 = Math.floor(Math.random() * ranValue1.length)
    let ranPick2 = Math.floor(Math.random() * ranValue2.length)
    let ranPick3 = Math.floor(Math.random() * ranValue3.length)
    let ranPick4 = Math.floor(Math.random() * ranValue4.length)
    temp_pw =
      temp_pw +
      ranValue1[ranPick1] +
      ranValue2[ranPick2] +
      ranValue3[ranPick3] +
      ranValue4[ranPick4]
  }

  return temp_pw
}
