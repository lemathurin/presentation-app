import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TopBar } from "./components/top-bar";

function App() {
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
              <span className="font-semibold">One</span>
              <ModeToggle />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <TopBar />
            <div className="flex items-center justify-center h-full bg-primary-foreground">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  );
}

export default App;
