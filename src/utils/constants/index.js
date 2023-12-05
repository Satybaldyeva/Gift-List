export const USER_KEY = 'GIFT-LIST_USER_KEY'

export const routes = {
   LOGIN: 'login',
   REGISTRATION: 'registration',
   FORGOTPASSWORD: 'forgot-password',
   RESETPASSWORD: 'reset-password',
   ADMIN: {
      path: '/admin',
      users: {
         path: 'users',
         breadcrumb: 'Пользователи',
      },
   },
   USER: {
      path: '/user',
      feed: {
         path: 'feed',
         breadcrumb: 'Лента',
         // headerSelectType: 'select',
         showListActions: true,
      },
      profile: {
         path: 'profile',
         breadcrumb: 'Профиль',
      },
      edit: {
         path: 'edit',
         breadcrumb: 'Рассказать о себе',
      },
   },
}
