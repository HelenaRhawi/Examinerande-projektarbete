import db from "../db.js";
import campaigns from "../campaign.json" with { type: "json" };

export function seedCampaignsIfEmpty() {
  try {
    const existingCampaigns = db
      .prepare("SELECT COUNT(*) as count FROM campaigns")
      .get();

    if (existingCampaigns.count === 0) {
      const insert = db.prepare(`
    INSERT INTO campaigns (id, discount)
    VALUES (?, ?)
  `);

      for (const campaign of campaigns.campaigns) {
        insert.run(campaign.id, campaign.discount);
      }
    }
  } catch (error) {
    console.error("Seeding campaigns failed:", error);
    throw error;
  }
}
