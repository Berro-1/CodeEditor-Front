import LanguageSelector from "../languageSelector/languageSelector.jsx";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import "./codeEditor.css";
import { CODE_SNIPPETS } from "../languageSelector/constants";
import Compiler from "../output/output.jsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language].code);
  };

  return (
    <div >
      <div  className="code-editor">
        <LanguageSelector language={language} onSelect={onSelect}  />
        <Editor
          width="100%"
          height="75vh"
          theme="vs-dark"
          language={language}
          defaultValue="// some comment"
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Compiler editorRef={editorRef} language={language} />
      
    </div>
  );
};

export default CodeEditor;
