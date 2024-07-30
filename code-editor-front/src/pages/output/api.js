import axios from "axios";
import { LANGUAGE_VERSIONS } from "../languageSelector/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  try {
    const payload = {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          name: "main",  // You might need to add a name field based on API requirements
          content: sourceCode,
        },
      ],
    };
    console.log("Sending payload:", payload);
    const response = await API.post("/execute", payload);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response ? error.response.data : error);
    throw error;
  }
};
