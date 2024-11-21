import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  inputClasses,
} from "@mui/material";
import "../common.css";
import { ADMIN_SIDE_BAR, EMPLOYER_SIDE_BAR, HELPER_SIDE_BAR } from "./Constant";
import LogoutIcon from "../../../Assets/SVGIcons/LogoutIcon";
import { useTranslation } from "react-i18next";
import { toastMessage } from "../../../Utils/toastMessages";
import { USER_ROLE, successType } from "../../../Constant/Constant";
import { reduxStore } from "../../../Redux/Store";
import persistStore from "redux-persist/es/persistStore";

const SideMenuBar = ({ role }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const sidebarList =
    role === USER_ROLE.helper ? HELPER_SIDE_BAR : (role === USER_ROLE.admin) ? ADMIN_SIDE_BAR : EMPLOYER_SIDE_BAR;

  if (role === USER_ROLE.agency) {
    sidebarList.forEach((sideBar) => {
      sideBar.link = sideBar.link.replace("employer", "agency");
    });
  }

  const handleLinkClick = (link) => {
    localStorage.clear();
    persistStore(reduxStore).purge();
    toastMessage(t("logout_successfully"), successType);
    navigate("/login");
  };
  const pathnameIncludesLink = (pathname, urlLinks) => {
    const index = urlLinks?.findIndex((curElem) => pathname.includes(curElem));
    if (index > -1) {
      return true;
    }
    return false;
  };
  return (
    <>
      <List className="sidebar">
        {sidebarList.map((sideBar, index) => (
          <ListItem
            key={index}
            className={
              pathname === sideBar.link ||
              (sideBar?.urlLinks?.length &&
                pathnameIncludesLink(pathname, sideBar.urlLinks))
                ? "sidebarItem active"
                : "sidebarItem"
            }
            component={Link}
            to={sideBar.link}
          >
            {sideBar.icon}
            <ListItemText primary={t(sideBar.tab_name)} />
          </ListItem>
        ))}
        <ListItem
          className="sidebarItem logout"
          component={Button}
          onClick={() => handleLinkClick("/logout")}
        >
          <LogoutIcon />
          <ListItemText primary={t("logout")} />
        </ListItem>
      </List>
    </>
  );
};

export default SideMenuBar;
