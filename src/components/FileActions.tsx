import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";

export const handleOpenFile = async (
  setText: React.Dispatch<React.SetStateAction<string>>,
  setFilePath: React.Dispatch<React.SetStateAction<string | null>>
) => {
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

export const handleSaveFile = async (text: string, filePath: string | null) => {
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

export const handleCreateFile = async (
  setText: React.Dispatch<React.SetStateAction<string>>,
  setFilePath: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const newFilePath = await save({
      filters: [
        {
          name: "Markdown Files",
          extensions: ["md"],
        },
      ],
    });

    if (newFilePath) {
      await writeTextFile(
        newFilePath,
        "# New Markdown File\n\nStart writing your content here..."
      );
      setText("# New Markdown File\n\nStart writing your content here...");
      setFilePath(newFilePath);
      console.log("New file created:", newFilePath);
    }
  } catch (error) {
    console.error("Error creating file:", error);
  }
};
