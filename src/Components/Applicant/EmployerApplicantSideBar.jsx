import { Grid, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InfiniteScroll from "react-infinite-scroll-component";
import NoDataFound from "../Common/NoDataFound";
import { useTranslation } from "react-i18next";

export default function EmployerApplicantSideBar({
  applicants,
  totalPage,
  currentPage,
  setCurrentPage,
  setSelectedApplicant,
  selectedApplicant,
}) {
  const { t } = useTranslation();
  const fetchMoreData = () => {
    setCurrentPage({ page: currentPage.page + 1 }); 
  };

  return (
    <Grid md={3} className="applicantSidebar">
      <div id="scrollableDiv" style={{ height: 200, overflow: "auto" }}>
        <InfiniteScroll
          dataLength={applicants.length}
          next={fetchMoreData}
          hasMore={totalPage !== currentPage.page}
          loader={<h1>Loader....</h1>}
          scrollableTarget="scrollableDiv"
        >
          {applicants &&
            applicants.map((item, index) => (
              <ListItem
                className={`${
                  selectedApplicant?.userId === item.userId ? "selected" : ""
                } active`}
                key={index}
              >
                <Box className="profileUpper newApplicants">
                  <Box className="applicantTop">
                    <Box className="helperImg">
                      {}
                      <img
                        src={
                          item.profilePicURL
                            ? item.profilePicURL
                            : "/demo-user.png"
                        }
                        alt="userimg"
                      />
                    </Box>
                    <Box
                      className="helperContent"
                      onClick={() => setSelectedApplicant(item)}
                    >
                      <Typography variant="h5">{item.fullName}</Typography>
                      <Box className="locationDate">
                        <Box className="location">{item.location}</Box>
                        <Box className="date">29/01/24</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    className="arrowRight"
                    onClick={() => setSelectedApplicant(item)}
                  >
                    <img src="/arrowRight.svg" />
                  </Box>
                </Box>
              </ListItem>
            ))}
        </InfiniteScroll>
      </div>
      <Box mt={3} className="helpder_details_dmc">
        <Typography variant="h4">
          <img src="/domesticlocation.svg" /> {t("domestic_helper_near_me")}
        </Typography>
        <List>
          <NoDataFound title={t("no_data_found")} />
        </List>
      </Box>
    </Grid>
  );
}
