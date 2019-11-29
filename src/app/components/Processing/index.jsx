import React from "react";
import {
  Contenedor,
  TicketContainer,
  Assistant,
  Alumn,
  Fotito,
  Ticket,
  Ubicacion,
  UbicacionIcon,
  UbicacionContainer,
  AssistantContainer,
  AlumnContainer,
  Continue
} from "./style";

export default ({ ticket }) => {
  React.useEffect(() => console.log(ticket), []);
  return (
    <Contenedor>
      <AssistantContainer>
        <Fotito
          size="24px"
          src="/images/alumno.jpeg"
          margin="0 12px 0 0 "
        ></Fotito>
        <Assistant>
          {/* {`${ticket.comment.replier.name} ${ticket.comment.replier.lastname}`} */}
          Tati Vega
        </Assistant>
      </AssistantContainer>
      <UbicacionContainer>
        <UbicacionIcon src="/images/icon-maps.svg"></UbicacionIcon>

        <Ubicacion> en Sala 5 </Ubicacion>
      </UbicacionContainer>

      <TicketContainer>
        <AlumnContainer>
          <Fotito
            src="/images/alumno.jpeg"
            size="18px"
            margin="0 8px 0 0 "
          ></Fotito>
          <Alumn>
            {/* {ticket.author.name} */}
            Tati Vega
          </Alumn>
        </AlumnContainer>

        <Ticket>
          {/* {ticket.title} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero
          lorem, hendrerit a rhoncus nec, volutpat at turpis. Nullam vel viverra
          magna. Donec nec faucibus quam.
        </Ticket>
        <Continue>Seguir leyendo</Continue>
      </TicketContainer>
    </Contenedor>
  );
};
