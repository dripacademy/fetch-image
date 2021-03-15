#[macro_use]
extern crate log;
use env_logger::{Builder, Target};
use dotenv::dotenv;

mod fetch;
mod parse;

fn main() {
    dotenv().ok();

    let mut log_builder = Builder::from_default_env();
    log_builder.target(Target::Stdout);
    log_builder.init();

    let mut posts_str: Vec<String> = Vec::new();

    for i in 0..12 {
        posts_str.push(parse::get_post_by_id(i, "./data/www.instagram.com.json".to_string()));
    }

    for p in posts_str {
        match parse::str_to_post(p) {
            None => (),
            Some(v) => debug!("{}", v.image_url),
        }
    }

}
