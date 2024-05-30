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

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_main_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn open_main_window(app: tauri::AppHandle, file_path: Option<String>) {
    let main_window = app.get_window("main").unwrap();
    main_window.show().unwrap();
    app.get_window("initial").unwrap().close().unwrap();

    if let Some(path) = file_path {
        main_window
            .eval(&format!(
                "window.__TAURI__.invoke('load_file', {{ filePath: '{}' }})",
                path
            ))
            .unwrap();
    }
}

// #[tauri::command]
// fn my_custom_command() {
//     println!("I was invoked from JS!");
// }

// fn main() {
//     tauri::Builder::default()
//         // This is where you pass in your commands
//         .invoke_handler(tauri::generate_handler![my_custom_command])
//         .run(tauri::generate_context!())
//         .expect("failed to run app");
// }
