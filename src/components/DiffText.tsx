import React from "react";

interface DiffTextProps {
  original: string,
  transcript: string,
};

const DiffText: React.FC<DiffTextProps> = ({ original, transcript }) => {
  const originalWords = original
  .split(" ")
    .map(word => word.toLowerCase().replaceAll(/[^a-zA-Z]/g, ""));
  return (
    <div>
      {transcript.split(" ").map((word) => {
        if (originalWords.includes(word.toLowerCase())) {
          return <span className="correct-word">{word} </span>;
        } else {
          return <span className="wrong-word">{word} </span>;
        }
      })}
    </div>
  );
};

export default DiffText;