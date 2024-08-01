import React, { useState, useEffect } from "react";
import "./languageSelector.css";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { LANGUAGE_VERSIONS } from "./constants";

const LanguageSelector = ({ language, onSelect }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const [selectedOption, setSelectedOption] = useState(language);

  useEffect(() => {
    setSelectedOption(language);
  }, [language]);

  const handleChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedOption(newLanguage);
    onSelect(newLanguage);
  };

  return (
    <FormControl variant="outlined" className="languageBox">
      <InputLabel>Language</InputLabel>
      <Select
        labelId="selectLanguage"
        id="language"
        value={selectedOption}
        onChange={handleChange}
        label="Language"
      >
        {languages.map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {key} <h3>({value})</h3>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
