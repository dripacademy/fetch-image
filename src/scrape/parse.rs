use std::fs;
use chrono::{NaiveDateTime};
use serde::{Serialize, Deserialize};
use serde_json::{Value};

#[derive(Serialize,Deserialize)]
pub struct Post {
    pub caption: Option<String>,
    pub image_url: String,
    pub timestamp: String,
}

pub fn read_file(filepath: String) -> String {
    fs::read_to_string(filepath).expect("Could not read file")
}

pub fn get_post_by_id(id: usize, content: String) -> String {
    let v: Value = serde_json::from_str(&content).unwrap();

    v["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"][id].to_string()
}

/// parse json string to Post struct instance
pub fn str_to_post(post_str: String) -> Option<Post> {
    let post_v: Value = serde_json::from_str(&post_str).unwrap();
    
    let image_url: String = match post_v["node"]["display_url"].as_str() {
        None => "".to_string(),
        Some(u) => u.to_string(),
    };

    // if there isn't any image_url, the whole post is nonexistant, therefore return none
    // also, this is done right after "parsing" image_url, becuase otherwise the unwrap for unix_timestamp would cause panic
    if image_url == "null".to_string() {
        return None;
    }

    let unix_timestamp: i64 = post_v["node"]["taken_at_timestamp"].to_string().parse::<i64>().unwrap();
    let timestamp: String = NaiveDateTime::from_timestamp(unix_timestamp, 0).to_string();

    let caption: Option<String> = match post_v["node"]["edge_media_to_caption"]["edges"][0]["node"]["text"].as_str() {
        None => None,
        Some(c) => Some(c.to_string()),
    };

    Some(Post {
        caption: caption,
        image_url,
        timestamp,
    })
}
