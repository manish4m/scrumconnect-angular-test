import { AppPage } from "./app.po";
import { browser, by, element, logging, protractor } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual(
      "Welcome to scrumconnect-angular-test!"
    );
  });

  it("should allow searching for a city", () => {
    const searchInput = element(by.tagName("input"));
    searchInput.sendKeys("New York");
    searchInput.sendKeys(protractor.Key.ENTER);

    const tableRows = element.all(by.css("app-results table tr"));
    expect(tableRows.count()).toBeGreaterThan(0);
  });

  it("should display an error message for an invalid city", () => {
    const searchInput = element(by.css("app-search input"));
    searchInput.sendKeys("Invalid City");
    searchInput.sendKeys(protractor.Key.ENTER);

    const errorMessage = element(by.css(".error-message")).getText();
    expect(errorMessage).toEqual(
      "City not found. Please enter a valid city name."
    );
  });

  //This test will not pass as with invalid city the browser logs a 404 error meesage due to openweathermap api design
  afterEach(async () => {
      // Assert that there are no errors emitted from the browser
      const logs = await browser.manage().logs().get(logging.Type.BROWSER);
      expect(logs).not.toContain(
        jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry)
      );
  });
});
