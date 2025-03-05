import { CHAT_API_URL } from 'chat/utility/constant'
import axios from '../config'
import chatAxios from 'axios'

export const getResponse = (body) => {
  return axios.post(`/chat/`, body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export const getLoginInfoApi = async (body) => {
  return axios.post(`${process.env.REACT_APP_LOGIN_URL}/login`, body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export const chatApi = (body) => {
  return chatAxios.post(CHAT_API_URL, body, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export const feedbackApi = async (body) => {
  try {
    const res = await axios.post(`api/feedback`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    return res
  } catch (error) {
    return error?.response
  }
}
