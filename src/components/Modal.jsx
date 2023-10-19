import { styled } from '@mui/material'
import React from 'react'

const ModalContainer = styled('div')({
   position: 'fixed',
   top: '0',
   left: '0',
   width: '100%',
   height: '100%',
   backgroundColor: 'rgba(59, 64, 79, 0.7)',
   zIndex: '100',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
})

const ModalContent = styled('div')(({ padding }) => ({
   backgroundColor: '#ffffff',
   position: 'relative',
   borderRadius: '0.625rem',
   padding,
}))

export function Modal({ children, handleClose, isOpen, padding = '1rem' }) {
   return (
      <div>
         {isOpen && (
            <ModalContainer onClick={handleClose}>
               <ModalContent
                  padding={padding}
                  onClick={(e) => e.stopPropagation()}
               >
                  {children}
               </ModalContent>
            </ModalContainer>
         )}
      </div>
   )
}