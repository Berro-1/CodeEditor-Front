import LanguageSelector from "../languageSelector/languageSelector.jsx";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState, useEffect } from "react";
import "./codeEditor.css";
import { CODE_SNIPPETS } from "../languageSelector/constants";
import Compiler from "../output/output.jsx";
import axios from "axios";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [suggestions, setSuggestions] = useState([]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language].code);
  };

  const fetchSuggestions = async (code) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getSuggestions",
        {
          code,
          language,
        }
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleEditorChange = (value) => {
    setValue(value);
    fetchSuggestions(value);
  };

  return (
    <div>
      <div className="code-editor">
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          width="100%"
          height="75vh"
          theme="vs-dark"
          language={language}
          defaultValue="// some comment"
          onMount={onMount}
          value={value}
          onChange={handleEditorChange}
        />
      </div>
      <Compiler editorRef={editorRef} language={language} />
      <div className="suggestions">
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
