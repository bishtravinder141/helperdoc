import { FormGroup ,Radio} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import React from "react";

const FilterRadio = ({
  value,
  name,
  handleChangeFilter,
  checked,
  title,
  id,
  field,
}) => {
  return (
    <div className="col-6">
      <FormGroup className="radioCheckBtn">
        <Radio
          checked={checked}
          checkedIcon={<CheckCircleRoundedIcon />}
          onClick={(e)=>(handleChangeFilter(e,field,"radio"))}
          value={value}
          name="radio-buttons"
        />
        <span>{title}</span>
      </FormGroup>
    </div>
  );
};

export default FilterRadio;
