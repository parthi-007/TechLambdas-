import React from "react";
import "../navbar/navbar.css";
import notificationIcon from "../assets/vectors/icon_notification_2_x2.svg";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const showNotification = () => {
    toast.info("No new notification");
  };

  return (
    <>
      <div className="header">
        <span className="purchase">Purchase</span>
        <div className="user-account" onClick={showNotification}>
          <img
            className="icon-notification"
            src={notificationIcon}
            alt="Notification"
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Slide}
        transitionDuration={550}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        style={{ width: "400px" }}
      />
    </>
  );
};

export default Navbar;
