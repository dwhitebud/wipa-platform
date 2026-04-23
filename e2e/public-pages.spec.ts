import { test, expect } from "@playwright/test";

test.describe("Public Pages", () => {
  test("homepage loads with hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/WIPA/);
    await expect(page.locator("h1")).toContainText("Elevating the");
    await expect(page.getByText("Become a Member").first()).toBeVisible();
  });

  test("homepage has key sections", async ({ page }) => {
    await page.goto("/");
    // Sections exist in the DOM (may be below fold)
    await expect(page.getByText("What is WIPA")).toBeAttached();
    await expect(page.getByText("Member Benefits").first()).toBeAttached();
    await expect(page.getByText("Our Chapters")).toBeAttached();
  });

  test("chapters page loads with real data from Supabase", async ({ page }) => {
    await page.goto("/chapters");
    await expect(page.locator("h1")).toContainText("Our Chapters");
    // Should have chapter cards from Supabase — use first() since names may appear in nav too
    await expect(page.getByText("Southern California").first()).toBeAttached();
    await expect(page.getByText("Utah").first()).toBeAttached();
    await expect(page.getByText("Atlanta").first()).toBeAttached();
  });

  test("chapter detail page loads with slug", async ({ page }) => {
    await page.goto("/chapters/southern-california");
    await expect(page.locator("h1")).toContainText("Southern California");
    await expect(page.getByText("Los Angeles, CA").first()).toBeVisible();
    await expect(page.getByText("Members").first()).toBeAttached();
  });

  test("chapter detail page shows 404 for invalid slug", async ({ page }) => {
    const response = await page.goto("/chapters/nonexistent-chapter-xyz");
    expect(response?.status()).toBe(404);
  });

  test("membership benefits page loads", async ({ page }) => {
    await page.goto("/membership/benefits");
    await expect(page.locator("h1")).toContainText("Membership Benefits");
    // Section headings in the benefit cards
    await expect(page.locator("text=Education").first()).toBeAttached();
    await expect(page.locator("text=Networking").first()).toBeAttached();
  });

  test("membership FAQ page loads with accordions", async ({ page }) => {
    await page.goto("/membership/faq");
    await expect(page.locator("h1")).toContainText("Membership FAQs");
    await expect(page.getByText("What is WIPA?")).toBeVisible();
    await expect(page.getByText("Who can join WIPA?")).toBeVisible();
  });

  test("membership leadership roles page loads", async ({ page }) => {
    await page.goto("/membership/leadership-roles");
    await expect(page.locator("h1")).toContainText("Leadership Roles");
    await expect(page.getByText("Education Committee")).toBeVisible();
  });

  test("blog page loads with posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Blog & News");
    await expect(page.getByText("January 2026 Newsletter").first()).toBeVisible();
  });

  test("contact page loads with form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Contact Us");
    await expect(page.getByText("Contact a WIPA Chapter")).toBeVisible();
    await expect(page.getByPlaceholder("Your name")).toBeVisible();
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
    await expect(page.getByPlaceholder("How can we help?")).toBeVisible();
  });

  test("events page loads", async ({ page }) => {
    await page.goto("/events");
    await expect(page.locator("h1")).toContainText("Events Calendar");
  });

  test("about our-story page loads", async ({ page }) => {
    await page.goto("/about/our-story");
    await expect(page.locator("h1")).toContainText("Our WIPA Story");
    await expect(page.getByText("Joyce Scardina Becker").first()).toBeAttached();
  });

  test("about DEI page loads", async ({ page }) => {
    await page.goto("/about/dei");
    await expect(page.locator("h1")).toContainText("Diversity, Equity");
  });

  test("about redirects to our-story", async ({ page }) => {
    await page.goto("/about");
    await page.waitForURL("**/about/our-story");
    await expect(page.locator("h1")).toContainText("Our WIPA Story");
  });

  test("membership redirects to benefits", async ({ page }) => {
    await page.goto("/membership");
    await page.waitForURL("**/membership/benefits");
    await expect(page.locator("h1")).toContainText("Membership Benefits");
  });
});
