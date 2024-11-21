import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "@mui/material/Avatar";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../../Config/APIConfig";
import socketIo from "socket.io-client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  addApplicantToFavorites,
  getMessageById,
} from "../../../Services/JobsServices/JobServices";
import HelperDashboardSubHeader from "../Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { calculateTimeAgo } from "../../../Utils/timeAgo";
import { getHelperPublicProfile } from "../../../Services/ProfileServices/ProfileService";
import { toastMessage } from "../../../Utils/toastMessages";
import { successType } from "../../../Constant/Constant";

const ChatDetails = ({ message, onBack }) => {
  const [pageLoader, setPageLoader] = useState(true);
  const [contactNumber, setContactNumber] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [showContactNumber, setShowContactNumber] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [senderDetails, setSenderDetails] = useState({});
  const socket = socketIo(BASE_URL, { transports: ["websocket"] });
  const { receiverId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();

  useEffect(() => {
    const param = `${receiverId}/${userId}?page=1&limit=200`;
    getMessageById(param)
      .then((res) => {
        setPageLoader(false);
        setMessages(res.data.messages);
        setSenderDetails(res.data.messages[0]?.senderProfile);
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err, "error!!!!!!");
      });
    handleGetPhoneNumber();
  }, [receiverId, userId]);

  useEffect(() => {
    // const socket = io(BASE_URL);
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server", socket);
    });
    socket.on("newMessage", (data) => {
      const timeStamp = calculateTimeAgo(new Date());
      setMessages([...messages, { message: data, createdAt: timeStamp }]);
      console.log("messages messages", data);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket, messages]);
  const handleGetPhoneNumber = () => {
    getHelperPublicProfile(receiverId)
      .then((res) => {
        setContactNumber(res?.data?.phoneNumber);
        console.log(res?.data?.isFavourite);
        setIsFavourite(res?.data?.isFavorite);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
      });
  };
  const handleSendMessage = () => {
    if (msg.length > 0) {
      socket.emit(
        "sendMessage",
        JSON.stringify({
          senderId: userId,
          receiverId: receiverId,
          message: msg,
        })
      );
      const timeStamp = new Date();
      setMessages([
        ...messages,
        { message: msg, createdAt: timeStamp, senderId: userId },
      ]);
      setMsg("");
    }
  };

  const handleViewProfile = () => {
    if (pathname.includes("/employer/")) {
      navigate(`/applicant-profile-view/${receiverId}`);
    } else {
      navigate(`/helper/profile-preview`);
    }
  };

  const saveApplicants = () => {
    setPageLoader(true);
    addApplicantToFavorites(receiverId)
      .then((res) => {
        setPageLoader(false);
        setIsFavourite(true);
        toastMessage(t("added_favorite_success"), successType);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        setPageLoader(false);
        console.log(err, "error!!!");
      });
  };

  return (
    <>
      {pageLoader && <pageLoader />}
      <HelperDashboardSubHeader
        title={t("chat")}
        description={t("Lorem Ipsum has been the industry's standard.")}
        progessBar={false}
      />
      {/* <IconButton onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      Back */}
      <Grid container spacing={3} className="customGridW">
        <Grid item md={3} sm={12} className="p-0">
          <Box
            className="ChatSidebar justify-content-between d-flex flex-column"
            p={2}
          >
            <Box textAlign="center" className="chatProfileInfo">
              <Avatar
                alt="User Avatar"
                src={
                  senderDetails?.profileImageUrl
                    ? senderDetails.profileImageUrl
                    : "/demo-user.png"
                }
                sx={{ width: 120, height: 120 }}
              />
              <Box>
                <Typography variant="h4" textAlign="center">
                  {senderDetails?.fullName}
                </Typography>
                <Typography className="applicationDot">
                  <span></span>Application
                </Typography>
              </Box>
            </Box>
            <Box mt={2} className="bottomDetails">
              {/* <LoadScript googleMapsApiKey="">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                />
              </LoadScript> */}
              <Box mt={2} className="text-center">
                <Button
                  className="green-btn"
                  variant="contained"
                  onClick={() => handleViewProfile()}
                >
                  {t("view")} {t("profile")}
                </Button>
                <Button
                  className="green-btn"
                  variant="contained"
                  onClick={() => setShowContactNumber(!showContactNumber)}
                >
                  {showContactNumber ? (
                    <>
                      {contactNumber}
                      <IconButton
                        sx={{ visibility: "visible" }}
                        onClick={() => setShowContactNumber(false)}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </>
                  ) : (
                    t("view_contact_number")
                  )}
                </Button>
                <Button
                  // className="green-btn favourite"
                  className={`green-btn ${isFavourite && "favourite"}`}
                  variant="contained"
                  onClick={() => saveApplicants()}
                  disabled={isFavourite}
                >
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5135 2.19568L16.5136 2.19585C16.893 2.57505 17.1939 3.02527 17.3993 3.52081C17.6046 4.01635 17.7103 4.54749 17.7103 5.08388C17.7103 5.62027 17.6046 6.15141 17.3993 6.64694C17.1939 7.14248 16.893 7.59271 16.5136 7.97191L16.5135 7.97199L15.6302 8.85532L9.50042 14.9851L3.37064 8.85532L2.48731 7.97199C1.72134 7.20602 1.29102 6.16713 1.29102 5.08388C1.29102 4.00063 1.72134 2.96174 2.48731 2.19576C3.25329 1.42979 4.29217 0.999469 5.37542 0.999469C6.45868 0.999469 7.49756 1.42979 8.26354 2.19576L9.14687 3.0791C9.34213 3.27436 9.65871 3.27436 9.85398 3.0791L10.7373 2.19577L10.7374 2.19568C11.1166 1.81631 11.5668 1.51536 12.0624 1.31003C12.5579 1.10471 13.089 0.999023 13.6254 0.999023C14.1618 0.999023 14.6929 1.10471 15.1885 1.31003C15.684 1.51536 16.1343 1.81631 16.5135 2.19568Z"
                      fill="#55DBA6"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  {isFavourite
                    ? t("already_added_to_favourite")
                    : t("add_to_favourites")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={9} className="p-0 ps-2">
          <Box border={1} borderRadius={3} p={2} className="chatBox">
            <Box className="jobsFlex chatDisplay">
              <img src="/building.svg" alt="Logo" className="work" />
              <Box className="JobTitle">
                <Typography variant="h6">
                  Full time helper for a new family
                </Typography>
                <Typography variant="body1">
                  I want to apply for this job
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box mt={2}>
              {/* Message Display Area */}
              <Box
                sx={{
                  maxHeight: "800px", // Adjust the maximum height as needed
                  overflowY: "auto", // Enable vertical scrollbar if messages overflow
                  marginBottom: 2, // Add margin bottom to separate input from message display area
                }}
              >
                {/* Messages will be displayed here */}
              </Box>

              {/* Chatting messages */}
              <Box className="MessageChat">
                {messages?.map((message, index) => (
                  <Fragment key={index}>
                    {message.senderId !== userId ? (
                      <Box className="chatMsgs">
                        <Box className="primaryChat">
                          <Avatar
                            alt={message.sender}
                            src={message.avatar}
                            className="avatar"
                          />
                          <Box className="messageView">
                            <Box className="Box">{message.message}</Box>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="timings"
                            >
                              {calculateTimeAgo(message.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box className="chatMsgs">
                        <Box className="SecondaryChat">
                          <Box className="messageView">
                            <Box className="Box">{message.message}</Box>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="timings"
                            >
                              {calculateTimeAgo(message.createdAt)}
                            </Typography>
                          </Box>
                          <Avatar
                            alt={message.sender}
                            src={message.avatar}
                            className="avatar"
                          />
                        </Box>
                      </Box>
                    )}{" "}
                  </Fragment>
                ))}
              </Box>
              {/* Input Field with Icons */}
              <TextField
                className="chatInput"
                fullWidth
                variant="outlined"
                placeholder="Type your message here"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <IconButton className="attach" aria-label="attach file">
                        <AttachFileIcon />
                      </IconButton> */}
                      <IconButton
                        className="sendicon"
                        aria-label="send message"
                        onClick={handleSendMessage}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatDetails;
