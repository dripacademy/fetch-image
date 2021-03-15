use reqwest::blocking::get;

/// returns json from account_name on instagram
pub fn get_profile_info(account_name: String) -> String {
    get(format!("https://instagram.com/{}?__a=1", account_name))
    .unwrap()
    .text()
    .unwrap()
}
