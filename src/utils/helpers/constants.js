import { SamatOkenov, Ellipse, Aida, Askar } from '../../assets'
import { axiosInstanceMultiPartFormData } from '../../config/axiosInstanceWithMultipartFormDataType'
import { notifyTypes, toastWithoutPromise } from './toast'

export const notifications = [
   {
      name: 'Самат Окенов',
      id: '1',
      image: SamatOkenov,
      description: ' добавил желаемый подарок',
      date: '25.05.2022',
   },
   {
      name: 'Название подарка ',
      id: '2',
      image: Ellipse,
      description: ' было забронировано анонимным пользователем',
      date: '25.05.2022',
   },
   {
      name: 'Название подарка',
      id: '3',
      image: Aida,
      description: ' было забронировано Аида Мамытбек',
      date: '25.05.2022',
   },
   {
      name: 'Аскар Оморов ',
      id: '4',
      image: Askar,
      description: 'отправил запрос в друзья',
      date: '25.05.2022',
   },
   {
      name: 'Аскар Оморов ',
      id: '5',
      image: Askar,
      description: 'отправил запрос в друзья',
      date: '25.05.2022',
   },
   {
      name: 'Аскар Оморов ',
      id: '6',
      image: Askar,
      description: 'отправил запрос в друзья',
      date: '25.05.2022',
   },
]

export const isValidDateFormat = (formattedDate) => {
   const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
   return dateRegex.test(formattedDate)
}

export function convertDateFormat(inputDate) {
   const dateObject = new Date(inputDate)

   const year = dateObject.getFullYear() % 100
   const month = dateObject.getMonth() + 1
   const day = dateObject.getDate()

   const formattedMonth = month < 10 ? `0${month}` : `${month}`
   const formattedDay = day < 10 ? `0${day}` : `${day}`

   const formattedDate = `${formattedMonth}.${formattedDay}.${year}`

   return formattedDate
}

export function findNumberLength(inputString) {
   const numbersArray = inputString.match(/\d+/g)

   if (numbersArray) {
      const totalLength = numbersArray.reduce(
         (acc, number) => acc + number.length,
         0
      )
      return totalLength
   }

   return 0
}

export const uploadFile = async (file) => {
   try {
      const formData = new FormData()
      formData.set('file', file)
      const response = await axiosInstanceMultiPartFormData.post(
         '/storages/upload',
         formData
      )
      return response.data
   } catch (error) {
      toastWithoutPromise(
         notifyTypes.NOTIFY_TYPE_ERROR_ERROR,
         'Error while upload file',
         error
      )
      return error
   }
}
