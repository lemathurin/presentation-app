import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TopBar } from "./components/top-bar";
import TextEditor from "./components/text-editor";
import { handleSaveFile } from "./components/FileActions";
import { Button } from "./components/ui/button";
import { listen } from "@tauri-apps/api/event";
import { readTextFile } from "@tauri-apps/api/fs";

function App() {
  const [text, setText] = useState<string>("");
  const [filePath, setFilePath] = useState<string | null>(null);

  useEffect(() => {
    if (filePath) {
      // Load file content when filePath changes
      readTextFile(filePath)
        .then((fileContent) => {
          setText(fileContent);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    }
  }, [filePath]);

  // Define a function to handle file path messages
  function handleFilePath(filePath: string | null) {
    if (filePath) {
      console.log("Received file path:", filePath);
      // Update the state with the received file path
      setFilePath(filePath);
    } else {
      console.log("No file path received.");
      // Handle the case where no file path is received
    }
  }

  // Listen for file path messages from the backend
  listen("file_path", (event) => {
    handleFilePath(event.payload as string | null);
  });

  useEffect(() => {
    const unlistenFilePath = listen("file_path", (event) => {
      handleFilePath(event.payload as string | null);
    });

    const unlistenSaveFile = listen("save_file", () => {
      if (filePath) {
        handleSaveFile(text, filePath)
          .then(() => {
            console.log("File saved successfully.");
          })
          .catch((error) => {
            console.error("Error saving file:", error);
          });
      } else {
        console.log("No file path to save.");
      }
    });

    return () => {
      unlistenFilePath.then((unlisten) => unlisten());
      unlistenSaveFile.then((unlisten) => unlisten());
    };
  }, [text, filePath]);

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
