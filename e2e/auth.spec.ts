import { test, expect } from "@playwright/test";

test.describe("Auth Flow", () => {
  test("login page loads with form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Member Center")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign In", exact: true })
    ).toBeVisible();
  });

  test("login page has magic link option", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByText("Sign in with a magic link instead")
    ).toBeVisible();
  });

  test("login page has link to membership application", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Apply for membership")).toBeVisible();
  });

  test("forgot password page loads", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByText("Reset Password")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
  });

  test("login page links to forgot password", async ({ page }) => {
    await page.goto("/login");
    await page.getByText("Forgot password?").click();
    await page.waitForURL("**/forgot-password");
    await expect(page.getByText("Reset Password")).toBeVisible();
  });

  test("protected portal routes redirect to login", async ({ page }) => {
    await page.goto("/portal/dashboard");
    await page.waitForURL("**/login**");
    await expect(page.getByText("Member Center")).toBeVisible();
  });

  test("protected board routes redirect to login", async ({ page }) => {
    await page.goto("/board/projects");
    await page.waitForURL("**/login**");
  });

  test("login with valid credentials works", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("breanna@breannawhite.com");
    await page.getByLabel("Password").fill("WipaUtah2026!");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
    // After login, either we get redirected to portal or the page processes the login
    // Wait for navigation away from the login page
    await expect(async () => {
      const url = page.url();
      expect(url).toContain("/portal");
    }).toPass({ timeout: 15000 });
  });

  test("login with invalid credentials shows error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("nobody@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page
      .getByRole("button", { name: "Sign In", exact: true })
      .click();
    // Should stay on login page
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/login/);
  });
});
