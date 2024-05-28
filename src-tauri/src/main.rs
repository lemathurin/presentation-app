// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

use tauri::{Manager, WindowBuilder};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_main_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn open_main_window(app: tauri::AppHandle) {
    let main_window = app.get_window("main").unwrap(); // Use "main" instead of "index"
    main_window.show().unwrap();
    app.get_window("initial").unwrap().close().unwrap();
}
