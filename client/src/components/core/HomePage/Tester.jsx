import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AnimatedCodeBlock = () => {
  const [code, setCode] = useState("");
  const codeString = `const greet = () => {
    console.log("Hello, World!");
  };`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < codeString.length) {
        setCode((prev) => prev + codeString[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", borderRadius: "5px" }}>
      <SyntaxHighlighter
        language="javascript"
        style={solarizedlight}
        customStyle={{
          backgroundColor: "transparent", // Set background to transparent
          padding: "0", // Remove padding if needed
          border: "none", // Remove border if any
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default AnimatedCodeBlock;
