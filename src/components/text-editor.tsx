import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface TextEditorProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, setText }) => {
  // const [value, setValue] = React.useState("**Hello world!!!**");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  return (
    // <textarea
    //   className="w-[100%] h-[100%] p-3 bg-background"
    //   value={text}
    //   onChange={handleChange}
    //   placeholder="Type something..."
    // />
    <div className="container">
      <MDEditor
        value={text}
        onChange={(handleChange) => setText(handleChange || "")}
      />
      <MDEditor.Markdown source={text} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
};

export default TextEditor;
