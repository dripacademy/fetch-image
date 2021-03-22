#[macro_use]
extern crate log;
use env_logger::{Builder, Target};
use std::env;
use dotenv::dotenv;

use thirtyfour_sync::prelude::*;

mod instagram;
use instagram::*;

fn main() {
    dotenv().ok();

    let mut log_builder = Builder::from_default_env();
    log_builder.target(Target::Stdout);
    log_builder.init();

    let ig = Instagram::initialize().unwrap();
    ig.accept_cookies().unwrap();
}
