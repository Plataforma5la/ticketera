import React from "react";
import { NotificacionDiv, NotificationBell, NotificationIcon } from "./style";
import NotificationModal from "../../components/Notifications/index";
import onClickOutside from "react-onclickoutside";

const DIV = ({
  notification,
  setNotification,
  setshowNotifications,
  showNotifications,
  notifications
}) => {
  DIV.handleClickOutside = () => setNotification(false);
  return (
    <div>
      <NotificacionDiv>
        <NotificationBell
          onClick={() => {
            !notification ? setNotification(true) : setNotification(false);
            setshowNotifications(false);
          }}
          src="/images/notificationbell.png"
        />

        {notifications.length && showNotifications ? (
          <NotificationIcon>{notifications.length} </NotificationIcon>
        ) : (
          ""
        )}
        {notification ? (
          <NotificationModal notifications={notifications} />
        ) : null}
      </NotificacionDiv>
    </div>
  );
};
const clickOutsideConfig = {
  handleClickOutside: () => DIV.handleClickOutside
};
export default onClickOutside(DIV, clickOutsideConfig);
