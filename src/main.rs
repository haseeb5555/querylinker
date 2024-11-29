use std::env;
use open;
use std::process::exit;

fn main() {
   
    let args: Vec<String> = env::args().collect();

   
    if args.len() < 3 {
        eprintln!("Usage: search <platform> <query>");
        eprintln!("Available platforms: google, stackoverflow, chatgpt, claude");
        exit(1);
    }

    let platform = &args[1].to_lowercase();
    let query = args[2..].join(" ");

    
    let url = match platform.as_str() {
        "google" => format!("https://www.google.com/search?q={}", query),
        "stackoverflow" => format!("https://stackoverflow.com/search?q={}", query),
        "chatgpt" => format!("https://chat.openai.com/?model=gpt-4&q={}", query.replace(" ", "+")),
        "claude" => format!("https://claude.ai/new?q={}", query), 
        _ => {
            eprintln!("Invalid platform: {}", platform);
            eprintln!("Available platforms: google, stackoverflow, chatgpt, claude");
            exit(1);
        }
    };

    
    if let Err(err) = open::that(&url) {
        eprintln!("Error opening browser: {}", err);
        exit(1);
    }

   
    if platform == "chatgpt" || platform == "claude" {
        println!("Opened {}. Please paste the query manually if needed.", platform);
    }
}
