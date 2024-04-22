import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1 className="text-orange-300">Welcome to Tauri!</h1>
        <ModeToggle />
      </ThemeProvider>
    </div>
  );
}

export default App;
