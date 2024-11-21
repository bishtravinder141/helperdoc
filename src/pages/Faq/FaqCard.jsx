import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqCard = ({ curFaq }) => {
  const { question, answer, _id } = curFaq;
  return (
    <div className="faqAccord">
      <Accordion className="accordionlist">
        <AccordionSummary
          className="accordHead"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          // dangerouslySetInnerHTML={{
          //   __html: question,
          // }}
        >
            <Typography
            dangerouslySetInnerHTML={{
              __html: question,
            }}
          ></Typography>
          {/* {question} */}
        </AccordionSummary>
        <AccordionDetails className="accordAns">
          <Typography
            dangerouslySetInnerHTML={{
              __html: answer,
            }}
          ></Typography>
          {/* {answer} */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FaqCard;
