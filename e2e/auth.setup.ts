import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, ".auth", "user.json");

setup("authenticate as Breanna White", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("breanna@breannawhite.com");
  await page.getByLabel("Password").fill("WipaUtah2026!");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();

  // Wait for redirect to portal
  await expect(async () => {
    const url = page.url();
    expect(url).toContain("/portal");
  }).toPass({ timeout: 15000 });

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
