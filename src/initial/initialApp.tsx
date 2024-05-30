import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { handleCreateFile } from "@/components/FileActions";

export default function InitialApp() {
  const [text, setText] = useState<string>("");
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleCreateFileAndOpenWindow = async () => {
    await handleCreateFile(setText, setFilePath);
    await invoke("open_main_window");
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen p-8">
        <Button onClick={handleCreateFileAndOpenWindow}>
          New presentation
        </Button>
      </div>
    </ThemeProvider>
  );
}
