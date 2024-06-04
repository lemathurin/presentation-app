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
      className="w-[100%] h-[100%] p-3 bg-background"
      value={text}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default TextEditor;
