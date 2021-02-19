import React from "react";

interface HighlightTextProps {
  text: string,
  startIndex: number,
  endIndex: number,
};

const HighlightedText: React.FC<HighlightTextProps> = ({ text, startIndex, endIndex }) => {
  return (
    <div>
      {text.split(" ").map((word, index) => {
        if (startIndex <= index && index < endIndex) {
          return <span className="highlighted">{word} </span>
        } else {
          return <span>{word} </span>
        }
      })}
    </div>
  );
};

export default HighlightedText;