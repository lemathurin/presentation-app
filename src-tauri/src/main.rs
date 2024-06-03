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
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

fn main() {
    // Define the menu items
    let about = CustomMenuItem::new("about".to_string(), "About MyApp");
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");

    let new_file = CustomMenuItem::new("new_file".to_string(), "Create New File");
    let open_file = CustomMenuItem::new("open_file".to_string(), "Open File");
    let save_file = CustomMenuItem::new("save_file".to_string(), "Save File");
    let close_file = CustomMenuItem::new("close_file".to_string(), "Close File");

    // Define the 'App' submenu
    let app_submenu = Submenu::new(
        "MyApp",
        Menu::new()
            .add_item(about)
            .add_item(settings)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Quit),
    );

    // Define the 'File' submenu
    let file_submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(new_file)
            .add_item(open_file)
            .add_item(save_file)
            .add_item(close_file)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::CloseWindow),
    );

    // Define the main menu
    let menu = Menu::new()
        .add_submenu(app_submenu)
        .add_submenu(file_submenu)
        .add_native_item(MenuItem::Copy);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
                "new_file" => {
                    println!("Create New File clicked");
                    // Here you can add your logic to create a new file
                }
                "open_file" => {
                    println!("Open File clicked");
                    // Here you can add your logic to open a file
                }
                "about" => {
                    println!("About MyApp clicked");
                    // Here you can add your logic for the About action
                }
                "settings" => {
                    println!("Settings clicked");
                    // Here you can add your logic for the Settings action
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![open_main_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn open_main_window(app: tauri::AppHandle, file_path: Option<String>) {
    if let Some(ref path) = file_path {
        println!("Received file path: {}", path);
        app.emit_all("file_path", Some(path.clone()))
            .expect("Failed to send file path");
    } else {
        println!("No file path received.");
    }

    let main_window = app.get_window("main").unwrap();
    main_window.show().unwrap();
    app.get_window("initial").unwrap().close().unwrap();
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
