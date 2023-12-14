/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography, styled } from '@mui/material'
import { axiosInstance } from '../../../config/axiosInstance'
import { Button } from '../../../components/UI/Button'
import {
   DeleteIcon,
   EditIcon,
   ProfileFacebook,
   ProfileInstagram,
   ProfileTelegram,
   ProfileVk,
} from '../../../assets'
import { Card } from '../../../components/UI/card/Card'
import { DeleteModal } from '../../../components/UI/DeleteModal'

export const UserProfile = () => {
   const [user, setUser] = useState([])
   const [userWishes, setUserWishes] = useState([])
   const [userHolidays, setUserHolidays] = useState([])
   const [userCharities, setUserCharities] = useState([])
   const [openModal, setOpenModal] = useState(false)
   const navigate = useNavigate()

   const { userId } = useSelector((state) => state.users)

   const getUser = async () => {
      try {
         const userResponse = await axiosInstance.get(`/user/${userId}`)
         setUser(userResponse.data)
         const wishesResponse = await axiosInstance.get(
            `/wishlists/user/${userId}`
         )
         setUserWishes(wishesResponse.data)
         const holidaysResponse = await axiosInstance.get(
            `/holidays/getHolidaysByUserId/${userId}`
         )
         setUserHolidays(holidaysResponse.data)
         const charityResponse = await axiosInstance.get(
            `/charity/myCharities?userId=${userId}`
         )
         setUserCharities(charityResponse.data)
      } catch (error) {
         console.log(error)
      }
   }

   const handleChange = (e) => {
      if (e.target.innerText === 'Редактировать') {
         console.log('edit')
      } else if (e.target.innerText === 'Удалить') {
         setOpenModal(true)
      }
   }

   useEffect(() => {
      getUser()
   }, [])

   return (
      <div>
         <MainContainer>
            <div className="container">
               <div className="photo">
                  <div>
                     <img
                        width="190px"
                        height="190px"
                        src={user.image}
                        alt=""
                     />
                     <Typography>{user.fullName}</Typography>
                  </div>
                  <div className="messangers">
                     <a href="@">
                        <ProfileFacebook />
                     </a>
                     <a href="@">
                        <ProfileInstagram />
                     </a>
                     <a href="@">
                        <ProfileTelegram />
                     </a>
                     <a href="@">
                        <ProfileVk />
                     </a>
                  </div>
               </div>
               <div className="mainInformation">
                  <div>
                     <p className="violetText">Основная информация</p>
                     <p className="greyText">Город:</p>
                     <p className="normalText">{user.country}</p>
                     <p className="greyText email">Email:</p>
                     <p className="normalText">{user.email}</p>
                     <p className="violetText">Интересы, хобби</p>
                     <p className="greyText">Интересы, хобби:</p>
                     <p className="normalText">{user.hobby}</p>
                     <p className="violetText">Доп. инфа</p>
                     <p className="greyText">Размер одежды:</p>
                     <p className="normalText">{user.clothingSize}</p>
                  </div>
                  <div>
                     <p className="greyText margin">Дата рождения:</p>
                     <p className="normalText">{user.dateOfBirth}</p>
                     <p className="greyText numberPhone">Номер телефона:</p>
                     <p className="normalText">{user.phoneNumber}</p>
                     <p className="greyText margin">Важно знать:</p>
                     <p className="normalText">{user.important}</p>
                     <p className="greyText margin">Размер обуви:</p>
                     <p className="normalText">{user.shoeSize}</p>
                  </div>
               </div>
            </div>

            <div className="buttons">
               <Button
                  style={{ border: 'none', height: '36px' }}
                  variant="outlined"
                  type="submit"
                  onClick={() => setOpenModal(true)}
               >
                  Удалить
               </Button>
               <Button
                  style={{ border: 'none', height: '36px' }}
                  variant="primary"
                  type="submit"
               >
                  Заблокировать
               </Button>
            </div>
         </MainContainer>
         {openModal && <DeleteModal open={openModal} setOpen={setOpenModal} />}
         <ReusableContainer>
            <div className="title">
               <p>Желаемые подарки</p>
               <p onClick={() => navigate(`wishes`)}>Смотреть все</p>
            </div>
            <div className="cards">
               {userWishes.slice(0, 3).map((wish) => {
                  return (
                     <Card
                        key={wish.wishId}
                        variant="secondary"
                        status={wish.wishStatus}
                        holiday={wish.holidayName}
                        cardName={wish.wishName}
                        date={wish.dateOfHoliday}
                        cardImage={wish.wishImage}
                        ownerImage={wish.userImage}
                        ownerName={wish.fullName}
                        isBlock={wish.isBlock}
                        bookerImage={wish.reservoirImage}
                        showBottomBooker="true"
                        meatballsOptions={[
                           { title: 'Редактировать', icon: <EditIcon /> },
                           { title: 'Удалить', icon: <DeleteIcon /> },
                        ]}
                        handleChange={(e) => handleChange(e, wish.id)}
                     />
                  )
               })}
            </div>
         </ReusableContainer>
         <ReusableContainer>
            <div className="title">
               <p>Праздники</p>
               <p onClick={() => navigate('holidays')}>Смотреть все</p>
            </div>
            <div className="cards">
               {userHolidays.slice(0, 3).map((holiday) => {
                  return (
                     <Card
                        key={holiday.holidayId}
                        date={holiday.dateOfHoliday}
                        cardImage={holiday.image}
                        holiday={holiday.nameHoliday}
                        variant="tertiary"
                        meatballsOptions={[
                           { title: 'Редактировать', icon: <EditIcon /> },
                           { title: 'Удалить', icon: <DeleteIcon /> },
                        ]}
                        handleChange={(e) => handleChange(e, holiday.id)}
                     />
                  )
               })}
            </div>
         </ReusableContainer>
         <ReusableContainer>
            <div className="title">
               <p>Благотворительность</p>
               <p onClick={() => navigate('charities')}>Смотреть все</p>
            </div>
            <div className="cards">
               {userCharities.slice(0, 3).map((charity) => {
                  return (
                     <Card
                        key={charity?.charityId}
                        date={charity?.createdAt}
                        cardImage={charity?.charityImage}
                        holiday={charity?.nameCharity}
                        status={charity?.status}
                        newOrOld={
                           charity?.condition === 'USED' ? 'Б/У' : 'Новый'
                        }
                        variant="withStatusBottom"
                        showBottomBooker="true"
                        isBlock={charity?.isBlock}
                        bookerImage={charity?.bookedUserImage}
                        meatballsOptions={[
                           { title: 'Редактировать', icon: <EditIcon /> },
                           { title: 'Удалить', icon: <DeleteIcon /> },
                        ]}
                        handleChange={(e) => handleChange(e, charity.id)}
                     />
                  )
               })}
            </div>
         </ReusableContainer>
      </div>
   )
}

