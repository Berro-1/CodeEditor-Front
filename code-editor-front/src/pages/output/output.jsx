import React, { useState } from "react";
import "./output.css";
import { executeCode } from "../output/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Compiler = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user_id, setUserid] = useState(1);

  const saveCode = async (sourceCode) => {
    if (!sourceCode) {
      toast.error("Please enter code to save");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/code/createCode",
        {
          user_id: user_id,
          code: sourceCode,
        }
      );
      toast.success("Code saved successfully");
    } catch (error) {
      console.error(
        "Save code error:",
        error.response ? error.response.data : error
      );
      toast.error(
        "Save code error: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode);
      setOutput(result.run.output);
    } catch (error) {
      console.error(
        "Execution error:",
        error.response ? error.response.data : error
      );
      toast.error(
        "Execution error: " +
          (error.response ? error.response.data.message : error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="compiler">
      <button className="outputButton" onClick={runCode} disabled={isLoading}>
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <button
        className="outputButton"
        onClick={() => saveCode(editorRef.current.getValue())}
      >
        Save
      </button>
      <div className="outputBox">
        {output ? output : `Click "Run Code" to see output here`}
      </div>
    </div>
 
  )}
  export default Compiler;