import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { notifyTypes, toastWithoutPromise } from '../../utils/helpers/toast'

export const getHolidayByIdThunk = createAsyncThunk(
   '/holiday/getHolidayById',
   async (holidayId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/holidays/${holidayId}`)
         return response.data
      } catch (error) {
         toastWithoutPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_ERROR,
            'Ошибка',
            error.message
         )
         return rejectWithValue(error)
      }
   }
)

export const getHolidaysByUserId = createAsyncThunk(
   '/friend/:friendId',
   async (friendId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/holidays/getAllHolidayFrends/${friendId}`
         )
         const result = response.data

         return result
      } catch (error) {
         toastWithoutPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_ERROR,
            'Ошибка!',
            error.message
         )
         return rejectWithValue(error)
      }
   }
)