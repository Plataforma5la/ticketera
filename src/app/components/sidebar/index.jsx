import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchedTickets } from "../../redux/actions/search";

import {
  Container,
  Header,
  P5,
  TitleContainer,
  Title,
  Icon,
  IconContainer
} from "./style";

export default function SidebarComponent() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  let match = useLocation();
  const [icon, setIcon] = React.useState("dashboard");
  const status = user.isAdmin ? "processing" : "pending";


  return (
    <Container>
      <Header>
        <Link onClick={() => setIcon("dashboard")} to="/">
          <P5 src="/images/logo2.png" />
        </Link>
      </Header>
      <Link
        onClick={() => setIcon("dashboard")}
        style={{ textDecoration: "none" }}
        to="/"
      >
        <TitleContainer>
          <IconContainer>
            <Icon
              source={
                icon == "dashboard"
                  ? "/images/dashboard-active.svg"
                  : "/images/dashboard.svg"
              }
            />
          </IconContainer>
          <Title active={icon == "dashboard"} >DASHBOARD</Title>
        </TitleContainer>
      </Link>
      <Link
        onClick={() => setIcon("userTickets")}
        style={{ textDecoration: "none" }}
        to={`/userTickets/${status}`}
      >
        <TitleContainer>
          <IconContainer>
            <Icon
              source={
                icon == "userTickets"
                  ? "/images/question-active.svg"
                  : "/images/question.svg"
              }
            />
          </IconContainer>
          <Title active={icon == "userTickets"}>MIS PREGUNTAS</Title>
        </TitleContainer>
      </Link>
      <Link
        onClick={() => setIcon("devpedia")}
        style={{ textDecoration: "none" }}
        to="/devpedia"
      >
        <TitleContainer onClick={() => dispatch(fetchSearchedTickets())}>
          <IconContainer>
            <Icon
              source={
                icon == "devpedia"
                  ? "/images/code-active.svg"
                  : "/images/code.svg"
              }
            />
          </IconContainer>
          <Title active={icon == "devpedia"}>DEVPEDIA</Title>
        </TitleContainer>
      </Link>
      {user.isAdmin ? (
        <div>
          <Link
            onClick={() => setIcon("users")}
            style={{ textDecoration: "none" }}
            to="/admin/users"
          >
            <TitleContainer>
              <IconContainer>
                <Icon
                  source={
                    icon == "users"
                      ? "/images/people-active.svg"
                      : "/images/people.svg"
                  }
                />
              </IconContainer>
              <Title active={icon == "users"}>USUARIOS</Title>
            </TitleContainer>
          </Link>

          <Link
            onClick={() => setIcon("setting")}
            style={{ textDecoration: "none" }}
          >
            <TitleContainer>
              <IconContainer>
                <Icon
                  source={
                    icon == "setting"
                      ? "/images/settings-active.svg"
                      : "/images/settings.svg"
                  }
                />
              </IconContainer>
              <Title active={icon == "setting"}>CONFIGURACIÓN</Title>
            </TitleContainer>
          </Link>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
