import { styled } from '@mui/material'
import { useState } from 'react'
import { ModalWindow } from './components/ModalWindow'

export function App() {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const toggleModal = () => {
      setIsModalOpen((prev) => !prev)
   }
   const ModalMode = styled('div')({
      width: '90.625rem',
      height: '49.063rem',
   })

   return (
      <ModalMode onClick={toggleModal}>
         <ModalWindow isOpen={isModalOpen}>{}</ModalWindow>
      </ModalMode>
   )
}
