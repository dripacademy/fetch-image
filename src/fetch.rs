use reqwest::blocking::{get, Client};
use reqwest::{redirect::Policy, Proxy};
use std::time::Duration;

fn build_client() -> Client {
    Client::builder()
        .timeout(Duration::from_secs(10))
        .redirect(Policy::none())
        //.redirect(Policy::limited(1))
        // default tor proxy
        //.proxy(Proxy::all("socks5h://127.0.0.1:9050").expect("Tor Proxy not running"))
        .build().unwrap()
}
/// returns json from account_name on instagram
pub fn get_profile_info(account_name: String) -> String {
    let client = build_client();

    client.get(format!("https://instagram.com/{}?__a=1", account_name))
        .send().unwrap()
        .text().unwrap()
}
