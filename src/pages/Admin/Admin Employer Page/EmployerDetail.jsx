import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppSvgIcon from "../../../Assets/SVGIcons/WhatsAppSvgIcon";
import { getUserProfile } from "../../../Services/ProfileServices/ProfileService";
import NoDataFound from "../../../Components/Common/NoDataFound";
import moment from "moment";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../../Utils/toastMessages";
import SendMessageSection from "../../../Components/Common/SendMessageSection";
const ADMIN_EMPLOYERDETAIL_OPTIONS = [
  {
    label: "email",
    key: "email",
  },
  {
    label: "phone_number",
    key: "phoneNumber",
  },
  {
    label: "age",
    key: "age",
  },
  {
    label: "dob",
    key: "dateOfBirth",
  },
  {
    label: "region_country_state",
    key: "region",
  },
  {
    label: "subscription_plans",
    key: "",
  },
  // commented for future
  // {
  //   label :"plan_purchased_on",
  //   key:""
  // },
  // {
  //   label :"plan_renewal_date",
  //   key:""
  // },
];
const EmployerDetail = () => {
  const [employerDetail, setEmployerDetail] = useState();
  const [loader, setLoader] = useState(true);
  const pathname = useLocation();
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    getUserProfile(id)
      .then((res) => {
        setEmployerDetail(res?.data);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toastMessage(error.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        console.log(error);
      })
      .finally(() => setLoader(false));
  }, []);
  return (
    <div>
      {loader && <PageLoader />}
      <Box
        className="profileCardBox"
        border={1}
        borderRadius={8}
        borderColor="#e7e7e7"
        py={6}
        px={10}
        mb={2}
        mt={2}
      >
        <div className="back">
          <IconButton onClick={() => navigate("/admin/employer")}>
            <ArrowBackIcon />
          </IconButton>
          {t("back")}
        </div>
        <Grid container spacing={3} alignItems="center" className="d-flex">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              {/* <Avatar sx={{ width: 100, height: 100, marginRight: "16px" }}>
                <img id="avatar" src="/demo-user.png" alt="Avatar" />
              </Avatar> */}
              <div style={{ marginLeft: "16px" }}>
                <Typography variant="h5" className="text-capitalize">
                  {employerDetail?.fullName && employerDetail?.fullName}
                </Typography>
                <div
                  className="hightlightProfile"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box className="locationDate align-items-center mb-2">
                    <Box className="location">
                      {employerDetail?.region && employerDetail?.region}
                    </Box>
                    <Box className="date">
                      {employerDetail?.age && employerDetail?.age}
                    </Box>
                    {/* <Box className = "nationality">India</Box> */}
                  </Box>
                </div>
              </div>
            </Box>
          </Grid>{" "}
          <SendMessageSection />
        </Grid>

        <Box className="aboutProfile mt-2">
          <Typography variant="h6" className="text-capitalize dark-green">
            {t("employer_detail")}
          </Typography>
          <List>
            {employerDetail && Object.keys(employerDetail)?.length ? (
              ADMIN_EMPLOYERDETAIL_OPTIONS.map(
                ({ label, key }, index) =>
                  employerDetail[key] && (
                    <ListItem key={index}>
                      <b>{t(label)}</b>
                      {key === "dateOfBirth" ? (
                        <span>
                          {moment(employerDetail[key]).format("MMM DD,yyyy")}
                        </span>
                      ) : (
                        <span>{employerDetail[key]}</span>
                      )}
                    </ListItem>
                  )
              )
            ) : (
              <NoDataFound />
            )}
          </List>
        </Box>
        <Box className="aboutProfile mt-2">
          <Typography variant="h5" className="modalHeading">
            {t("Description")}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed beatae
            rem perspiciatis consequatur, reiciendis quod laudantium fuga
            voluptatem quos autem aspernatur, doloremque nostrum ratione
            accusantium molestias quae debitis quibusdam. Fuga?
          </Typography>
        </Box>
        <Button
          className="arrowButton"
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/admin/employer-job-detail/${id}`, {
              state: { prevRoute: pathname },
            });
          }}
        >
          {t("view_job")}
        </Button>
      </Box>
    </div>
  );
};

export default EmployerDetail;
