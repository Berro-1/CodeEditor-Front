import React, { useState, useEffect } from "react";
import "./languageSelector.css";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { LANGUAGE_VERSIONS } from "./constants";

const LanguageSelector = ({ language, onSelect }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);

  const [selectedOption, setSelectedOption] = useState(language); // Initialize with the passed language prop

  useEffect(() => {
    setSelectedOption(language); // Update state when the language prop changes
  }, [language]);

  const handleChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedOption(newLanguage);
    onSelect(newLanguage); // Notify parent of the language change
  };

  return (
    <div>
      <FormControl className="languageBox">
        <InputLabel>Language:</InputLabel>
        <Select
          labelId="selectLanguage"
          id="language"
          value={selectedOption}
          label="Language"
          onChange={handleChange}
        >
          {languages.map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {key} &nbsp;{" "}
              <h3 style={{ color: "white", fontSize: "10px" }}>({value})</h3>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageSelector;
