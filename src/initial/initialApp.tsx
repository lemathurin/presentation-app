import { invoke } from "@tauri-apps/api/tauri";

export default function InitialApp() {
  return (
    <div>
      <h1>Initial App</h1>
      <p>Does this work?</p>

      <button onClick={() => invoke("open_main_window")}>Test command</button>
    </div>
  );
}
