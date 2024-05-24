import React from "react";

interface TextEditorProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, setText }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  return (
    <textarea
      className="w-[90%] h-[90%] bg-red-300"
      value={text}
      onChange={handleChange}
    />
  );
};

export default TextEditor;
