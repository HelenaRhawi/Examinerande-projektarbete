import { validate as validateUUID } from "uuid";
import db from "../data/db.js";

export default function validateCampaign(req, res, next) {
  const { campaignId } = req.body;

  if (!campaignId) {
    req.campaign = null;
    return next();
  }

  if (!validateUUID(campaignId)) {
    return res.status(400).json({ Error: "Invalid ID-format" });
  }

  const campaign = db
    .prepare("SELECT * FROM campaigns WHERE id = ?")
    .get(campaignId);

  if (!campaign) {
    return res.status(404).json({ Error: "Campaign not found" });
  }

  req.campaign = campaign;

  next();
}
