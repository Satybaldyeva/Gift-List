import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { Button } from '../../components/UI/Button'
import {
   FriendsMakeASelphyImage,
   FacebookIcon,
   InstagramIcon,
   VkIcon,
   GirlsImage,
   ArrowDown,
} from '../../assets'

export const MainPage = () => {
   const scrollToAboutProjectComponentHandler = () => {}
   const scrollToMainPagePartOneComponentHandler = () => {}

   return (
      <StyledMuiMainPage component="div">
         <MainPageContainer component="div">
            <MainPageHeader component="header">
               <MainPageNav component="nav">
                  <AboutProjectAndCharityTitle
                     onClick={scrollToAboutProjectComponentHandler}
                     variant="p"
                  >
                     О проекте
                  </AboutProjectAndCharityTitle>
                  <ProjectTitle variant="h1">GIFT LIST</ProjectTitle>
                  <AboutProjectAndCharityTitle
                     onClick={scrollToMainPagePartOneComponentHandler}
                     variant="p"
                  >
                     Благотворительность
                  </AboutProjectAndCharityTitle>
               </MainPageNav>
            </MainPageHeader>
            <MainPageInfoBlock>
               <SocialMediasAndFriendMakeASelphyContainer>
                  <SocialMediasContainer>
                     <a href="https://www.facebook.com/">
                        <img src={FacebookIcon} alt="facebook" />
                     </a>
                     <a href="https://vk.com/feed">
                        <img src={VkIcon} alt="vk" />
                     </a>
                     <a href="https://www.instagram.com/">
                        <img src={InstagramIcon} alt="instagram" />
                     </a>
                  </SocialMediasContainer>
                  <FriendsMakeASelphyImageContainer>
                     <img src={FriendsMakeASelphyImage} alt="friends" />
                  </FriendsMakeASelphyImageContainer>
               </SocialMediasAndFriendMakeASelphyContainer>
               <ProjectInfo component="div">
                  <MainTitle variant="h1">
                     Социальная сеть нового поколения
                  </MainTitle>
                  <Description variant="p">
                     Всегда подскажет, что подарить близким и осуществит твои
                     желания
                  </Description>
                  <ButtonsContainer component="div">
                     <StyledButton variant="contained">Войти</StyledButton>
                     <StyledButton variant="outlined">Регистрация</StyledButton>
                  </ButtonsContainer>
               </ProjectInfo>
               <ScrollDownAndGirlsImageContainer component="div">
                  <ImageWithGirlsContainer component="div">
                     <img src={GirlsImage} alt="girls img" />
                  </ImageWithGirlsContainer>
                  <ScrollDown component="div">
                     <img src={ArrowDown} alt="arrow down" />
                     <ScrollDownText variant="p">Листайте вниз</ScrollDownText>
                  </ScrollDown>
               </ScrollDownAndGirlsImageContainer>
            </MainPageInfoBlock>
         </MainPageContainer>
      </StyledMuiMainPage>
   )
}

const StyledMuiMainPage = styled(Box)`
   background-color: #8639b5;
   color: white;
`

const MainPageContainer = styled(Box)`
   padding-top: 1.5rem;
   width: 73rem;
   height: 50rem;
   margin: 0 auto;
`

const MainPageHeader = styled(Box)``

const MainPageNav = styled(Box)`
   display: flex;
   justify-content: space-between;
`

const MainPageInfoBlock = styled(Box)`
   display: flex;
   padding-top: 5rem;
   justify-content: space-between;
`

const ProjectTitle = styled(Typography)`
   font-size: 1.5rem;
   font-weight: 700;
`
const AboutProjectAndCharityTitle = styled(Typography)`
   font-size: 1rem;
   font-weight: 500;
   cursor: pointer;
`

const ProjectInfo = styled(Box)`
   width: 33.875rem;
   height: 22.0625rem;
   display: flex;
   flex-direction: column;
   align-items: center;
   align-self: center;
   margin-top: 5rem;
   gap: 3rem;
`

const SocialMediasAndFriendMakeASelphyContainer = styled(Box)`
   display: flex;
   flex-direction: column-reverse;
   justify-content: space-between;
`

const SocialMediasContainer = styled(Box)`
   width: 1.375rem;
   height: 7.875rem;

   display: flex;
   flex-direction: column;
   justify-content: space-between;

   margin-bottom: 5rem;

   img {
      width: 100%;
      height: 1.375rem;
   }
`

const ImageWithGirlsContainer = styled(Box)`
   display: flex;
   justify-content: flex-end;
   width: 19.8rem;
   height: 20.625rem;
`

const MainTitle = styled(Typography)`
   text-align: center;
   font-size: 3.375rem;
   font-family: Inter;
`

const Description = styled(Typography)`
   width: 21rem;
   text-align: center;
   font-size: 1rem;
   font-weight: 400;
   font-family: Inter;
`

const ButtonsContainer = styled(Box)`
   width: 18.1875rem;
   height: 5.9375rem;
   display: flex;
   flex-direction: column;
   gap: 1rem;
`

const StyledButton = styled(Button)`
   padding: 0.45rem 1.5rem;
   font-size: 1rem;
   font-weight: 500;
   font-family: Inter;
`

const FriendsMakeASelphyImageContainer = styled(Box)`
   display: flex;
   align-self: flex-end;
   padding-left: -30px;
   width: 16.875rem;
   height: 20.625rem;
   order: -1;
`

const ScrollDown = styled(Box)`
   display: flex;
   align-items: flex-end;
   width: 11.5rem;
   height: 11.5rem;
   padding: 0 10px;
   gap: 1rem;
   transform: rotate(270deg);
   align-self: flex-end;
   img {
      transform: rotate(90deg);
   }
`

const ScrollDownText = styled(Typography)`
   width: 7.563rem;
`

const ScrollDownAndGirlsImageContainer = styled(Box)`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   width: 20rem;
`