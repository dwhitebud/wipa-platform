import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const MEMBERSHIP_PLANS = {
  individual: {
    name: "Individual Membership",
    price: 35000, // $350.00 in cents
    applicationFee: 5000, // $50.00
    description:
      "For wedding professionals with 3+ years of industry experience.",
  },
  corporate: {
    name: "Corporate Membership",
    price: 55000, // $550.00
    applicationFee: 5000, // $50.00
    additionalMemberPrice: 25000, // $250.00 per additional employee
    description:
      "For businesses — includes 2 employee memberships.",
  },
  emerging: {
    name: "Emerging Membership",
    price: 27500, // $275.00
    applicationFee: 5000, // $50.00
    description:
      "For wedding professionals with less than 3 years of experience.",
  },
} as const;
