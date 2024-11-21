import React, { useEffect, useState } from "react";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { getFaqs } from "../../Services/JobsServices/JobServices";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoDataFound from "../../Components/Common/NoDataFound";
import { useTranslation } from "react-i18next";
import FaqCard from "./FaqCard";

const Faq = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loader, setLoader] = useState(true);
  const [faqList, setfaqList] = useState([]);
  useEffect(() => {
    handleGetFaq();
  }, []);
  const handleGetFaq = () => {
    getFaqs()
      .then((res) => {
        console.log(res?.data,"data");
        setfaqList(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleBack = () => {
    if (state?.prevRoute) {
      navigate(state?.prevRoute);
    }
  };
  const SAMPLE_FAQ = [
    {
      question :"Fusce pretium lorem ac eros placerat iaculis. Mauris non nunc nec dui?",
      answer :"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at scelerisque. Maecenas sit amet ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut placerat sed lectus non ultricies. Vivamus dapibus lacus sem, non venenatis ipsum tincidunt eu. Ut semper nisl eros, eu pulvinar magna tincidunt non. Mauris id elit sagittis, aliquet velit sit amet, viverra nulla. Aenean convallis nibh luctus ex mattis sodales. Mauris at sapien in arcu elementum finibus. Curabitur malesuada felis at urna euismod fermentum. Aliquam id ullamcorper orci, sit amet cursus purus. Vestibulum volutpat nisi ut tellus interdum, eget pharetra purus vulputate. Suspendisse convallis semper lacus ac mollis."

    },
    {
      question :"Fusce pretium lorem ac eros placerat iaculis. Mauris non nunc nec dui?",
      answer :"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at scelerisque. Maecenas sit amet ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut placerat sed lectus non ultricies. Vivamus dapibus lacus sem, non venenatis ipsum tincidunt eu. Ut semper nisl eros, eu pulvinar magna tincidunt non. Mauris id elit sagittis, aliquet velit sit amet, viverra nulla. Aenean convallis nibh luctus ex mattis sodales. Mauris at sapien in arcu elementum finibus. Curabitur malesuada felis at urna euismod fermentum. Aliquam id ullamcorper orci, sit amet cursus purus. Vestibulum volutpat nisi ut tellus interdum, eget pharetra purus vulputate. Suspendisse convallis semper lacus ac mollis."

    },
    {
      question :"Fusce pretium lorem ac eros placerat iaculis. Mauris non nunc nec dui?",
      answer :"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at scelerisque. Maecenas sit amet ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut placerat sed lectus non ultricies. Vivamus dapibus lacus sem, non venenatis ipsum tincidunt eu. Ut semper nisl eros, eu pulvinar magna tincidunt non. Mauris id elit sagittis, aliquet velit sit amet, viverra nulla. Aenean convallis nibh luctus ex mattis sodales. Mauris at sapien in arcu elementum finibus. Curabitur malesuada felis at urna euismod fermentum. Aliquam id ullamcorper orci, sit amet cursus purus. Vestibulum volutpat nisi ut tellus interdum, eget pharetra purus vulputate. Suspendisse convallis semper lacus ac mollis."

    },
    {
      question :"Fusce pretium lorem ac eros placerat iaculis. Mauris non nunc nec dui?",
      answer :"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at scelerisque. Maecenas sit amet ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut placerat sed lectus non ultricies. Vivamus dapibus lacus sem, non venenatis ipsum tincidunt eu. Ut semper nisl eros, eu pulvinar magna tincidunt non. Mauris id elit sagittis, aliquet velit sit amet, viverra nulla. Aenean convallis nibh luctus ex mattis sodales. Mauris at sapien in arcu elementum finibus. Curabitur malesuada felis at urna euismod fermentum. Aliquam id ullamcorper orci, sit amet cursus purus. Vestibulum volutpat nisi ut tellus interdum, eget pharetra purus vulputate. Suspendisse convallis semper lacus ac mollis."

    },
    {
      question :"Fusce pretium lorem ac eros placerat iaculis. Mauris non nunc nec dui?",
      answer :"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at scelerisque. Maecenas sit amet ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut placerat sed lectus non ultricies. Vivamus dapibus lacus sem, non venenatis ipsum tincidunt eu. Ut semper nisl eros, eu pulvinar magna tincidunt non. Mauris id elit sagittis, aliquet velit sit amet, viverra nulla. Aenean convallis nibh luctus ex mattis sodales. Mauris at sapien in arcu elementum finibus. Curabitur malesuada felis at urna euismod fermentum. Aliquam id ullamcorper orci, sit amet cursus purus. Vestibulum volutpat nisi ut tellus interdum, eget pharetra purus vulputate. Suspendisse convallis semper lacus ac mollis."

    }
  ]
    return (
    <>
      {loader && <PageLoader />}
      <section className="faqListing">
        <div className="container">
          <div className="d-flex gap-2 align-items-center">
            <div className="backButton d-flex gap-2 align-items-center">
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="d-flex align-items-center justify-content-center flex-column">
            {faqList?.length ? (
              faqList.map((curFaq, index) => (
                <FaqCard key={index} curFaq={curFaq} />
              ))
            ) : (
              <NoDataFound title={t("no_faq_msg")} />
            )}
            {/* {
              SAMPLE_FAQ.map((curFaq)=>(
                <FaqCard curFaq={curFaq}/>
              ))
            } */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
