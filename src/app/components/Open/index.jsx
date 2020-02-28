import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import SuperButton from "./utils";
import { Link, useLocation } from "react-router-dom";
import "moment/locale/es";
moment.locale("es");

import Answer from "../Answer/index";

import {
  Ticket,
  Header,
  Img,
  Author,
  TicketTitle,
  AuthorName,
  EmptyParticipant,
  TicketDate,
  Icon,
  Body,
  TicketContent,
  TicketLink,
  Buttons,
  ShareButton,
  TicketFooter,
  PartipantsImg,
  ParticipantIcon,
  Line,
  BtnVerRespuesta,
  LabelButton,
  Image,
  ModalImage
} from "./style";
import { ModalBackground } from "../modalBackground/style";

export default function Open({ ticket, index, params }) {
  const user = useSelector(state => state.user.user);
  const url = useLocation();
  const [showImage, setShowImage] = useState(null);

  const isHighlighted = ticket => {
    return (
      ticket.authorId === user.id ||
      (ticket.users &&
        ticket.users.some(participant => participant.id === user.id))
    );
  };

  const date = moment(ticket.createdAt).calendar();
  return (
    <Ticket isHighlighted={isHighlighted(ticket)}>
      {ticket.author && (
        <>
          {ticket.statusId === 4 && params !== ticket.slug ? (
            <Header backgroundColor={"rgba(255, 255, 255, 0.08)"}>
              <Img src={ticket.comment.replier.img} alt="foto usuario" />

              {ticket.comment.replier.id === user.id ? (
                <Author>
                  <AuthorName>{ticket.comment.replier.name}</AuthorName>
                  <TicketDate color={"#cf6679"}>
                    Rechazaste esta pregunta
                  </TicketDate>
                </Author>
              ) : (
                <Author>
                  <AuthorName>{ticket.comment.replier.name}</AuthorName>
                  <TicketDate color={"#cf6679"}>
                    Rechazo esta pregunta
                  </TicketDate>
                </Author>
              )}

              <Link to={`/${ticket.slug}`}>
                <BtnVerRespuesta>
                  <LabelButton>VER RESPUESTA</LabelButton>
                </BtnVerRespuesta>
              </Link>
            </Header>
          ) : ticket.statusId === 3 && params !== ticket.slug ? (
            <Header backgroundColor={"rgba(255, 255, 255, 0.08)"}>
              <Img src={ticket.comment.replier.img} alt="foto usuario" />
              {ticket.comment.replier.id === user.id ? (
                <Author>
                  <AuthorName>{ticket.comment.replier.name}</AuthorName>
                  <TicketDate color={"white"}>
                    Respondiste esta pregunta
                  </TicketDate>
                </Author>
              ) : (
                <Author>
                  <AuthorName>{ticket.comment.replier.name}</AuthorName>
                  <TicketDate color={"white"}>
                    Respondió esta pregunta
                  </TicketDate>
                </Author>
              )}

              <Link to={`/${ticket.slug}`}>
                <BtnVerRespuesta backgroundColor={"#62d0ff"}>
                  <LabelButton>VER RESPUESTA</LabelButton>
                </BtnVerRespuesta>
              </Link>
            </Header>
          ) : null}

          <Header>
            <Img src={ticket.author.img} alt="foto usuario" />
            <Author>
              <AuthorName>
                {ticket.author.name} {ticket.author.lastname}
              </AuthorName>
              <TicketDate>{`Preguntó ${date}`}</TicketDate>
            </Author>

            {!index && ticket.statusId != 1 ? (
              ""
            ) : !index && ticket.statusId === 1 ? (
              <Icon>PENDIENTE</Icon>
            ) : (
              <Icon>#{index}</Icon>
            )}
          </Header>
          <Body>
            {url.pathname.includes(ticket.slug) ? (
              <TicketTitle>{ticket.title}</TicketTitle>
            ) : (
              <Link to={`/${ticket.slug}`}>
                <TicketTitle>{ticket.title}</TicketTitle>
              </Link>
            )}
            {ticket.content &&
            ticket.content.length > 140 &&
            params !== ticket.slug ? (
              <div>
                <Link to={`/${ticket.slug}`}>
                  <TicketContent>
                    {ticket.content.slice(0, 140)} ...
                  </TicketContent>
                  <TicketLink>Seguir leyendo</TicketLink>
                </Link>
              </div>
            ) : (
              <>
                <TicketContent> {ticket.content}</TicketContent>
                {ticket.images &&
                  ticket.images.map(image => {
                    return (
                      <Image
                        onClick={() => setShowImage(image)}
                        src={image}
                      ></Image>
                    );
                  })}
                {showImage && (
                  <ModalBackground>
                    <div>
                      <ModalImage
                        src={showImage}
                        alt=""
                        onClick={() => setShowImage(null)}
                      ></ModalImage>
                    </div>
                  </ModalBackground>
                )}
              </>
            )}
            {params === ticket.slug &&
              (ticket.statusId === 3 || ticket.statusId === 4) && (
                <Answer ticket={ticket} />
              )}
          </Body>
          <Line />
          <TicketFooter>
            <SuperButton ticket={ticket} />
            {ticket.users.length ? (
              <PartipantsImg>
                {ticket.users.length > 9 ? (
                  <ParticipantIcon>+9</ParticipantIcon>
                ) : (
                  <ParticipantIcon>{ticket.users.length}</ParticipantIcon>
                )}
              </PartipantsImg>
            ) : (
              <EmptyParticipant></EmptyParticipant>
            )}
          </TicketFooter>
        </>
      )}
    </Ticket>
  );
}
