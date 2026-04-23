import { test, expect } from "@playwright/test";

test.describe("Membership Join Flow", () => {
  test("join page loads with tier selection", async ({ page }) => {
    await page.goto("/membership/join");
    await expect(page.locator("h1")).toContainText("Become a WIPA Member");
    await expect(page.getByText("Choose Your Membership")).toBeVisible();
    await expect(page.getByText("Individual Membership")).toBeVisible();
    await expect(page.getByText("Corporate Membership")).toBeVisible();
    await expect(page.getByText("Emerging Membership")).toBeVisible();
  });

  test("step indicator shows correct state", async ({ page }) => {
    await page.goto("/membership/join");
    await expect(page.getByText("Choose Plan")).toBeVisible();
    await expect(page.getByText("Your Info")).toBeVisible();
    await expect(page.getByText("Review")).toBeVisible();
  });

  test("continue button is disabled until tier is selected", async ({ page }) => {
    await page.goto("/membership/join");
    const continueBtn = page.getByRole("button", { name: /Continue/i });
    await expect(continueBtn).toBeDisabled();
  });

  test("selecting a tier enables the continue button", async ({ page }) => {
    await page.goto("/membership/join");
    // Click the Individual Membership card
    await page.getByText("Individual Membership").click();
    const continueBtn = page.getByRole("button", { name: /Continue/i });
    await expect(continueBtn).toBeEnabled();
  });

  test("step 1 to step 2 navigation works", async ({ page }) => {
    await page.goto("/membership/join");
    await page.getByText("Individual Membership").click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(page.getByText("Your Information")).toBeVisible();
    await expect(page.getByPlaceholder("First and last name")).toBeVisible();
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  });

  test("step 2 back button returns to step 1", async ({ page }) => {
    await page.goto("/membership/join");
    await page.getByText("Individual Membership").click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(page.getByText("Your Information")).toBeVisible();
    await page.getByRole("button", { name: /Back/i }).click();
    await expect(page.getByText("Choose Your Membership")).toBeVisible();
  });

  test("step 2 shows requirements for Individual membership", async ({ page }) => {
    await page.goto("/membership/join");
    await page.getByText("Individual Membership").click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(page.getByText("3+ years experience in Weddings/Events")).toBeVisible();
  });

  test("step 2 shows requirements for Emerging membership", async ({ page }) => {
    await page.goto("/membership/join");
    await page.getByText("Emerging Membership").click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(
      page.getByText("Less than 3 years experience in Weddings/Events")
    ).toBeVisible();
  });

  test("pricing is displayed correctly", async ({ page }) => {
    await page.goto("/membership/join");
    await expect(page.getByText("$350")).toBeVisible();
    await expect(page.getByText("$550")).toBeVisible();
    await expect(page.getByText("$275")).toBeVisible();
  });
});
