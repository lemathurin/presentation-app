import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TopBar } from "./components/top-bar";
import TextEditor from "./components/text-editor";
import { handleOpenFile, handleSaveFile } from "./components/FileActions";
import { Button } from "./components/ui/button";
import { listen } from "@tauri-apps/api/event";

function App() {
  const [text, setText] = useState<string>("");
  const [filePath, setFilePath] = useState<string | null>(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen">
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-full border"
        >
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            {/* add this later collapsible={true} */}
            <div className="flex items-center justify-center h-full bg-secondary">
              <ModeToggle />
              <Button onClick={() => handleOpenFile(setText, setFilePath)}>
                Open File
              </Button>
              <Button onClick={() => handleSaveFile(text, filePath)}>
                Save File
              </Button>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <TopBar />
            <div className="flex items-center justify-center h-full bg-primary-foreground">
              <TextEditor text={text} setText={setText} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  );
}

export default App;
