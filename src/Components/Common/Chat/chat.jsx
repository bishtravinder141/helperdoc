import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Avatar, Pagination } from "@mui/material";
import { getAllMessages } from "../../../Services/JobsServices/JobServices";
import { COMMON_PAGE_LIMIT } from "../../../Constant/Constant";
import PageLoader from "../Loader/PageLoader";
import NoDataFound from "../NoDataFound";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { calculateTimeAgo } from "../../../Utils/timeAgo";

const Chat = () => {
  const [filter, setFilter] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPages, setTotalPages] = useState(0);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const param = `?page=${currentPage.page}&limit=${COMMON_PAGE_LIMIT}`;
    setPageLoader(true);
    getAllMessages(param)
      .then((res) => {
        setMessages(res?.data?.allMessages);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setPageLoader(false));
  }, [filter, currentPage]);

  // const filteredMessages = messages.filter((message) =>
  //   message.message?.toLowerCase()?.includes(filter.toLowerCase())
  // );

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };
  const handleClick = (message) => {
    if (pathname.includes("/employer/")) {
      navigate(`/employer/chat/${message.receiverId}`);
    } else {
      navigate(`/helper/chat/${message.receiverId}`);
    }
  };

  return (
    <>
      {pageLoader && <PageLoader />}
      <Box maxWidth="xl" sx={{ padding: "20px" }}>
        <Grid>
          {messages?.length ? (
            messages.map((message) => (
              <Box
                key={message?.messages[0]?._id}
                onClick={() => handleClick(message?.messages[0])}
                style={{ cursor: "pointer" }}
              >
                <Grid
                  className={`${
                    message?.messages[0]?.isRead ? "unread" : ""
                  } chatMemberList`}
                >
                  <Grid item md={4} className="senderInfo">
                    <Avatar
                      alt={"sender_profile"}
                      src={message?.senderProfile?.profileImageUrl}
                      className="avatar"
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "8px" }}
                    >
                      {message?.senderProfile?.fullName}
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
                      {message?.messages[0]?.message}
                    </Typography>
                  </Grid>
                  <Grid item md={1}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="timings"
                    >
                      {calculateTimeAgo(message?.messages[0]?.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <NoDataFound title={t("no_message_found")} />
          )}
        </Grid>
      </Box>
      <div className="d-flex justify-content-center">
        {totalPages > 0 && (
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
