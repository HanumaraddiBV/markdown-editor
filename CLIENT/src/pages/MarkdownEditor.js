import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  // Send markdown text to backend for conversion
  useEffect(() => {
    fetchHTML();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  useEffect(() => {
    Prism.highlightAll(); // for Syntax highlighting
  }, [htmlPreview]);

  //fetching HTML from server
  const fetchHTML = async () => {
    if (markdown) {
      try {
        const response = await axios.post("http://localhost:5000/convert", {
          markdown,
        });
        setHtmlPreview(response.data.html); // set html preview
      } catch (error) {
        console.error("Error converting markdown:", error);
      }
    } else {
      setHtmlPreview("");
    }
  };

  return (
    <>
      <div className="main-header">
        <h1>Markdown Editor</h1>
      </div>
      <div className="container">
        <div className="editor-pane">
          <h2>Editor</h2>
          <textarea onChange={handleMarkdownChange} value={markdown}></textarea>
        </div>
        <div class="preview-section">
          <h2>Live Preview</h2>
          <div className="preview-pane">
            <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkdownEditor;
