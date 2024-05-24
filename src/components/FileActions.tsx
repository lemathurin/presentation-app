// import React, { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";

interface FileActionsProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  filePath: string | null;
  setFilePath: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileActions: React.FC<FileActionsProps> = ({
  text,
  setText,
  filePath,
  setFilePath,
}) => {
  const handleOpenFile = async () => {
    try {
      const selectedFile = await open({
        multiple: false,
        filters: [
          {
            name: "Text Files",
            extensions: ["md"],
          },
        ],
      });

      if (selectedFile) {
        const fileContent = await readTextFile(selectedFile as string);
        setText(fileContent);
        setFilePath(selectedFile as string);
      }
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  const handleSaveFile = async () => {
    try {
      if (filePath) {
        await writeTextFile(filePath, text);
        console.log("File saved:", filePath);
      } else {
        console.error("No file path specified");
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenFile}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Open File
      </button>
      <button
        onClick={handleSaveFile}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save File
      </button>
    </div>
  );
};

export default FileActions;
