import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'
import { axiosInstance } from '../../config/axiosInstance'
import { Card } from '../../components/UI/card/Card'
import { DeleteIcon, EditIcon } from '../../assets'
import { DeleteModal } from '../../components/UI/DeleteModal'

export const UserWishes = () => {
   const { userId } = useSelector((state) => state.users)
   const [openModal, setOpenModal] = useState(false)
   const [userWishes, setUserWishes] = useState([])
   const [userWishId, setUserWishId] = useState(null)
   const navigate = useNavigate()

   const getUserWishes = async () => {
      const wishesResponse = await axiosInstance.get(
         `/wishlists/user/${userId}`
      )
      setUserWishes(wishesResponse.data)
   }

   const handleChange = (e, id) => {
      if (e.target.innerText === 'Редактировать') {
         console.log('edit')
      } else if (e.target.innerText === 'Удалить') {
         setOpenModal(true)
         setUserWishId(id)
      }
   }

   const deleteWish = async () => {
      await axiosInstance.delete(`/wishlists/${userWishId}`)
      setOpenModal(false)
      getUserWishes()
   }

   const goToWishProfile = async (id) => {
      navigate(`wish/${id}`)
   }

   useEffect(() => {
      getUserWishes()
   }, [])
   return (
      <Container>
         {userWishes.map((wish) => {
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
                  onGetThingById={() => goToWishProfile(wish.wishId)}
                  showBottomBooker="true"
                  meatballsOptions={[
                     { title: 'Редактировать', icon: <EditIcon /> },
                     { title: 'Удалить', icon: <DeleteIcon /> },
                  ]}
                  handleChange={(e) => handleChange(e, wish.wishId)}
               />
            )
         })}
         {openModal && (
            <DeleteModal
               open={openModal}
               setOpen={setOpenModal}
               onDelete={deleteWish}
            />
         )}
      </Container>
   )
}

const Container = styled('div')`
   display: flex;
   gap: 2.4vw;
   flex-wrap: wrap;
`
