import React from "react";


import {
    Container,
    ModalContainer,
    Triangle,
    TriangleContainer,
    NotificationContainer,
    Notification,
    AvatarContainer
} from './style'

export default ({ticket}) => {
    return (
        <Container>
     <ModalContainer>
       <TriangleContainer>
         <Triangle></Triangle>
       </TriangleContainer>
       <NotificationContainer>
         <AvatarContainer src="images/github.png"></AvatarContainer>
        <Notification>
          No tenes notificaciones en este momento
        </Notification>
       </NotificationContainer>
     </ModalContainer>
    </Container>
    )
}