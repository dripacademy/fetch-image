#[macro_use]
extern crate log;
use env_logger::{Builder, Target};
use dotenv::dotenv;

mod fetch;

fn main() {
    dotenv().ok();

    let mut log_builder = Builder::from_default_env();
    log_builder.target(Target::Stdout);
    log_builder.init();

    info!("Hello, world!");
}
