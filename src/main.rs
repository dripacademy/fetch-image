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

    info!("Hello, world!");

    let posts_str = parse::get_posts("./data/test.json".to_string());

    let mut posts: Vec<Option<parse::Post>> = Vec::new();

    for p in posts_str {
        posts.push(parse::str_to_post(p));
    }

    debug!("{:#?}", posts);
}
