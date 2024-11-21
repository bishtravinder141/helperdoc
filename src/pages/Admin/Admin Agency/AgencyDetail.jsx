import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Pagination,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAgencyProfileById } from "../../../Services/ProfileServices/ProfileService";
import { toastMessage } from "../../../Utils/toastMessages";
import MyPostedJobCard from "../../../Components/Common/JobCard/MyPostedJobCard";
import NoDataFound from "../../../Components/Common/NoDataFound";
import { getJobByUserId } from "../../../Services/JobsServices/JobServices";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
const AGENCY_DETAIL_OPTIONS = [
  //   { label: "agency_code" ,key:"agencyContactDetails",subkey:""},
  { label: "agency_email", key: "agencyContactDetails", subkey: "email" },
  {
    label: "agency_contact",
    key: "agencyContactDetails",
    subkey: "contactNumber",
  },
  {
    label: "agency_location",
    key: "agencySpecification",
    subkey: "agencyLocation",
    extraSubkey: "location",
  },
  {
    label: "pin_code",
    key: "agencySpecification",
    subkey: "agencyPincode",
  },
  {
    label: "establishment_year",
    key: "agencySpecification",
    subkey: "agencyEstablishmentYear",
  },
  //   {
  //     label:"type_of_establishment",
  //     key:"",
  //     subkey:""
  //   },
  {
    label: "website_address",
    key: "agencySpecification",
    subkey: "agencyWebsiteUrl",
  },
  //   {
  //     label:"GST_number",
  //     key:"",
  //     subkey:""
  //   }
];
const PROPERTIER_DETAIL_OPTIONS = [
  {
    label: "propertier_name",
    key: "agencyContactDetails",
    subkey: "contactPerson",
  },
  {
    label: "contact_number",
    key: "agencyContactDetails",
    subkey: "contactNumber",
  },
  {
    label: "propertier_email",
    key: "agencyContactDetails",
    subkey: "email",
  },
];
const AgencyDetail = () => {
  const pageSize = 6;
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [agencyDetail, setAgencyDetail] = useState();
  const [jobDetails, setJobDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPages, setTotalPages] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    getAgencyProfileById(id)
      .then((res) => {
        setAgencyDetail(res?.data);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toastMessage(error.response.data.message);
          navigate("/admin/agency");
        } else {
          toastMessage(t("failure_message"));
        }
      })
      .finally(() => setLoader(false));
  }, []);
  useEffect(() => {
    const query = `?userId=${id}&page=${currentPage.page}&limit=${pageSize}`;
    getJobByUserId(query)
      .then((res) => {
        setJobDetails(res?.data?.jobPostings);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [currentPage]);

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };
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
        {/* <div className="back">
          <IconButton onClick={() => navigate("/admin/employer")}>
            <ArrowBackIcon />
          </IconButton>
          {t("back")}
        </div> */}
        <Grid container spacing={3} alignItems="center" className="d-flex">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 100, height: 100, marginRight: "16px" }}>
                <img
                  id="avatar"
                  src={
                    agencyDetail?.agencyLogoUrl
                      ? agencyDetail?.agencyLogoUrl
                      : "/demo-user.png"
                  }
                  alt="Avatar"
                />
              </Avatar>
              <div style={{ marginLeft: "16px" }}>
                {agencyDetail?.agencySpecification?.agencyName && (
                  <Typography variant="h5" className="text-capitalize">
                    {agencyDetail?.agencySpecification?.agencyName}
                  </Typography>
                )}
                <div
                  className="hightlightProfile"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box className="locationDate align-items-center mb-2">
                    {agencyDetail?.agencySpecification?.agencyCountry && (
                      <Box className="location">
                        {agencyDetail?.agencySpecification?.agencyCountry}
                      </Box>
                    )}
                  </Box>
                </div>
              </div>
            </Box>
          </Grid>{" "}
          <Grid item xs={12} md={6} className="d-flex gap-2">
            <Button className="green-btn small text-center">
              {t("contact_agency")}
            </Button>
          </Grid>
        </Grid>

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
        <Box className="aboutProfile mt-2">
          <Typography variant="h6" className="text-capitalize dark-green">
            {t("agency_details")}
          </Typography>
          <List>
            {agencyDetail &&
              Object.keys(agencyDetail).length &&
              AGENCY_DETAIL_OPTIONS.map(
                ({ key, label, subkey, extraSubkey }) =>
                  (agencyDetail[key][subkey][extraSubkey] ||
                    agencyDetail[key][subkey]) && (
                    <ListItem>
                      <b>{t(label)}</b>
                      <span>
                        {extraSubkey
                          ? agencyDetail[key][subkey][extraSubkey]
                          : agencyDetail[key][subkey]}
                      </span>
                    </ListItem>
                  )
              )}
          </List>
        </Box>
        <Box className="aboutProfile mt-2">
          <Typography variant="h6" className="text-capitalize dark-green">
            {t("proprietor_details")}
          </Typography>
          <List>
            {agencyDetail &&
              Object.keys(agencyDetail).length &&
              PROPERTIER_DETAIL_OPTIONS.map(
                ({ key, label, subkey }) =>
                  agencyDetail[key][subkey] && (
                    <ListItem>
                      <b>{t(label)}</b>
                      <span>{agencyDetail[key][subkey]}</span>
                    </ListItem>
                  )
              )}
          </List>
        </Box>
        {/* <Button
          className="arrowButton"
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/admin/employer/job-detail`, {
              state: { prevRoute: pathname },
            });
          }}
        >
          {t("view_job")}
        </Button> */}
      </Box>
      {/* my posting job card */}
      <Typography variant="h5">{t("my_posting")}</Typography>
      <Grid container spacing={2}>
        {jobDetails.length > 0 ? (
          jobDetails.map((job) => (
            <Fragment key={job._id}>
              <Grid item xs={12} md={4}>
                <MyPostedJobCard jobDetails={job} />
              </Grid>
            </Fragment>
          ))
        ) : (
          <NoDataFound title={t("no_job_active")} />
        )}
      </Grid>
      <div className="d-flex justify-content-center mt-2">
        {totalPages && (
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          />
        )}
      </div>

      {/* my posting job card */}
    </div>
  );
};

export default AgencyDetail;
