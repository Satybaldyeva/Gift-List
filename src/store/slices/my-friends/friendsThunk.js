import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../config/axiosInstance'
import {
   notifyTypes,
   toastWithPromise,
   toastWithoutPromise,
} from '../../../utils/helpers/toast'
import { getProfileByUserId } from '../profile-slice/profileByIdThunk'

export const getFriends = createAsyncThunk(
   'user/friends',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/myFriends')
         const result = response.data
         return result
      } catch (error) {
         toastWithoutPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_ERROR,
            'Ошибка!',
            error.message
         )
         return rejectWithValue(error.message)
      }
   }
)

export const deleteFriendById = createAsyncThunk(
   '/myFriends',
   async (userId, { dispatch, rejectWithValue }) => {
      try {
         await toastWithPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_WARNING,
            notifyTypes.NOTIFY_TYPE_SUCCESS_INFO,
            'Информация',
            'Пользователь успешно удален из списка друзей',
            'При удалении друга произошла ошибка',
            axiosInstance.delete(`/myFriends/${userId}`)
         )

         return dispatch(getProfileByUserId(userId))
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const sendRequestToUser = createAsyncThunk(
   '/myFriends/{friendId}',
   async (friendId, { dispatch, rejectWithValue }) => {
      try {
         await toastWithPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_WARNING,
            notifyTypes.NOTIFY_TYPE_SUCCESS_INFO,
            'Информация',
            'Ваш запрос успешно отправлен',
            'При отправке запроса произошла ошибка',
            axiosInstance.post(`/myFriends/${friendId}`)
         )
         return dispatch(getProfileByUserId(friendId))
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const acceptRequest = createAsyncThunk(
   '/myFriends/acceptFriend',
   async ({ userId, name, isAccept }, { dispatch, rejectWithValue }) => {
      console.log(userId, name)
      try {
         await toastWithPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_WARNING,
            notifyTypes.NOTIFY_TYPE_SUCCESS_INFO,
            'Информация',
            `Вы приняли запрос от ${name}`,
            'Произошла ошибка',
            axiosInstance.post(
               `/myFriends/acceptFriend/${userId}?request=${isAccept}`
            )
         )

         return dispatch(getProfileByUserId(userId))
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const rejectRequests = createAsyncThunk(
   '/myFriends/rejectRequest',
   async ({ userId, name, isAccept }, { dispatch, rejectWithValue }) => {
      try {
         await toastWithPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_WARNING,
            notifyTypes.NOTIFY_TYPE_SUCCESS_INFO,
            'Информация',
            `Вы отклонили запрос от ${name}`,
            'Произошла ошибка',
            axiosInstance.post(
               `/myFriends/acceptFriend/${userId}?request=${isAccept}`
            )
         )
         return dispatch(getProfileByUserId(userId))
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
