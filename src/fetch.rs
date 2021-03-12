use reqwest::get;

pub struct Image {
    pub caption: String,
    pub link: String,
}

/// returns json from account_name on instagram
pub async fn get_profile_info(account_name: String) -> String {
    get(format!("https://instagram.com/{}", account_name)).await
    .unwrap()
    .text().await
    .unwrap()
}

pub fn extract_image_links(json: String) -> Vec<Image> {
    // deserialize json
    // read all 12 images (from instagram "public api")
    // create struct instance for every image
    // return image vector

    // placeholder vec
    vec!(Image{
        caption: "test_caption 01".to_string(),
        link: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mikrocontroller.net%2Fattachment%2F101360%2Ftestbild.gif&f=1&nofb=1".to_string(),
    })
}
