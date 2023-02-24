import axios from 'axios'
import { ParamT } from 'types'

export default async function axiosRequest(
  method: string,
  url: string,
  param: ParamT
) {
  const JSONParam = JSON.stringify(param)
  const config = {
    headers: { 'Content-Type': `application/json; charset=utf-8` },
  }

  let response

  if (method == 'post') {
    return (response = await axios.post(url, JSONParam, config))
  } else if (method == 'get') {
    return (response = axios.get(url, config))
  } else if (method == 'patch') {
    return (response = axios.patch(url, JSONParam, config))
  }
}
