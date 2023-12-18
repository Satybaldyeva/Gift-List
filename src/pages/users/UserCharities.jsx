import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { axiosInstance } from '../../config/axiosInstance'
import { Card } from '../../components/UI/card/Card'
import { DeleteIcon, EditIcon } from '../../assets'
import { DeleteModal } from '../../components/UI/DeleteModal'

export const UserCharities = () => {
   const { userId } = useSelector((state) => state.users)
   const [openModal, setOpenModal] = useState(false)
   const [userCharities, setUserCharities] = useState([])
   const [charityId, setCharityId] = useState(null)
   const navigate = useNavigate()

   const getUserCharities = async () => {
      const charityResponse = await axiosInstance.get(
         `/charity/myCharities?userId=${userId}`
      )
      setUserCharities(charityResponse.data)
   }

   const handleChange = (e, id) => {
      if (e.target.innerText === 'Редактировать') {
         console.log('edit')
      } else if (e.target.innerText === 'Удалить') {
         setOpenModal(true)
         setCharityId(id)
      }
   }

   const deleteCharity = async () => {
      await axiosInstance.delete(`/charity?charityId=${charityId}`)
      setOpenModal(false)
      getUserCharities()
   }

   const goToCharityProfile = async (id) => {
      navigate(`charity/${id}`)
   }

   useEffect(() => {
      getUserCharities()
   }, [])

   return (
      <Container>
         {userCharities.map((charity) => {
            return (
               <Card
                  key={charity?.charityId}
                  date={charity?.createdAt}
                  cardImage={charity?.charityImage}
                  holiday={charity?.nameCharity}
                  status={charity?.status}
                  newOrOld={charity?.condition === 'USED' ? 'Б/У' : 'Новый'}
                  variant="withStatusBottom"
                  showBottomBooker="true"
                  isBlock={charity?.isBlock}
                  bookerImage={charity?.bookedUserImage}
                  onGetThingById={() => goToCharityProfile(charity.charityId)}
                  meatballsOptions={[
                     { title: 'Редактировать', icon: <EditIcon /> },
                     { title: 'Удалить', icon: <DeleteIcon /> },
                  ]}
                  handleChange={(e) => handleChange(e, charity.charityId)}
               />
            )
         })}
         {openModal && (
            <DeleteModal
               open={openModal}
               setOpen={setOpenModal}
               onDelete={deleteCharity}
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
