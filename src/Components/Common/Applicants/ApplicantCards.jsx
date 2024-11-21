import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addApplicantToFavorites } from "../../../Services/JobsServices/JobServices";
import { toastMessage } from "../../../Utils/toastMessages";
import { successType } from "../../../Constant/Constant";

export default function ApplicantCards({ applicant, setPageLoader }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const saveApplicants = () => {
    if (!applicant.isFavorite) {
      setPageLoader(true);
      addApplicantToFavorites(applicant.userId)
        .then((res) => {
          setPageLoader(false);
          toastMessage(t("added_favorite_success"), successType);
        })
        .catch((err) => {
          setPageLoader(false);
          if (err?.response?.data?.message) {
            toastMessage(err.response.data.message);
          } else {
            toastMessage(t("failure_message"));
          }
          console.log(err, "error!!!");
        });
    }
  };
  return (
    <Grid item lg={4} md={6} xs={12}>
      <Box
        className={`${
          applicant.isFavorite ? "favourite" : ""
        } helpersCol employerapplicant`}
      >
        <Box className="profileUpper">
          <Box className="helperImg">
            <img
              src={
                applicant.profilePicURL
                  ? applicant.profilePicURL
                  : "/demo-user.png"
              }
              alt={`Helpers`}
            />
          </Box>
          <Box className="helperContent">
            <Box className="wishlistIcon" onClick={saveApplicants}>
              <img src="/wishlist-icon.svg" alt="Wishlist" />
            </Box>
            <Typography variant="h5">{applicant.fullName}</Typography>
            <Box className="locationDate">
              <Box className="location">{applicant.location}</Box>
              <Box className="applicant_age">
                {applicant.age && `${applicant.age} ${t("years")}`}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="work_Profile my-2">
          <Typography variant="body1" className="applicantDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            animi asperiores laborum beatae, fugiat repellat magni vitae
            molestiae quasi sint, aliquid officiis itaque consequatur eius atque
            et ducimus neque cupiditate.
          </Typography>
        </Box>
        <Box className="buttonFlex">
          <Button
            className="green-btn small"
            onClick={() =>
              navigate(`/applicant-profile-view/${applicant.userId}`)
            }
          >
            {t("view")}
            {t("profile")}
          </Button>
          <Button
            className="arrowButton small"
            onClick={() => navigate(`/employer/chat/${applicant.userId}`)}
          >
            {t("view")}
            {t("message")}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
