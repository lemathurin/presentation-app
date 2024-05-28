import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

export default function InitialApp() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen p-8">
        <Button onClick={() => invoke("open_main_window")}>
          New presentation
        </Button>
      </div>
    </ThemeProvider>
  );
}
