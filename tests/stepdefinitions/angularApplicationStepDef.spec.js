import test, { expect } from "@playwright/test";

test("User login to the angular application", async ({ page }) => {

  test.setTimeout(60000); // Override the test timeout to complete (default 30000ms)
  const slowExpect = expect.configure({timeout: 9000});   // assertion timeout custom
  page.setDefaultTimeout(9000); // Action timeout for test level overrides global 
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.locator('input[name="name"]').nth(0).fill("Chandra");
  await page.locator('input[name="email"]').nth(0).fill("Chandra123@gmail.com");
  await page.getByPlaceholder("Password").fill("Chan@123");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByLabel("Employed").click();
  await page.locator('input[name="bday"]').fill("2020-01-01");
  await page.getByRole("button",{name:"Submit"}).click({timeout:15000}); // Action step level timeout to wait overrides all test and global level
  //Steplevel timeout
  await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});
  await page.getByRole("link",{name:"Shop"}).click();
  //test level timeout
  await slowExpect(page.getByRole('link', { name: 'ProtoCommerce Home' })).toBeVisible();
  await page.locator("app-card").filter({hasText:"Samsung Note 8"}).getByRole("button").click();
  await page.getByText(/checkout/i).click();
});
