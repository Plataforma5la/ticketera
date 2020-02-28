import React, { useState, useEffect } from "react";
import Socket from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import NotificationModal from "../../components/Notifications/index";
import { UserModal } from "../../components/UserOptionModal/index";
import {
  FancyDiv,
  Rectangle,
  NavbarContainer,
  Search,
  ProfileImg,
  NotificacionDiv,
  SearchIcon,
  UserName,
  ButtonLogOut,
  ProfileContainer
} from "./style";
import { fetchSearchedTickets } from "../../redux/actions/search";
import NotificationBell from "./NotificationBell";
// import { logOutUser } from "../../redux/actions/user";
// import { Notification } from "../../components/Notifications/style";

export const Navbar = props => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [options, setOptions] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setshowNotifications] = useState(false);

  // const favicon = document.getElementById("favicon");

  // useEffect(() => {
  //   if (notifications) {
  //     favicon.href = "/src/public/images/favicorojo.ico";
  //   } else {
  //     favicon.href = "/src/public/images/faviconazul.ico";
  //   }
  // }, [notifications]);

  // Socket on ticket status update
  Socket.on("statusChanged", data => {
    setNotifications([...notifications, data]);
    setshowNotifications(true);
  });

  // Socket on Ticket Deleted
  Socket.on("deleted", data => {
    setshowNotifications(true);
    setNotifications([...notifications, data]);
  });

  const user = useSelector(state => state.user.user);
  //   const profilePic = useSelector(state => state.user // SRC DE ProfilePic

  const handleClick = () => {
    !options ? setOptions(true) : setOptions(false);
  };

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(fetchSearchedTickets(input)).then(() =>
      props.history.push("/devpedia")
    );
    setInput("");
  };
  NotificacionDiv.onOu;
  return (
    <NavbarContainer>
      <form onSubmit={handleSubmit}>
        <Rectangle>
          <SearchIcon src="/images/searchicon.png" />
          <Search
            value={input}
            placeholder="Buscar respuestas en la Devpedia"
            onChange={e => handleChange(e)}
          />
        </Rectangle>
      </form>
      <FancyDiv>
        <NotificationBell
          notification={notification}
          notifications={notifications}
          setNotification={setNotification}
          setshowNotifications={setshowNotifications}
          showNotifications={showNotifications}
        />
        <ProfileContainer onClick={() => handleClick()}>
          <ProfileImg src={user.img} />

          <UserName>{user.name}</UserName>
          {options ? <UserModal props={props} /> : null}
        </ProfileContainer>
        {/* <ButtonLogOut src="/images/logout.svg"  ></ButtonLogOut> */}
      </FancyDiv>
    </NavbarContainer>
  );
};

// const favIconToggle = ({notifications}) => {
//   if (notifications) {
//     favIconToggle.href = "/src/public/images/favicorojo.ico"
//   } else {
//     favIconToggle.href = "/src/public/images/favicoazul.ico";
//   }
// }
