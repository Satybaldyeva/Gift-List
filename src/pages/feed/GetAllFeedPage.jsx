import { Paper, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ComplaintModal, causes } from '../../components/ComplaintModal'
import { Card } from '../../components/UI/card/Card'
import { LoadingPage } from '../../components/loadingpage/LoadingPage'
import { providerEvent } from '../../events/customEvents'
import {
   bookingCharityThunk,
   bookingWishThunk,
   unBookingWishThunk,
   unbookingCharityThunk,
} from '../../store/booking/bookingThunk'
import {
   complaintCharityThunk,
   complaintWishThunk,
} from '../../store/complaint/complaintThunk'
import { addToMyGifts, getFeedsThunk } from '../../store/feed/feedThunk'
import {
   meetballsFeedOptionsForCharity,
   meetballsFeedOptionsForWish,
} from '../../utils/constants/meatballs-options'
import { convertDateFormat } from '../../utils/helpers/constants'
import { SecondEmptyComponent } from '../LandingPage/SecondEmptyComponent'

const isWishBooked = (bookerId, myId, type, allReadyInWishList) => {
   let meatballsOptionsForReturn = []
   switch (type) {
      case 'WISH':
         if (!bookerId) {
            meatballsOptionsForReturn = meetballsFeedOptionsForWish.isWishFree
         }
         if (bookerId === myId) {
            meatballsOptionsForReturn =
               meetballsFeedOptionsForWish.iBookThisWish
         }
         if (bookerId && bookerId !== myId) {
            meatballsOptionsForReturn =
               meetballsFeedOptionsForWish.strangersBook
         }
         if (allReadyInWishList) {
            meatballsOptionsForReturn = meatballsOptionsForReturn.filter(
               ({ title }) => title !== 'Добавить в мои подарки'
            )
         }
         return meatballsOptionsForReturn
      case 'CHARITY':
         if (!bookerId) {
            meatballsOptionsForReturn =
               meetballsFeedOptionsForCharity.isCharityFree
         }
         if (bookerId === myId) {
            meatballsOptionsForReturn =
               meetballsFeedOptionsForCharity.iBookThisCharity
         }
         meatballsOptionsForReturn =
            meetballsFeedOptionsForCharity.strangersBook
         if (allReadyInWishList) {
            meatballsOptionsForReturn = meatballsOptionsForReturn.filter(
               ({ title }) => title !== 'Добавить в мои подарки'
            )
         }
         return meatballsOptionsForReturn
      default:
         return []
   }
}

const functionsRealtiveTypeOfThing = {
   WISH: (e, wishId, dispatch, toggleCompolaintModal, userId, type) => {
      const selectedOption = e.target.innerText
      switch (selectedOption) {
         case 'Пожаловаться':
            toggleCompolaintModal(wishId, type)
            break
         case 'Добавить в мои подарки':
            dispatch(addToMyGifts({ userId, wishId }))
            break
         case 'Забронировать':
            dispatch(
               bookingWishThunk({
                  wishId,
                  isBookingAnonymous: false,
                  userId,
                  getSomethingFunction: getFeedsThunk,
               })
            )
            break
         case 'Забронировать анонимно':
            dispatch(
               bookingWishThunk({
                  wishId,
                  isBookingAnonymous: true,
                  userId,
                  getSomethingFunction: getFeedsThunk,
               })
            )
            break
         default:
            dispatch(
               unBookingWishThunk({
                  wishId,
                  userId,
                  getSomethingFunction: getFeedsThunk,
               })
            )
            break
      }
   },
   CHARITY: (e, charityId, dispatch, toggleCompolaintModal, userId, type) => {
      const selectedOption = e.target.innerText
      switch (selectedOption) {
         case 'Пожаловаться':
            toggleCompolaintModal(charityId, type)
            break
         case 'Забронировать':
            dispatch(
               bookingCharityThunk({
                  charityId,
                  isBookingAnonymous: false,
                  userId,
               })
            )
            break
         case 'Забронировать анонимно':
            dispatch(
               bookingCharityThunk({
                  charityId,
                  isBookingAnonymous: true,
                  userId,
               })
            )
            break
         default:
            dispatch(unbookingCharityThunk({ charityId, userId }))
            break
      }
   },
}

