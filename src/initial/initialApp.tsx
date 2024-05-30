import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { handleCreateFile, handleOpenFile } from "@/components/FileActions";

export default function InitialApp() {
  const [text, setText] = useState<string>("");
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleCreateFileAndOpenWindow = async () => {
    const newFilePath = await handleCreateFile(setText, setFilePath);
    if (newFilePath) {
      await invoke("open_main_window", { filePath: newFilePath });
    }
  };

  const handleOpenFileAndOpenWindow = async () => {
    const filePath = await handleOpenFile(setText, setFilePath);
    if (filePath) {
      await invoke("open_main_window", { filePath: filePath });
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen p-8">
        <Button onClick={handleCreateFileAndOpenWindow}>
          New presentation
        </Button>
        <Button onClick={handleOpenFileAndOpenWindow}>Open presentation</Button>
      </div>
    </ThemeProvider>
  );
}
