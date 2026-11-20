import { describe, expect, it } from "vitest";
import { SITE_ORGANIZATION_JSON_LD } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/constants/site";

describe("SITE_ORGANIZATION_JSON_LD", () => {
  it("identifies the site and its contact email", () => {
    expect(SITE_ORGANIZATION_JSON_LD).toMatchObject({
      "@type": "Organization",
      url: "https://referral-hub.app",
      email: CONTACT_EMAIL,
    });
  });
});
