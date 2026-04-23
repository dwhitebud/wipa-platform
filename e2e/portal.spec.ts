import { test, expect } from "@playwright/test";

test.describe("Portal — Authenticated", () => {
  test("dashboard loads with personalized greeting", async ({ page }) => {
    await page.goto("/portal/dashboard");
    await expect(page.getByText("Welcome back, Breanna")).toBeVisible();
  });

  test("dashboard shows chapter context", async ({ page }) => {
    await page.goto("/portal/dashboard");
    await expect(page.getByText("WIPA Utah")).toBeVisible();
  });

  test("dashboard has stat cards", async ({ page }) => {
    await page.goto("/portal/dashboard");
    // Use the main content area to scope — stat labels are unique enough
    await expect(page.getByText("Upcoming Events").first()).toBeAttached();
    await expect(page.getByText("Chapter Members")).toBeAttached();
    await expect(page.getByText("Videos Available")).toBeAttached();
  });

  test("dashboard has quick actions", async ({ page }) => {
    await page.goto("/portal/dashboard");
    await expect(page.getByText("Quick Actions")).toBeAttached();
    await expect(page.getByText("Edit Profile")).toBeAttached();
    await expect(page.getByText("Browse Events")).toBeAttached();
  });

  test("profile page loads with real user data", async ({ page }) => {
    await page.goto("/portal/profile");
    await expect(page.locator("h1")).toContainText("My Profile");
    // User info in the sidebar card
    await expect(page.locator("h2").filter({ hasText: "Breanna White" })).toBeVisible();
    await expect(page.getByText("Photographer").first()).toBeAttached();
  });

  test("profile form is pre-filled with user data", async ({ page }) => {
    await page.goto("/portal/profile");
    const firstNameInput = page.locator("#firstName");
    await expect(firstNameInput).toHaveValue("Breanna");
    const lastNameInput = page.locator("#lastName");
    await expect(lastNameInput).toHaveValue("White");
  });

  test("profile form can be edited and saved", async ({ page }) => {
    await page.goto("/portal/profile");
    const bioField = page.locator("#bio");
    await bioField.fill("Utah wedding photographer specializing in mountain elopements.");
    await page.getByRole("button", { name: /Save Changes/i }).click();
    await expect(page.getByText("Saved")).toBeVisible({ timeout: 10000 });
  });

  test("directory page loads with members", async ({ page }) => {
    await page.goto("/portal/directory");
    await expect(page.locator("h1")).toContainText("Member Directory");
    await expect(page.getByText("Breanna White").first()).toBeAttached();
  });

  test("events page loads", async ({ page }) => {
    await page.goto("/portal/events");
    await expect(page.locator("h1")).toContainText("Events");
    await expect(page.getByText("Browse and register")).toBeVisible();
  });

  test("videos page loads", async ({ page }) => {
    await page.goto("/portal/videos");
    await expect(page.locator("h1")).toContainText("Video Library");
    await expect(page.getByText("24/7 access")).toBeVisible();
  });

  test("payments page loads", async ({ page }) => {
    await page.goto("/portal/payments");
    await expect(page.locator("h1")).toContainText("Payments");
    await expect(page.getByText("Membership Subscription", { exact: true })).toBeAttached();
  });

  test("announcements page loads", async ({ page }) => {
    await page.goto("/portal/announcements");
    await expect(page.locator("h1")).toContainText("Announcements");
  });

  test("settings page loads", async ({ page }) => {
    await page.goto("/portal/settings");
    await expect(page.locator("h1")).toContainText("Settings");
    await expect(page.getByText("Notification Preferences").first()).toBeAttached();
  });

  test("board projects page loads", async ({ page }) => {
    await page.goto("/board/projects");
    await expect(page.locator("h1")).toContainText("Board Projects");
  });

  test("sidebar navigation works", async ({ page }) => {
    await page.goto("/portal/dashboard");
    await page.getByRole("link", { name: /Profile/i }).first().click();
    await page.waitForURL("**/portal/profile");
    await expect(page.locator("h1")).toContainText("My Profile");
  });
});
