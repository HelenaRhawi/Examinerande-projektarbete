import { seedCampaignsIfEmpty } from "./seedCampaign.js";
import { seedMenuIfEmpty } from "./seedMenu.js";
import { seedUsersIfEmpty } from "./seedUsers.js";

export function runSeeders() {
  seedMenuIfEmpty();
  seedUsersIfEmpty();
  seedCampaignsIfEmpty();
}
