import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  answerTicket, //no es lo mismo que setStatus??
  fetchOpen, //busca los tickets por status
  fetchProcessing, //lista los que estan en proceso
  fetchUserTickets
} from "../../redux/actions/tickets";

import {
  ModalBackground,
  ModalContainer,
  TicketTitle,
  TicketContent,
  ModalInput,
  ButtonContainer,
  StatusButton,
  ModalButton,
  ModalButtonLabel,
  ModalInputContainer,
  Line,
  UploadContainer
} from "./style";
import { SessionText } from "../../session/style";

import {
  ModalQuestion,
  Icon,
  ModalUploadBox,
  ModalUploadBoxPlus,
  ModalCloseButton

} from "../../components/makeQuestion/style";

export default function AnswerTicketContainer({ ticket, setShowAnswerModal }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(ticket.statusId);
  const [description, setDescription] = useState("");
  const [inputComp, setInputComp] = useState(false);
  const [inputResp, setInputResp] = useState(false);
  const [inputRechazado, setInputRechazado] = useState(false);
  const [errorMsg, setErrorMsg]= useState("")
  

  const handleSubmit = id => {
    if (!description.length > 0 && (status === 3|| status ===2)) {
      setErrorMsg("complete el campo");
    } else {
      dispatch(answerTicket(id, { status, description }))
        .then(() => dispatch(fetchOpen()))
        .then(() => dispatch(fetchUserTickets()))
        .then(() => setShowAnswerModal(false))
        .catch(err => setErrorMsg("Ingrese una respuesta"));
    }
  };

  
  return (
    <ModalBackground>
       
      <ModalContainer>
      <ModalCloseButton  onClick={() => {
          setShowAnswerModal(false);
        }}>
              X
            </ModalCloseButton>
        <TicketTitle>
          <strong>{ticket.title}</strong>
        </TicketTitle>
       
        <TicketContent>{ticket.content}</TicketContent>
        <UploadContainer>
          <ModalQuestion marginTop={"10px"}>
            <Icon src="images/icon-file-attachment-24-px.png"></Icon>
            Adjuntar archivos
          </ModalQuestion>
          <ModalUploadBox>
            <ModalUploadBoxPlus
              type="file"
              id="file-uploader"
              name="image"
              accept="image/*"
              /*  onChange={handleImageChange} */
            ></ModalUploadBoxPlus>
          </ModalUploadBox>
          <Line></Line>
        </UploadContainer>
   
        <ButtonContainer justifyContent={"space-around"} marginTop={"8px"}>
          <StatusButton primary={status==1}
            onClick={() => {
              setStatus(1),
              setInputResp(false),
              setInputComp(false),
              setInputRechazado(false);
              setErrorMsg("");
              setDescription("")
            }} 
          >
            PENDIENTE
          </StatusButton>
          <StatusButton
          primary={status==2}
            onClick={() => {
              setStatus(2),
              setInputResp(!inputResp),
              setInputComp(false),
              setInputRechazado(false);
              setErrorMsg("");
              setDescription("");
            }}
          >
            RESPONDIENDO
          </StatusButton>
          <StatusButton
          primary={status==3}
            onClick={() => {
              setStatus(3),
              setInputComp(!inputComp),
              setInputResp(false),
              setInputRechazado(false);
              setErrorMsg("");
              setDescription("");
            }}
          >
            COMPLETADA
          </StatusButton>
          <StatusButton
          primary={status==4}
            onClick={() => {
              setStatus(4),
              setInputResp(false),
              setInputComp(false),
              setInputRechazado(!inputRechazado);
              setErrorMsg("");
              setDescription("");
            }}
          >
            RECHAZADA
          </StatusButton>
        </ButtonContainer>

        {/* //muestra input */}
        {inputResp && (
          <ModalInputContainer>
            <ModalInput
              name="description"
              placeholder="En dónde vas a responder la pregunta?"
              height={"54px"}
              onChange={e => setDescription(e.target.value)}
            ></ModalInput>
          </ModalInputContainer>
        )}
        {inputComp && (
          <ModalInputContainer>
            <ModalInput
              placeholder="Escribir respuesta"
              name="description"
              height={"112px"}
              onChange={e => setDescription(e.target.value)}
            ></ModalInput>
          </ModalInputContainer>
        )}

        {inputRechazado && (
          <ModalInputContainer>
            <ModalInput
              placeholder="Escriba motivo de rechazo"
              name="description"
              height={"112px"}
              onChange={e => setDescription(e.target.value)}
            ></ModalInput>
          </ModalInputContainer>
        )}

        {errorMsg && description.length <= 0 ? (
          <SessionText color={"red"} marginLeft={"35px"} fontStyle={"bold"}>
            {errorMsg}
          </SessionText>
        ) : null}

        <ButtonContainer justifyContent={"flex-end"} marginTop={"30px"}>
          <ModalButton
            color="transparent"
            border="solid 1px rgba(255, 255, 255, 0.12);"
            marginRight="12px"
            onClick={() => setShowAnswerModal(false)}
          >
            <ModalButtonLabel color="#62d0ff">CANCELAR</ModalButtonLabel>
          </ModalButton>

          <ModalButton
            color="#62d0ff"
            type="submit"
            border="none"
            onClick={e => {
              e.preventDefault();
              handleSubmit(ticket.id);
            }}
          >
            <ModalButtonLabel color="#071c34">PUBLICAR</ModalButtonLabel>
          </ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
}
