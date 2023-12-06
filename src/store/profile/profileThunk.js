import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { russianCountries, shoeSizeEnum } from '../../utils/constants/constants'
import { formatDate } from '../../utils/helpers/constants'
import {
   notifyTypes,
   toastWithPromise,
   toastWithoutPromise,
} from '../../utils/helpers/toast'

export const getProfileThunk = createAsyncThunk(
   'profile/getProfileThunk',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/user')
         return response.data
      } catch (error) {
         toastWithoutPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_ERROR,
            'Ошибка',
            error.message
         )
         return rejectWithValue(error.message)
      }
   }
)

export const updateProfileThunk = createAsyncThunk(
   'profile/updateProfileThunk',
   async ({ values, reset }, { rejectWithValue, dispatch }) => {
      try {
         const {
            clothingSize,
            country,
            dateofbirth,
            facebookLink,
            hobbies,
            importantToKnow,
            instagramLink,
            name,
            phoneNumber,
            image,
            shoeSize,
            surname,
            telegramLink,
            vkLink,
         } = values

         const updatedProfile = {
            firstName: name,
            lastName: surname,
            phoneNumber,
         }

         if (country) updatedProfile.country = russianCountries[country]
         if (dateofbirth) updatedProfile.dateOfBirth = formatDate(dateofbirth)
         if (image) updatedProfile.image = image
         if (clothingSize) updatedProfile.clothingSize = clothingSize
         if (shoeSize) updatedProfile.shoeSize = shoeSizeEnum[shoeSize]
         if (hobbies) updatedProfile.hobby = hobbies
         if (importantToKnow) updatedProfile.important = importantToKnow
         if (facebookLink) updatedProfile.linkFacebook = facebookLink
         if (vkLink) updatedProfile.vkontakte = vkLink
         if (instagramLink) updatedProfile.instagram = instagramLink
         if (telegramLink) updatedProfile.telegram = telegramLink

         const response = await toastWithPromise(
            notifyTypes.NOTIFY_TYPE_ERROR_WARNING,
            notifyTypes.NOTIFY_TYPE_SUCCESS_INFO,
            'Успешно',
            'Профиль успешно обновлен.',
            'Ошибка',
            axiosInstance.put('/user', updatedProfile)
         )
         dispatch(getProfileThunk())
         reset()
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
