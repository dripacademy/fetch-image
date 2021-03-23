extern crate tokio;
#[macro_use]
extern crate log;
use env_logger::{Builder, Target};
use std::env;
use dotenv::dotenv;

mod instagram;
use instagram::*;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let mut log_builder = Builder::from_default_env();
    log_builder.target(Target::Stdout);
    log_builder.init();

    let ig: Option<Instagram> = match Instagram::initialize().await {
        Err(e) => {
            warn!("{}", e);
            None
        },
        Ok(i) => Some(i),
    };

    ig.unwrap().accept_cookies().await.unwrap();
}
