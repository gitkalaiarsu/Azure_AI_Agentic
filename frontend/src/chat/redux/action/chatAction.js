import { setAccordianOpen, setLogin, updateChat, updateChatStatus, userLoggedIn } from '../reducers/chatReducer'
import { chatApi, feedbackApi, getLoginInfoApi } from '../../api/miscApi'

export const updatedChats = (chats) => async (dispatch) => {
  dispatch(updateChat(chats))
}

export const updatedStatusChats = (chats) => async (dispatch) => {
  dispatch(updateChatStatus(chats))
}

export const loggedIn = (username) => async (dispatch) => {
  dispatch(userLoggedIn(username))
}

export const startChat = (body) => async () => {
  let results = await chatApi(body)
  return results?.data
}

export const feedback = (body) => async () => {
  let result = await feedbackApi(body)
  return result
  // dispatch()
}


export const accordionOpenAction = (body) => async (dispatch) => {
  dispatch(setAccordianOpen(body));
  
}


export const loginAction =   (body) => async (dispatch) => {
  let result = await getLoginInfoApi(body)
  if(result?.status === 200){
    const data = {
      user_id: result?.data?.id,
      email: body?.email,
      name: body?.name,
    }
    dispatch(setLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return result
}