export const GetAllFeedPage = ({ isList }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [isComplaintModalOpenAndId, setIsComplaintModalOpenAndId] = useState({
      modalIsOpen: false,
      wishId: 0,
      type: '',
   })
   const toggleCompolaintModal = (thingId, type) =>
      setIsComplaintModalOpenAndId((prev) => ({
         modalIsOpen: !prev.modalIsOpen,
         thingId,
         type,
      }))
   const { feeds, pending } = useSelector((state) => state.feedSlice)
   const { id } = useSelector((state) => state.authLogin)

   const onSendComplaint = (complaintCause) => {
      const { type } = isComplaintModalOpenAndId
      const complaintRequestIdPropertyName =
         type === 'WISH' ? 'wishId' : 'charityId'
      const complaintRequest = {
         [complaintRequestIdPropertyName]: isComplaintModalOpenAndId.thingId,
      }
      if (typeof complaintCause === 'number') {
         complaintRequest.complaintType = causes.find(
            (cause) => cause.complaintId === complaintCause
         ).textInEnglish
      } else {
         complaintRequest.complaintType = 'OTHER'
         complaintRequest.complaintCause = complaintCause
      }
      if (type === 'WISH') dispatch(complaintWishThunk(complaintRequest))
      else dispatch(complaintCharityThunk(complaintRequest))
   }

   const getById = (id, wishName, type) => {
      providerEvent({ action: 'name', payload: wishName })
      navigate(`${id}`, { state: { type } })
   }

   useEffect(() => {
      dispatch(getFeedsThunk(id))
   }, [])

   if (pending) {
      return <LoadingPage />
   }

   return (
      <>
         <StyledPaper>
            {feeds.map((feed) => {
               let {
                  thingId,
                  name,
                  date,
                  variant,
                  userId,
                  reservoirId,
                  reservoirImage,
                  ownerImage,
                  thingImage,
                  holidayName,
                  bookedStatus,
                  showBottomBooker,
                  showHoliday,
               } = {}
               if (feed.type === 'WISH') {
                  date = feed.dateOfHoliday
                  holidayName = feed.holidayName
                  userId = feed.ownerId
                  reservoirId = feed.reservoirId
                  reservoirImage = feed.reservoirImage
                  ownerImage = feed.userImage
                  thingId = feed.wishId
                  thingImage = feed.wishImage
                  name = feed.wishName
                  bookedStatus = feed.wishStatus
                  showBottomBooker = true
                  variant = 'primary'
               } else if (feed.type === 'CHARITY') {
                  thingId = feed.charityId
                  name = feed.nameCharity
                  date = feed.createdAt
                  userId = feed.userId
                  reservoirId = feed.charityReservoirId
                  reservoirImage = feed.bookedUserImage
                  ownerImage = feed.userImage
                  thingImage = feed.charityImage
                  bookedStatus = feed.status
                  showBottomBooker = true
                  variant = 'withStatusTop'
               } else {
                  thingId = feed.holidayId
                  name = feed.nameHoliday
                  date = feed.dateOfHoliday
                  userId = feed.firendId
                  ownerImage = feed.friendImage
                  thingImage = feed.image
                  holidayName = feed.nameHoliday
                  showBottomBooker = false
                  showHoliday = false
                  variant = 'tertiary'
               }
               return (
                  <Card
                     handleChange={(e) => {
                        functionsRealtiveTypeOfThing[feed.type](
                           e,
                           thingId,
                           dispatch,
                           toggleCompolaintModal,
                           id,
                           feed.type
                        )
                     }}
                     onGetOwnerById={() => navigate(`/user/friends/${userId}`)}
                     showTopOwner
                     variant={variant}
                     onGetThingById={() =>
                        getById(
                           thingId,
                           name,
                           feed.type,
                           feed.allReadyInWishList
                        )
                     }
                     key={`${thingId}${feed.type}`}
                     list={isList}
                     bookerImage={reservoirImage}
                     cardImage={thingImage}
                     cardName={name}
                     date={convertDateFormat(date)}
                     showBottomBooker={showBottomBooker}
                     holiday={holidayName}
                     ownerImage={ownerImage}
                     ownerName={feed.fullName || ''}
                     meatballsOptions={isWishBooked(
                        reservoirId,
                        id,
                        feed.type,
                        feed.allReadyInWishList
                     )}
                     status={bookedStatus}
                     newOrOld={feed.condition === 'USED' ? 'Б/У' : 'Новый'}
                     showHoliday={showHoliday}
                  />
               )
            })}
            {!feeds.length && (
               <SecondEmptyComponent
                  text="Здесь будет отображен список желаемых 
подарков ваших друзей."
               />
            )}
         </StyledPaper>
         <ComplaintModal
            toggleModal={toggleCompolaintModal}
            isOpen={isComplaintModalOpenAndId.modalIsOpen}
            onSend={onSendComplaint}
         />
      </>
   )
}

const StyledPaper = styled(Paper)({
   display: 'flex',
   gap: '20px',
   flexWrap: 'wrap',
   backgroundColor: 'transparent',
   border: 'none',
   boxShadow: 'none',
})
