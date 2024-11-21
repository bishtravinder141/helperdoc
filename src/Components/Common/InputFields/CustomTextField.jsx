import { TextField } from "@mui/material";
import { styled } from "@mui/system";

// Define a custom styled TextField component with custom styles
const CustomTextField = styled(TextField)(({ theme }) => ({
  // Add your custom CSS classes here
  "& .MuiInputLabel-root": {
    // Customize label styles here
    color: "#000", // Example custom label color
  },
  "& .MuiOutlinedInput-root": {
    // Customize input field styles here
    //backgroundColor: "#f0f0f0", // Example custom background color
    //borderRadius: "8px", // Example custom border radius
  },
  "& .MuiOutlinedInput-input": {
    // Customize input field text styles here
    color: "#333", // Example custom text color
  },
  "& .MuiFormLabel-asterisk": {
    // Customize asterisk (required indicator) styles here
    color: "red", // Example custom color for the asterisk
  },
  "& .MuiOutlinedInput-notchedOutline": {
    // Remove default styles applied to the notched outline
    display: "none",
  },
}));

export default CustomTextField;
