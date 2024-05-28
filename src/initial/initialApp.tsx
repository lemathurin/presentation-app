import { invoke } from "@tauri-apps/api/tauri";

export default function InitialApp() {
  return (
    <div>
      <h1>Initial App</h1>
      <p>Does this work?</p>

      <button onClick={() => invoke("my_custom_command")}>Test command</button>
    </div>
  );
}
