import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedValue, theme) {
  return {
    fontWeight:
      selectedValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelecteWithController({
  selectOptionList,
  label,
  isRequired,
  name,
  control,
  setValue,
  options,
  errors
}) {
  const theme = useTheme();
  const { t } = useTranslation();

  const deleteSelected = (value) => {
    setValue(
      name,
      selectOptionList.filter((sel) => sel !== value)
    );
  };

  return (
    <FormControl fullWidth className="queRow">
      <FormLabel id="currency" className="formLabel">
        {label && (
          <FormLabel className="formLabel">
            {label}
            {isRequired && "*"}
          </FormLabel>
        )}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{
          required: isRequired ? t("answer_required_msg") : isRequired,
        }}
        render={({ field }) => (
          <Select
            {...field}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            className="formInputFiled"
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    deleteIcon={
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={() => deleteSelected(value)}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {options.map((opt) => (
              <MenuItem
                key={opt.name}
                value={opt.name}
                style={getStyles(opt.name, selectOptionList, theme)}
              >
                {opt.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
    </FormControl>
  );
}
