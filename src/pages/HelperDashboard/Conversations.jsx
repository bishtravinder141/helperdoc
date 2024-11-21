import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Pagination,
} from "@mui/material";
import ChatDetails from "../../Components/Common/Chat/chatdetails";
import { useLocation } from "react-router-dom";
import { getAllMessages } from "../../Services/JobsServices/JobServices";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import NoDataFound from "../../Components/Common/NoDataFound";
import { COMMON_PAGE_LIMIT } from "../../Constant/Constant";
import Chat from "../../Components/Common/Chat/chat";

const Conversations = () => {
  const [filter, setFilter] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPages, setTotalPages] = useState(0);
  const [messages, setMessages] = useState([]);
  const { t } = useTranslation();
  const userID = localStorage.getItem("userId");
  // useEffect(() => {
  //   //commented for future use
  //   // const param = `?page=${currentPage.page}&limit=${ItemsPerPage}&fiter=${filter}`;
  //   const param = `?page=${currentPage.page}&limit=${COMMON_PAGE_LIMIT}`;
  //   setLoader(true);
  //   getAllMessages(userID, param)
  //     .then((res) => {
  //       setMessages(res?.data?.allMessages);
  //       setTotalPages(res?.data?.totalPages);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoader(false));
  // }, [filter, currentPage]);

  // const handleClick = (message) => {
  //   setSelectedMessage(message);
  // };

  const handleBack = () => {
    setSelectedMessage(null);
  };
  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };
  return (
    <>
      {loader && <PageLoader />}
      <Box maxWidth="xl" sx={{ padding: "20px" }}>
        {pathname === "/helper/chat" && (
          <HelperDashboardSubHeader
            title={t("chat")}
            description={t("Lorem Ipsum has been the industry's standard.")}
            progessBar={false}
            isChat={true}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        <Chat />
        {/* {selectedMessage ? (
          <ChatDetails message={selectedMessage} onBack={handleBack} />
        ) : (
          <>
            <Grid>
              {messages?.length ? (
                messages.map((message) => (
                  <Box
                    key={message.id}
                    // onClick={() => handleClick(message)}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid className="chatMemberList">
                      <Grid item md={4} className="senderInfo">
                        <Avatar
                          alt={message.sender}
                          src={message.avatar}
                          className="avatar"
                        />
                        <Typography
                          variant="h5"
                          gutterBottom
                          style={{ marginRight: "8px" }}
                        >
                          {message.sender}
                        </Typography>
                      </Grid>
                      <Grid item md={2}>
                        <Typography className="applicationDot">
                          <span></span>Application
                        </Typography>
                      </Grid>
                      <Grid item md={5} className="message">
                        <span>Domestic helpers</span>
                        <Typography
                          variant="body1"
                          gutterBottom
                          style={{ marginRight: "8px" }}
                        >
                          {message.message}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="timings"
                        >
                          {message.created_at}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              ) : (
                <NoDataFound title={t("no_message_found")} />
              )}
            </Grid>
          </>
        )} */}
      </Box>
      {/* <div className="d-flex justify-content-center">
        {totalPages > 0 && (
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          />
        )}
      </div> */}
    </>
  );
};

export default Conversations;
