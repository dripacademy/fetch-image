use thirtyfour_sync::prelude::*;

pub struct Instagram {
    pub driver: WebDriver,
}

impl Instagram {
    pub fn initialize() -> WebDriverResult<Instagram> {
        let mut caps = DesiredCapabilities::chrome();
        caps.add_chrome_arg("--lang=en")?;

        let driver = WebDriver::new("https://www.instagram.com/", &caps)?;

        Ok(Instagram {
            driver: driver,
        })
    }

    pub fn accept_cookies(&self) -> WebDriverResult<()> {
        self.driver.find_element(By::XPath("//button[contains(., 'Accept')]"))?
            .click()?;

        Ok(())
    }

    pub fn log_in(&self, username: String, password: String) -> WebDriverResult<()> {
        self.driver.get("https://www.instagram.com/accounts/login/")?;

        self.driver.find_element(By::Name("username"))?
            .send_keys(username)?;

        self.driver.find_element(By::Name("password"))?
            .send_keys(password)?;

        self.driver.find_element(By::XPath("//button[contains(., 'Log In')]"))?
            .click()?;

        Ok(())
    }
}
