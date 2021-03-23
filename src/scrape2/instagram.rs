use thirtyfour::prelude::*;

pub struct Instagram {
    pub driver: WebDriver,
}

impl Instagram {
    pub async fn initialize() -> WebDriverResult<Instagram> {
        let mut caps = DesiredCapabilities::chrome();
        caps.add_chrome_arg("--lang=en")?;
        caps.add_chrome_arg("--headlesss=false")?;

        let driver = WebDriver::new("https://www.instagram.com/", &caps).await?;

        Ok(Instagram {
            driver: driver,
        })
    }

    pub async fn accept_cookies(&self) -> WebDriverResult<()> {
        self.driver.find_element(By::XPath("//button[contains(., 'Accept')]")).await?
            .click().await?;

        Ok(())
    }

    pub async fn log_in(&self, username: String, password: String) -> WebDriverResult<()> {
        self.driver.get("https://www.instagram.com/accounts/login/").await?;

        self.driver.find_element(By::Name("username")).await?
            .send_keys(username).await?;

        self.driver.find_element(By::Name("password")).await?
            .send_keys(password).await?;

        self.driver.find_element(By::XPath("//button[contains(., 'Log In')]")).await?
            .click().await?;

        Ok(())
    }
}
