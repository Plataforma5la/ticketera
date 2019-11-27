import axios from "axios";
import { FETCH_OPEN, FETCH_PROCESSING } from "../constants";

const setOpen = open => ({
  type: FETCH_OPEN,
  open
});

const setProcessing = processing => ({
  type: FETCH_PROCESSING,
  processing
});

export const fetchOpen = () => dispatch =>
  axios
    .get("/api/ticket/status/1")
    .then(res => res.data)
    .then(tickets => dispatch(setOpen(tickets)));

export const fetchProcessing = () => dispatch =>
  axios
    .get("/api/ticket/status/2")
    .then(res => res.data)
    .then(tickets => dispatch(setProcessing(tickets)));

export const addParticipant = ticketId => dispatch =>
  axios
    .post("/api/ticket/participant", ticketId)
    .then(res => res.data)
    .then(tickets => dispatch(setOpen(tickets)));

export const removeParticipant = ticketId => dispatch =>
  axios
    .put("/api/ticket/participant", ticketId)
    .then(res => res.data)
    .then(tickets => dispatch(setOpen(tickets)));