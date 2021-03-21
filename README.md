# Fetch Image

This Repository contains multiple tools, that fetch Posts from Instagram.

My endgoal is to have multiple microservices, that will be able to fulfill each step from getting post data, to sending a message on Telegram.

## Applications

### `scrape-posts/`

Node app, that opens a new IG session, and goes to each profile, and scrapes Info of each Post (image link, caption, upload date) and will save it to JSON file.

### `src/`

#### `scrape/`

Scrape the newest 12 Images via the public IG Api. Results will be saved as JSON file.