const ReusableContainer = styled('div')`
   width: 73vw;
   & .cards {
      display: flex;
      gap: 2.4vw;
      flex-wrap: wrap;
   }
   & .title {
      margin: 50px 0 23px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      & :first-child {
         color: var(--black, #020202);
         font-family: Inter;
         font-size: 18px;
         font-style: normal;
         font-weight: 500;
         line-height: normal;
         letter-spacing: 0.2px;
      }
      & :first-child + p {
         color: #3772ff;
         font-family: Inter;
         font-style: normal;
         letter-spacing: 0.5px;
         border-bottom: 1px solid #3772ff;
         cursor: pointer;
         &:hover {
            border-bottom: 2px solid #3772ff;
         }
      }
   }
`

const MainContainer = styled('div')`
   background-color: white;
   padding: 20px;
   width: 73vw;
   border-radius: 10px;
   .container {
      display: flex;
   }
   .buttons {
      margin-top: 56px;
      width: 100%;
      text-align: end;
      & :first-child {
         margin-right: 16px;
      }
   }
   .photo {
      text-align: center;
      & img {
         border-radius: 8px;
      }
      & p {
         color: var(--black, #020202);
         font-family: Inter;
         font-size: 18px;
         font-style: normal;
         font-weight: 500;
         line-height: normal;
         letter-spacing: 0.2px;
         margin-top: 16px;
      }
      .messangers {
         display: flex;
         column-gap: 20px;
         margin-top: 24px;
      }
   }
   .mainInformation {
      display: flex;
      column-gap: 8.9vw;
      margin-left: 4.1vw;
      .violetText {
         color: var(--Violet, #8639b5);
         font-family: Inter;
         font-size: 18px;
         font-style: normal;
         font-weight: 500;
         line-height: normal;
         letter-spacing: 0.2px;
         margin-bottom: 13px;
         margin-top: 30px;
      }
      .greyText {
         color: #5c5c5c;
         font-family: Inter;
         font-size: 14px;
         font-style: normal;
         font-weight: 400;
         line-height: 130%;
         margin-bottom: 6px;
      }
      .normalText {
         color: #000;
         font-family: Inter;
         font-size: 16px;
         font-style: normal;
         font-weight: 400;
         line-height: 130%;
      }
      .margin {
         margin-top: 65px;
      }
      .numberPhone {
         margin-top: 16px;
      }
      .email {
         margin-top: 16px;
      }
   }
`
