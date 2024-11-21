import { useTheme } from "@emotion/react";
import { styled } from "@mui/system";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Link as MuiLink,
  Drawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#FFFFFF",
  // Add more styles as needed
});

const Header = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  //   const isMobileOrTablet = useMediaQuery(theme?.breakpoints?.down("md"));
  const user = localStorage.getItem("userId");
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const handleWindowSizeChange = () => {
    setIsMobileOrTablet(window.innerWidth <= 768);
  };

  const onLogout = () => {
    localStorage.clear();
    // persistStore(reduxStore).purge();
    // toastMessage(t("logout_successfully"), successType);
    navigate("/login");
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   handleLanguageMenuClose();
  // };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div className="mainHeader">
      <StyledAppBar position="static">
        <div className="pageContainer">
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
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            )}
            {!isMobileOrTablet && (
              <Toolbar>
                <div className="menubarLink">
                  <MuiLink color="inherit" component={Link} to="/feature-jobs">
                    {t("jobs")}
                  </MuiLink>
                  <MuiLink
                    color="inherit"
                    component={Link}
                    to="/applicants"
                  >
                    {t("applicants")}
                  </MuiLink>
                  <MuiLink color="inherit" component={Link} to="/our-service">
                    {t("services")}
                  </MuiLink>
                  <MuiLink color="inherit" component={Link} to="/news-feed">
                    {t("news")}
                  </MuiLink>

                  {!user && (
                    <>
                      <MuiLink
                        color="inherit"
                        component={Link}
                        to="/login"
                        className="loginButton"
                      >
                        {t("login")}
                      </MuiLink>
                      <MuiLink
                        color="inherit"
                        component={Link}
                        to="/register"
                        className="signUpButton"
                      >
                        {t("signup")}
                      </MuiLink>
                    </>
                  )}

                  {user && (
                    <>
                      <MuiLink
                        color="inherit"
                        onClick={onLogout}
                        className="logoutButton"
                      >
                        {t("logout")}
                      </MuiLink>
                    </>
                  )}
                </div>
                <MuiLink color="inherit" component={Link} to="/">
                  <img src="/whatsapp.svg" alt="Logo" className="whatsApp" />
                </MuiLink>
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
        </div>
      </StyledAppBar>

      {isMobileOrTablet && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <div>
            <div className="menubarLink">
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
              <MuiLink color="inherit" component={Link} to="/jobs">
                {t("jobs")}
              </MuiLink>
              <MuiLink color="inherit" component={Link} to="/employers">
                {t("employers")}
              </MuiLink>
              <MuiLink color="inherit" component={Link} to="/services">
                {t("services")}
              </MuiLink>
              <MuiLink color="inherit" component={Link} to="/news">
                {t("news")}
              </MuiLink>

              {!user && (
                <>
                  <MuiLink
                    color="inherit"
                    component={Link}
                    to="/login"
                    className="loginButton"
                  >
                    {t("login")}
                  </MuiLink>
                  <MuiLink
                    color="inherit"
                    component={Link}
                    to="/registration_page"
                    className="signUpButton"
                  >
                    {t("signup")}
                  </MuiLink>
                </>
              )}

              {user && (
                <>
                  <MuiLink
                    color="inherit"
                    onClick={onLogout}
                    className="logoutButton"
                  >
                    {t("logout")}
                  </MuiLink>
                </>
              )}
            </div>
            <MuiLink color="inherit" component={Link} to="/">
              <img src="/whatsapp.svg" alt="Logo" className="whatsApp" />
            </MuiLink>
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
                <MenuItem onClick={() => changeLanguage("zh")}>中文</MenuItem>
              </Menu>
            </div> */}
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Header;
