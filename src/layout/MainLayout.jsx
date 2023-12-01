import { styled } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { CardIcon, ListIcon } from '../assets'
import { Header } from '../components/Header'
import { Button } from '../components/UI/Button'
import { Sidebar } from '../components/UI/Sidebar'
import { providerEvent } from '../events/customEvents'
import { routes } from '../utils/constants'
import { findNumberLength } from '../utils/helpers/constants'

const isNumber = (textForTest) => /^\d+$/.test(textForTest)

const transformObjectRoutesToArray = (role) =>
   Object.entries(routes[role])
      .map(([pathname, breadcrumb]) => ({
         path: pathname,
         breadcrumb: breadcrumb.breadcrumb,
      }))
      .slice(1)

const getLastElementOfPath = (path) => path.slice(-1)

export const MainLayout = ({ role, isList, toggleList, headerSelectType }) => {
   const routesArray = transformObjectRoutesToArray(role)
   const breadcrumbs = useBreadcrumbs(routesArray, {
      excludePaths: ['/', 'user', 'admin'],
   })
   const [inner, setInner] = useState(false)
   const path = useParams()
   const [byIdName, setByIdName] = useState('')
   const buttonContent = routes[role][path['*']]?.buttonContent
   const navigate = useNavigate()
   const { charities } = useSelector((state) => state.charity)
   const { id } = useSelector((state) => state.authLogin)

   useEffect(() => {
      if (path['*'].includes('/')) {
         setInner(true)
      } else {
         setInner(false)
      }
   }, [path])

   const handleDataUpdated = (event) => {
      if (event.detail.action === 'name') {
         setByIdName(event.detail.payload)
      }
   }

   useEffect(() => {
      window.addEventListener('providerEvent', handleDataUpdated)
      return () => {
         window.removeEventListener('providerEvent', handleDataUpdated)
      }
   }, [])

   const latestCharities = charities
      .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)

   return (
      <>
         <Sidebar roleName={role} />
         <MainContainer>
            <Header variantOfSelect={headerSelectType} />
            <MainContentWrapper>
               <StyledMainContentHeader>
                  <ImagesAndBreadcrumbsWrapper>
                     <StyledLegend isinner={inner}>
                        {breadcrumbs.map(({ match }, index) => (
                           <Fragment key={match.pathname}>
                              {(index !== 1 &&
                                 isNumber(
                                    getLastElementOfPath(match.pathname)
                                 )) || (
                                 <StyledNavLink
                                    to={
                                       (findNumberLength(match.pathname) &&
                                          path['*']) ||
                                       match.pathname
                                    }
                                    active={
                                       breadcrumbs.length - 1 === index ||
                                       findNumberLength(match.pathname)
                                          ? 'true'
                                          : ''
                                    }
                                 >
                                    {isNumber(
                                       getLastElementOfPath(match.pathname)
                                    )
                                       ? isNumber(
                                            match.pathname.split('/').pop()
                                         ) && byIdName
                                       : routes[role][
                                            match.pathname.split('/').pop()
                                         ]?.breadcrumb}
                                 </StyledNavLink>
                              )}
                              {index !== 1 &&
                                 index !== breadcrumbs.length - 1 &&
                                 ' / '}
                           </Fragment>
                        ))}
                     </StyledLegend>
                     {path['*'] === 'charity' && (
                        <StyledImagesContainer>
                           {latestCharities.map((charity) => (
                              <button
                                 type="button"
                                 onClick={() => {
                                    providerEvent({
                                       action: 'name',
                                       payload: charity.nameCharity,
                                    })
                                    navigate(
                                       `charity/${charity.charityId}/${id}`
                                    )
                                 }}
                                 key={charity.charityId}
                              >
                                 <img
                                    src={charity.charityImage}
                                    alt={charity.nameCharity}
                                 />
                              </button>
                           ))}
                        </StyledImagesContainer>
                     )}
                  </ImagesAndBreadcrumbsWrapper>
                  <StyledActions>
                     {!inner && routes[role][path['*']]?.showListActions && (
                        <div>
                           <StyledButton onClick={toggleList} disableRipple>
                              <CardIcon className={`${!isList && 'active'}`} />
                           </StyledButton>
                           <StyledButton onClick={toggleList} disableRipple>
                              <ListIcon className={`${isList && 'active'}`} />
                           </StyledButton>
                        </div>
                     )}

                     {buttonContent && (
                        <StyledSomethingAddButton
                           variant="primary"
                           onClick={() =>
                              routes[role][path['*']]?.onClick(navigate)
                           }
                        >
                           + {buttonContent}
                        </StyledSomethingAddButton>
                     )}
                  </StyledActions>
               </StyledMainContentHeader>
               <Outlet />
            </MainContentWrapper>
         </MainContainer>
      </>
   )
}

const ImagesAndBreadcrumbsWrapper = styled('div')({
   display: 'flex',
   gap: '35px',
   alignItems: 'center',
})

const StyledImagesContainer = styled('div')({
   display: 'flex',
   gap: '20px',
   img: {
      height: '39px',
      width: '39px',
      borderRadius: '39px',
   },
   button: {
      height: '39px',
      width: '39px',
      borderRadius: '39px',
      border: 'none',
   },
})

const StyledSomethingAddButton = styled(Button)({ padding: '6px 20px' })

const StyledActions = styled('div')({
   display: 'flex',
   gap: '15px',
   alignItems: 'center',
})

const StyledNavLink = styled(NavLink)(({ active }) => ({
   color: active ? '#000000' : '#B4B4B4',
   textDecoration: 'none',
}))

const StyledButton = styled(Button)({
   borderRadius: '3px',
   padding: '2px',
   span: {
      display: 'none',
   },
   minWidth: 'inherit',
   borderColor: '#EBEAED',
   svg: {
      fill: '#84818A',
   },
   'svg.active': {
      fill: '#8639B5',
   },
   '&:hover': {
      backgroundColor: '#BDBDBD',
   },
})

const StyledMainContentHeader = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   paddingBottom: '30px',
   paddingRight: '21px',
})

const MainContentWrapper = styled('fieldset')({
   border: 'none',
   padding: '20px',
})

const MainContainer = styled('div')({
   backgroundColor: '#F7F8FA',
   marginLeft: '18.4rem',
   display: 'flex',
   flexDirection: 'column',
   gap: '50px',
   minHeight: '100vh',
})

const StyledLegend = styled('legend')(({ isinner }) => ({
   fontSize: isinner ? '0.875rem' : '1.5rem',
   fontWeight: '500',
   letterSpacing: '0.0125rem',
}))
