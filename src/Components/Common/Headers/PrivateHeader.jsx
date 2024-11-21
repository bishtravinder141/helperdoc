import { useTheme } from "@emotion/react";
import { Box, styled } from "@mui/system";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Link as MuiLink,
  Drawer,
} from "@mui/material";
import { adminWhatsappNumber } from "../../../Config/authConfig";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import socketIo from "socket.io-client";
import { BASE_URL } from "../../../Config/APIConfig";
import { useLocation } from "react-router-dom";
import NotificationBellIcon from "../../../Assets/SVGIcons/NotificationBellIcon";
import { WHATSAPP_TEXT } from "../../../Constant/Constant";
import LanguageDropdown from "../Language Dropdown/LanguageDropdown";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#FFFFFF",
  // Add more styles as needed
});

const PrivateHeader = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  //   const isMobileOrTablet = useMediaQuery(theme?.breakpoints?.down("md"));
  const user = localStorage.getItem("userId");
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth <= 768
  );
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const socket = socketIo(BASE_URL, { transports: ["websocket"] });

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    // const socket = io(BASE_URL);
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server", socket);
    });
    socket.on("newNotification", (notification) => {
      setNotification(notification);
      console.log("notification tnotification", notification);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleWindowSizeChange = () => {
    setIsMobileOrTablet(window.innerWidth <= 768);
  };

  const onLogout = () => {
    localStorage.clear();
    // persistStore(reduxStore).purge();
    // toastMessage(t("logout_successfully"), successType);
    navigate("/login");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  // const handleRedirect = () => {
  //   const selectedRole = localStorage.getItem("selectedRole");
  //   switch(selectedRole){
  //     case "helper" : navigate("/helper/chat") ;
  //   }
  // }
  return (
    <div className="mainHeader">
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="menu-title">
            <Link to="/">
              <img src="/logo.svg" alt="Logo" className="logo" />
            </Link>
          </Typography>
          {isMobileOrTablet && (
            <div className="pageMenuIcon">
              <Link to="/">
                <img src="/whatsapp.svg" alt="Logo" className="whatsApp" />
              </Link>
              <IconButton
                className="menuIcon"
                edge="start"
                aria-label="menu"
                onClick={() => {
                  document.body.classList.toggle("toggled");
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}
          {!isMobileOrTablet && (
            <Toolbar>
              <div className="menubarLink">
                <MuiLink
                  color="inherit"
                  component={Link}
                  to={`${
                    pathname.includes("/helper/")
                      ? "/helper/notification"
                      : "/employer/notification"
                  }`}
                >
                  <NotificationBellIcon />
                  {/* <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9714 10.9242C11.0894 10.1416 10.5837 8.99775 10.5837 7.78589V6.07863C10.5837 3.92373 9.05883 2.13992 7.08366 1.84109V1.17974C7.08366 0.841108 6.82233 0.567383 6.50033 0.567383C6.17833 0.567383 5.91699 0.841108 5.91699 1.17974V1.84109C3.94124 2.13992 2.41699 3.92373 2.41699 6.07863V7.78589C2.41699 8.99775 1.91124 10.1416 1.02399 10.9291C0.797076 11.133 0.666992 11.4294 0.666992 11.743C0.666992 12.3339 1.12491 12.8146 1.68783 12.8146H11.3128C11.8757 12.8146 12.3337 12.3339 12.3337 11.743C12.3337 11.4294 12.2036 11.133 11.9714 10.9242Z"
                      fill="#646464"
                    />
                  </svg> */}
                </MuiLink>
                {/* <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div> */}
                <MuiLink
                  color="inherit"
                  component={Link}
                  to="/helper/my-profile"
                >
                  {t("my_account")}
                </MuiLink>
              </div>
              <a
                className="cursor-pointer"
                href={`https://wa.me/${adminWhatsappNumber}`}
                // href={`https://wa.me/${adminWhatsappNumber}?text=${WHATSAPP_TEXT}`}
                target="_blank"
              >
                <img src="/whatsapp.svg" alt="Logo" className="whatsApp" />
              </a>
              
              <Box className=" ml-2 languageDropdown">
                <LanguageDropdown />
              </Box>
            
              {/* <div>
                  <IconButton onClick={handleLanguageMenuOpen}>
                  <Typography variant="body1">
                  {i18n.language === "en" ? "English" : "中文"}
                  </Typography>
                  </IconButton>
                  <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleLanguageMenuClose}
                  >
                  <MenuItem onClick={() => changeLanguage("en")}>
                  English
                  </MenuItem>
                  <MenuItem onClick={() => changeLanguage("zh")}>
                  中文
                  </MenuItem>
                  </Menu>
                </div> */}
            </Toolbar>
          )}
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default PrivateHeader;
