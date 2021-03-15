#[macro_use]
extern crate log;
use env_logger::{Builder, Target};
use std::env;
use dotenv::dotenv;
use chrono::{Utc};

use std::fs;

mod fetch;
mod parse;

fn main() {
    dotenv().ok();

    let mut log_builder = Builder::from_default_env();
    log_builder.target(Target::Stdout);
    log_builder.init();

    let account_list: String =  env::var("ACCOUNT_LIST").expect("ACOUNT_LIST must be set");

    for acc in account_list.split(',').collect::<Vec<_>>() {
        let mut posts: Vec<parse::Post> = Vec::new();

        // using unix timestamp
        let filename = format!("./data/json/{}-{}.json", Utc::now().format("%s"), acc.to_string());
        let data = fetch::get_profile_info(acc.to_string());

        if !data.is_empty() {
            for i in 0..12 {
                let post_str = parse::get_post_by_id(i, data.to_string());

                match parse::str_to_post(post_str) {
                    None => (),
                    Some(p) => posts.push(p),
                }
            }

            fs::write(filename.to_string(), serde_json::to_string_pretty(&posts).unwrap()).unwrap();
            info!("Wrote file: {}", filename);
        }
    }
}
