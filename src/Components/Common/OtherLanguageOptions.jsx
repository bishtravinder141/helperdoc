import React, { useState } from "react";
// import DelSvg from "../../../public/del.svg";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormLabel,
} from "@mui/material";


const OtherLanguagesOptions = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [newProficiency, setNewProficiency] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleAddLanguage = () => {
    if (newLanguage && newProficiency) {
      const newLanguageEntry = {
        language: newLanguage,
        proficiency: newProficiency,
      };
      setLanguages([...languages, newLanguageEntry]);
      setNewLanguage("");
      setNewProficiency("");
      setShowTable(true);
    }
  };

  const handleDeleteLanguage = (indexToDelete) => {
    const updatedLanguages = languages.filter(
      (_, index) => index !== indexToDelete
    );
    setLanguages(updatedLanguages);
    if (updatedLanguages.length === 0) {
      setShowTable(false);
    }
  };

  return (
    <FormControl fullWidth>
      {/* {showTable && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {languages.map((language, index) => (
                <TableRow key={index}>
                  <TableCell>{language.language}</TableCell>
                  <TableCell>{language.proficiency}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteLanguage(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} */}
      <Box
        sx={{
        }}
      >
        {showTable && (
          <>
            <FormControl sx={{ minWidth: 120, mr: 2 }} className="queRow">
              <FormLabel className="formLabel">Other Spoken Language</FormLabel>
              <Select className="formInputFiled"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
              >
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120, mr: 2 }} className="queRow">
              <FormLabel className="formLabel">Level</FormLabel>
              <Select className="formInputFiled"
                value={newProficiency}
                onChange={(e) => setNewProficiency(e.target.value)}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddLanguage} className="delBtn">
              {/* <img src={DelSvg}/> */}
              Delete
            </Button>
          </>
        )}
        {!showTable && (
          <FormControl>
            <FormLabel className="formLabel" id="religion">Other Spoken Languages</FormLabel>
            <Button variant="contained" className="languageBtn" onClick={() => setShowTable(true)}>
              Add Language
            </Button>
          </FormControl>
        )}
      </Box>
    </FormControl>
  );
};

export default OtherLanguagesOptions;
